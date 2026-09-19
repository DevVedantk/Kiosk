'use client'

import * as React from 'react'
import {
  ArrowRight,
  Check,
  CircleAlert,
  Hand,
  Mic,
  Square,
  Volume2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { SECTION_LABELS, type LanguageCode, type Question } from '@/lib/kiosk-data'
import type { Answer, Answers } from '@/lib/intake-summary'
import { resolveVoiceAnswer } from '@/lib/voice-picks'
import { cn } from '@/lib/utils'

type Turn = {
  id: string
  role: 'kiosk' | 'patient'
  text: string
  native?: string
  source?: 'voice' | 'touch' | 'skipped'
}

export function StepInterview({
  questions,
  answers,
  onAnswer,
  onComplete,
  voiceMode = false,
  language = 'en',
}: {
  questions: Question[]
  answers: Answers
  onAnswer: (answer: Answer) => void
  onComplete: () => void
  voiceMode?: boolean
  language?: LanguageCode
}) {
  const [index, setIndex] = React.useState(0)
  const [listening, setListening] = React.useState(false)
  const [interim, setInterim] = React.useState('')
  const [turns, setTurns] = React.useState<Turn[]>([])
  const [draftOptions, setDraftOptions] = React.useState<string[]>([])
  const [draftScale, setDraftScale] = React.useState(5)
  const [draftText, setDraftText] = React.useState('')
  const timers = React.useRef<number[]>([])
  const logRef = React.useRef<HTMLDivElement>(null)

  const question = questions[index]
  const isLast = index === questions.length - 1

  React.useEffect(() => {
    return () => timers.current.forEach((id) => window.clearTimeout(id))
  }, [])

  React.useEffect(() => {
    if (!question) return
    setTurns((prev) =>
      prev.some((turn) => turn.id === `q-${question.id}`)
        ? prev
        : [...prev, { id: `q-${question.id}`, role: 'kiosk', text: question.prompt, native: question.native }],
    )
    const existing = answers[question.id]
    setDraftOptions(existing?.optionIds ?? [])
    setDraftScale(existing?.scale ?? Math.round(((question.scale?.max ?? 10) + 1) / 2))
    setDraftText(existing?.transcript ?? '')
    setInterim('')
    setListening(false)
  }, [question, answers])

  React.useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [turns, interim])

  React.useEffect(() => {
    if (!voiceMode || !question) return
    const prompt = language === 'hi' ? (question.native ?? question.prompt) : question.prompt
    const voiceLocale: Record<LanguageCode, string> = {
      en: 'en-IN', hi: 'hi-IN', bn: 'bn-IN', mr: 'mr-IN', ta: 'ta-IN', te: 'te-IN', kn: 'kn-IN', gu: 'gu-IN',
    }
    window.speechSynthesis?.cancel()
    const utterance = new SpeechSynthesisUtterance(prompt)
    utterance.lang = voiceLocale[language]
    const chooseVoice = () => {
      const languagePrefix = voiceLocale[language].split('-')[0]
      const matchingVoice = window.speechSynthesis?.getVoices().find((voice) => voice.lang.toLowerCase().startsWith(languagePrefix))
      if (matchingVoice) utterance.voice = matchingVoice
    }
    chooseVoice()
    window.speechSynthesis?.addEventListener('voiceschanged', chooseVoice, { once: true })
    utterance.rate = 0.86
    utterance.pitch = 1
    utterance.onend = () => {
      startListening()
    }
    window.speechSynthesis?.speak(utterance)
    return () => {
      window.speechSynthesis?.cancel()
      window.speechSynthesis?.removeEventListener('voiceschanged', chooseVoice)
      utterance.onend = null
      timers.current.forEach((id) => window.clearTimeout(id))
      timers.current = []
    }
  }, [voiceMode, question?.id, language])

  function pushTurn(turn: Turn) {
    setTurns((prev) => [...prev, turn])
  }

  function advance() {
    if (isLast) {
      onComplete()
      return
    }
    setIndex((prev) => prev + 1)
  }

  function commit(answer: Answer, spokenLabel: string) {
    onAnswer(answer)
    pushTurn({
      id: `a-${answer.questionId}-${Date.now()}`,
      role: 'patient',
      text: spokenLabel,
      source: answer.source,
    })
    advance()
  }

  function optionLabels(ids: string[]) {
    return (question?.options ?? [])
      .filter((option) => ids.includes(option.id))
      .map((option) => option.label)
      .join(', ')
  }

  function startListening() {
    if (!question) return
    setListening(true)
    setInterim('')
    const sample = question.voiceSample ?? 'Patient described the problem in their own words.'
    setInterim(sample)
    const done = window.setTimeout(() => {
      setListening(false)
      const resolved = resolveVoiceAnswer(question)
      const label =
        question.type === 'scale'
          ? `${sample} — graded ${resolved.scale}/${question.scale?.max ?? 10}`
          : sample
      commit(
        {
          questionId: question.id,
          optionIds: resolved.optionIds,
          scale: resolved.scale,
          transcript: sample,
          source: 'voice',
        },
        label,
      )
      setInterim('')
    }, 1800)
    timers.current.push(done)
  }

  function stopListening() {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
    setListening(false)
    setInterim('')
  }

  function submitTouch() {
    if (!question) return
    if (question.type === 'scale') {
      commit(
        { questionId: question.id, optionIds: [], scale: draftScale, source: 'touch' },
        `Graded ${draftScale}/${question.scale?.max ?? 10}`,
      )
      return
    }
    if (question.type === 'text') {
      commit(
        { questionId: question.id, optionIds: [], transcript: draftText, source: 'touch' },
        draftText.trim() || 'No detail given',
      )
      return
    }
    commit(
      { questionId: question.id, optionIds: draftOptions, source: 'touch' },
      optionLabels(draftOptions) || 'Nothing selected',
    )
  }

  function skip() {
    if (!question) return
    commit({ questionId: question.id, optionIds: [], source: 'skipped' }, 'Skipped this question')
  }

  function toggleOption(optionId: string) {
    if (!question) return
    if (question.type === 'single') {
      setDraftOptions([optionId])
      return
    }
    setDraftOptions((prev) => {
      if (optionId === 'none') return prev.includes('none') ? [] : ['none']
      const next = prev.filter((id) => id !== 'none')
      return next.includes(optionId) ? next.filter((id) => id !== optionId) : [...next, optionId]
    })
  }

  if (!question) return null

  const answeredCount = Object.values(answers).filter((answer) => answer.source !== 'skipped').length
  const percent = Math.round((index / questions.length) * 100)
  const canSubmit =
    question.type === 'scale' ||
    (question.type === 'text' ? draftText.trim().length > 0 : draftOptions.length > 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
            Step 6 of 9 · Interview
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {SECTION_LABELS[question.section]}
          </h1>
          <p className="text-sm text-muted-foreground">
            Question {index + 1} of {questions.length} · {answeredCount} answered
          </p>
        </div>
        <div className="flex w-full max-w-xs flex-col gap-2">
          <Progress value={percent} />
          <p className="text-right font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
            {percent}% complete
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card className="gap-5">
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="font-mono text-[0.65rem] font-normal">
                {question.field}
              </Badge>
              {voiceMode && <Badge className="font-mono text-[0.65rem] font-normal"><Mic data-icon="inline-start" /> Voice-only</Badge>}
              {question.options?.some((option) => option.redFlag) && (
                <Badge variant="outline" className="font-mono text-[0.65rem] font-normal">
                  Red-flag screen
                </Badge>
              )}
              <Button variant="ghost" size="sm" className="ml-auto" aria-label="Read the question aloud">
                <Volume2 data-icon="inline-start" />
                Hear it
              </Button>
            </div>
            <CardTitle className="text-2xl leading-snug text-balance sm:text-3xl">{question.prompt}</CardTitle>
            <p className="text-lg text-muted-foreground">{question.native}</p>
            {question.helper && <p className="text-sm text-muted-foreground">{question.helper}</p>}
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            <div
              className={cn(
                'flex flex-col gap-4 rounded-md border p-5 transition-colors',
                listening ? 'border-primary bg-secondary' : 'border-dashed border-border bg-card',
              )}
            >
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  variant={listening ? 'destructive' : 'default'}
                  className="min-h-16 min-w-52 text-base"
                  onClick={listening ? stopListening : startListening}
                >
                  {listening ? <Square data-icon="inline-start" /> : <Mic data-icon="inline-start" />}
                  {listening ? 'Stop' : 'Answer by speaking'}
                </Button>
                <div className="flex items-end gap-1" aria-hidden>
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((bar) => (
                    <span
                      key={bar}
                      className={cn(
                        'w-1.5 rounded-full bg-primary transition-all duration-300',
                        listening ? 'animate-pulse' : 'opacity-25',
                      )}
                      style={{
                        height: listening ? `${8 + ((bar * 7) % 26)}px` : '8px',
                        animationDelay: `${bar * 90}ms`,
                      }}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {listening ? 'Listening — speak naturally in your language.' : 'Or tap an answer below.'}
                </p>
              </div>
              {(interim || listening) && (
                <p className="font-mono text-sm leading-relaxed text-foreground">
                  {interim || '…'}
                  {listening && <span className="ml-0.5 animate-pulse">|</span>}
                </p>
              )}
            </div>

            {(question.type === 'single' || question.type === 'multi') && (
              <ul className="grid gap-3 sm:grid-cols-2">
                {question.options?.map((option) => {
                  const selected = draftOptions.includes(option.id)
                  return (
                    <li key={option.id}>
                      <button
                        type="button"
                        onClick={() => toggleOption(option.id)}
                        aria-pressed={selected}
                        className={cn(
                          'flex min-h-20 w-full items-start gap-3 rounded-md border p-4 text-left transition-colors',
                          'focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
                          selected
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-card hover:bg-accent hover:text-accent-foreground',
                        )}
                      >
                        <span
                          className={cn(
                            'mt-0.5 flex size-6 shrink-0 items-center justify-center border',
                            question.type === 'multi' ? 'rounded-sm' : 'rounded-full',
                            selected ? 'border-primary-foreground bg-primary-foreground/15' : 'border-border',
                          )}
                        >
                          {selected && <Check aria-hidden className="size-4" />}
                        </span>
                        <span className="flex flex-1 flex-col gap-0.5">
                          <span className="text-base font-medium leading-snug">{option.label}</span>
                          {option.native && (
                            <span
                              className={cn(
                                'text-sm',
                                selected ? 'text-primary-foreground/80' : 'text-muted-foreground',
                              )}
                            >
                              {option.native}
                            </span>
                          )}
                        </span>
                        {option.redFlag && (
                          <CircleAlert
                            aria-label="Clinically important answer"
                            className={cn('size-4 shrink-0', selected ? 'text-primary-foreground' : 'text-destructive')}
                          />
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}

            {question.type === 'scale' && (
              <div className="flex flex-col gap-4 rounded-md border border-border bg-card p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-muted-foreground">{question.scale?.minLabel}</span>
                  <span className="font-mono text-4xl font-semibold">{draftScale}</span>
                  <span className="text-sm text-muted-foreground">{question.scale?.maxLabel}</span>
                </div>
                <Slider
                  value={[draftScale]}
                  min={question.scale?.min ?? 1}
                  max={question.scale?.max ?? 10}
                  step={1}
                  onValueChange={(next) => setDraftScale(Array.isArray(next) ? next[0] : next)}
                  aria-label="Severity"
                />
              </div>
            )}

            {question.type === 'text' && (
              <Textarea
                value={draftText}
                onChange={(event) => setDraftText(event.target.value)}
                placeholder="Type here, or use the microphone above."
                className="min-h-32 text-base"
              />
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" className="min-h-14 min-w-40" onClick={submitTouch} disabled={!canSubmit}>
                {isLast ? 'Finish interview' : 'Next question'}
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="ghost" className="min-h-14" onClick={skip}>
                <Hand data-icon="inline-start" />
                I do not know
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:sticky lg:top-32 lg:self-start">
          <CardHeader>
            <CardTitle className="text-base">Conversation so far</CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={logRef} className="flex max-h-[26rem] flex-col gap-3 overflow-y-auto pr-1">
              {turns.map((turn) => (
                <div
                  key={turn.id}
                  className={cn(
                    'flex flex-col gap-1 rounded-md p-3 text-sm leading-relaxed',
                    turn.role === 'kiosk'
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-primary text-primary-foreground',
                  )}
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] opacity-70">
                    {turn.role === 'kiosk' ? 'Kiosk' : turn.source === 'voice' ? 'Patient · voice' : turn.source === 'skipped' ? 'Patient · skipped' : 'Patient · touch'}
                  </span>
                  <span>{turn.text}</span>
                  {turn.native && <span className="opacity-70">{turn.native}</span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
