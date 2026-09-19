'use client'

import * as React from 'react'
import { KIOSK_STEPS, KioskFooter, KioskHeader, type KioskStepId } from '@/components/kiosk/kiosk-chrome'
import { StepLanguage } from '@/components/kiosk/step-language'
import { StepIdentify, type Identity } from '@/components/kiosk/step-identify'
import { StepConsent } from '@/components/kiosk/step-consent'
import { StepDepartment } from '@/components/kiosk/step-department'
import { StepComplaint } from '@/components/kiosk/step-complaint'
import { StepInterview } from '@/components/kiosk/step-interview'
import { StepDocuments } from '@/components/kiosk/step-documents'
import { StepReview } from '@/components/kiosk/step-review'
import { StepToken } from '@/components/kiosk/step-token'
import { buildQuestionSet, type ComplaintId, type Department, type LanguageCode } from '@/lib/kiosk-data'
import { buildSummary, type Answer, type Answers } from '@/lib/intake-summary'
import { cn } from '@/lib/utils'

const EMPTY_IDENTITY: Identity = {
  mode: 'abha',
  abha: '',
  name: '',
  age: '',
  sex: '',
  phone: '',
  verified: false,
}

export default function KioskPage() {
  const [stepIndex, setStepIndex] = React.useState(0)
  const [largeText, setLargeText] = React.useState(false)
  const [language, setLanguage] = React.useState<LanguageCode | null>(null)
  const [interactionMode, setInteractionMode] = React.useState<'touch' | 'voice'>('touch')
  const [identity, setIdentity] = React.useState<Identity>(EMPTY_IDENTITY)
  const [consent, setConsent] = React.useState<Record<string, boolean>>({})
  const [department, setDepartment] = React.useState<Department>('allopathy')
  const [complaint, setComplaint] = React.useState<ComplaintId | null>(null)
  const [answers, setAnswers] = React.useState<Answers>({})
  const [documents, setDocuments] = React.useState<string[]>([])
  const [savedFiles, setSavedFiles] = React.useState<Array<{ id: string; name: string; size: number; type: string; uploadedAt: string }>>([])

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem('ayushsetu-patient-files')
      if (stored) setSavedFiles(JSON.parse(stored))
    } catch {
      setSavedFiles([])
    }
  }, [])

  // Before the patient picks a language the chrome shows Hindi as the most
  // widely understood default alongside English.
  const lang: LanguageCode = language ?? 'hi'
  const step: KioskStepId = KIOSK_STEPS[stepIndex].id
  const questions = React.useMemo(
    () => (complaint ? buildQuestionSet(complaint, department) : []),
    [complaint, department],
  )
  const summary = React.useMemo(
    () => buildSummary({ complaint, department, answers, documents }),
    [complaint, department, answers, documents],
  )

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stepIndex])

  function restart() {
    setStepIndex(0)
    setLanguage(null)
    setInteractionMode('touch')
    setIdentity(EMPTY_IDENTITY)
    setConsent({})
    setDepartment('allopathy')
    setComplaint(null)
    setAnswers({})
    setDocuments([])
  }

  function handleAnswer(answer: Answer) {
    setAnswers((prev) => ({ ...prev, [answer.questionId]: answer }))
  }

  const identityReady =
    identity.mode === 'new'
      ? identity.name.trim().length > 1 && identity.age.trim().length > 0 && identity.sex.length > 0
      : identity.verified

  const consentReady = Boolean(consent.capture && consent.documents)

  const nextDisabled =
    (step === 'language' && !language) ||
    (step === 'identify' && !identityReady) ||
    (step === 'consent' && !consentReady) ||
    (step === 'complaint' && !complaint)

  const hint =
    step === 'language'
      ? undefined
      : step === 'identify' && !identityReady
        ? 'Verify your ABHA or fill the four registration details to continue.'
        : step === 'consent' && !consentReady
          ? 'The first two permissions are required to use the kiosk.'
          : step === 'documents'
            ? 'No papers today? You can continue without scanning.'
            : undefined

  return (
    <div className={cn('flex min-h-svh flex-col bg-background', largeText && 'text-[1.15rem]')}>
      <KioskHeader
        stepIndex={stepIndex}
        lang={lang}
        onSpeak={() => undefined}
        onRestart={restart}
        largeText={largeText}
        onToggleLargeText={() => setLargeText((prev) => !prev)}
      />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8 sm:py-10">
        {step === 'language' && <StepLanguage value={language} lang={lang} mode={interactionMode} onChange={setLanguage} onModeChange={setInteractionMode} />}
        {step === 'identify' && <StepIdentify value={identity} lang={lang} onChange={setIdentity} />}
        {step === 'consent' && <StepConsent value={consent} lang={lang} onChange={setConsent} />}
        {step === 'department' && (
          <StepDepartment value={department} lang={lang} onChange={setDepartment} />
        )}
        {step === 'complaint' && (
          <StepComplaint value={complaint} lang={lang} onChange={setComplaint} onVoiceComplete={() => setStepIndex(stepIndex + 1)} voiceMode={interactionMode === 'voice'} />
        )}
        {step === 'interview' && (
          <StepInterview
            key={`${complaint}-${department}`}
            questions={questions}
            answers={answers}
            onAnswer={handleAnswer}
            onComplete={() => setStepIndex(stepIndex + 1)}
            voiceMode={interactionMode === 'voice'}
            language={language ?? 'en'}
          />
        )}
        {step === 'documents' && (
          <StepDocuments value={documents} lang={lang} onChange={setDocuments} savedFiles={savedFiles} />
        )}
        {step === 'review' && (
          <StepReview summary={summary} lang={lang} onEditInterview={() => setStepIndex(5)} />
        )}
        {step === 'done' && <StepToken summary={summary} identity={identity} onRestart={restart} />}
      </main>

      {step !== 'done' && step !== 'interview' && (
        <KioskFooter
          lang={lang}
          onBack={() => setStepIndex(Math.max(0, stepIndex - 1))}
          onNext={() => setStepIndex(Math.min(KIOSK_STEPS.length - 1, stepIndex + 1))}
          backDisabled={stepIndex === 0}
          nextDisabled={nextDisabled}
          nextLabel={step === 'review' ? 'Send to doctor' : undefined}
          hint={hint}
        />
      )}

      {step === 'interview' && (
        <KioskFooter
          lang={lang}
          onBack={() => setStepIndex(stepIndex - 1)}
          onNext={() => setStepIndex(stepIndex + 1)}
          nextLabel="Skip to documents"
          hint="Answer each question above, or skip ahead if you are short of time."
        />
      )}
    </div>
  )
}
