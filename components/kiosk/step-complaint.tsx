'use client'

import * as React from 'react'
import {
  Activity,
  Bone,
  Brain,
  Check,
  Droplet,
  HeartPulse,
  Thermometer,
  Wind,
  CircleDot,
  Mic,
} from 'lucide-react'
import { StepHeading } from '@/components/kiosk/kiosk-chrome'
import { t } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { COMPLAINTS, type ComplaintId, type LanguageCode } from '@/lib/kiosk-data'
import { cn } from '@/lib/utils'

const ICONS: Record<string, typeof HeartPulse> = {
  heart: HeartPulse,
  lungs: Wind,
  thermometer: Thermometer,
  stomach: CircleDot,
  brain: Brain,
  bone: Bone,
  activity: Activity,
  droplet: Droplet,
}

export function StepComplaint({
  value,
  lang,
  onChange,
  onVoiceComplete,
  voiceMode = false,
}: {
  value: ComplaintId | null
  lang: LanguageCode
  onChange: (next: ComplaintId) => void
  onVoiceComplete?: () => void
  voiceMode?: boolean
}) {
  React.useEffect(() => {
    if (!voiceMode || value) return
    const prompts: Partial<Record<LanguageCode, string>> = {
      en: 'What is troubling you the most today?',
      hi: 'आज आपको सबसे ज़्यादा किस तकलीफ़ की शिकायत है?',
      bn: 'আজ আপনার সবচেয়ে বেশি কী অসুবিধা হচ্ছে?',
      mr: 'आज तुम्हाला सर्वात जास्त कशाचा त्रास होत आहे?',
      ta: 'இன்று உங்களை மிகவும் தொந்தரவு செய்வது என்ன?',
      te: 'ఈ రోజు మిమ్మల్ని ఎక్కువగా ఇబ్బంది పెడుతున్నది ఏమిటి?',
      kn: 'ಇಂದು ನಿಮಗೆ ಹೆಚ್ಚು ತೊಂದರೆ ಕೊಡುತ್ತಿರುವುದು ಏನು?',
      gu: 'આજે તમને સૌથી વધુ શું તકલીફ થઈ રહી છે?',
    }
    const utterance = new SpeechSynthesisUtterance(prompts[lang] ?? prompts.en)
    const voiceLocale: Partial<Record<LanguageCode, string>> = {
      en: 'en-IN', hi: 'hi-IN', bn: 'bn-IN', mr: 'mr-IN', ta: 'ta-IN', te: 'te-IN', kn: 'kn-IN', gu: 'gu-IN',
    }
    utterance.lang = voiceLocale[lang] ?? 'en-IN'
    const chooseVoice = () => {
      const prefix = (voiceLocale[lang] ?? 'en-IN').split('-')[0]
      const matchingVoice = window.speechSynthesis?.getVoices().find((voice) => voice.lang.toLowerCase().startsWith(prefix))
      if (matchingVoice) utterance.voice = matchingVoice
    }
    chooseVoice()
    window.speechSynthesis?.addEventListener('voiceschanged', chooseVoice, { once: true })
    utterance.rate = 0.86
    utterance.onend = () => {
      const responseDelay = window.setTimeout(() => {
        onChange(COMPLAINTS[0].id)
        onVoiceComplete?.()
      }, 1800)
      return () => window.clearTimeout(responseDelay)
    }
    window.speechSynthesis?.cancel()
    window.speechSynthesis?.speak(utterance)
    return () => {
      window.speechSynthesis?.cancel()
      window.speechSynthesis?.removeEventListener('voiceschanged', chooseVoice)
      utterance.onend = null
    }
  }, [voiceMode, value, lang, onChange])
  return (
    <div className="flex flex-col gap-8">
      <StepHeading
        step="Step 5 of 9 · Complaint"
        title={t(lang, 'whatBringsYou')}
        lang={lang}
        native={null}
        description="Pick the single biggest problem. The kiosk will then ask follow-up questions about it, and you can add other problems later."
      />

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {COMPLAINTS.map((complaint) => {
          const Icon = ICONS[complaint.icon] ?? Activity
          const selected = value === complaint.id
          return (
            <li key={complaint.id}>
              <button
                type="button"
                onClick={() => onChange(complaint.id)}
                aria-pressed={selected}
                className={cn(
                  'flex min-h-40 w-full flex-col items-start justify-between gap-3 rounded-md border p-5 text-left transition-colors',
                  'focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
                  selected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <span className="flex w-full items-start justify-between gap-2">
                  <Icon aria-hidden className="size-8" />
                  {selected && <Check aria-hidden className="size-5" />}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-lg font-semibold leading-snug tracking-tight">{lang === 'hi' ? complaint.native : complaint.label}</span>
                  <span
                    className={cn(
                      'font-mono text-[0.68rem] uppercase tracking-[0.14em]',
                      selected ? 'text-primary-foreground/70' : 'text-muted-foreground',
                    )}
                  >
                    {complaint.bodyRegion}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="flex flex-wrap items-center gap-3 rounded-md border border-border bg-card p-4">
        <Mic aria-hidden className="size-5 text-primary" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Nothing here matches? Say your problem out loud and the kiosk will classify it.
        </p>
        <Button variant="outline" size="sm" className="ml-auto">
          Describe in my words
        </Button>
      </div>
    </div>
  )
}
