'use client'

import { Check, Hand, Mic, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StepHeading } from '@/components/kiosk/kiosk-chrome'
import { LANGUAGES, type LanguageCode } from '@/lib/kiosk-data'
import { cn } from '@/lib/utils'

export function StepLanguage({
  value,
  lang,
  onChange,
  mode,
  onModeChange,
}: {
  value: LanguageCode | null
  lang: LanguageCode
  onChange: (code: LanguageCode) => void
  mode: 'touch' | 'voice'
  onModeChange: (mode: 'touch' | 'voice') => void
}) {
  return (
    <div className="flex flex-col gap-8">
      <StepHeading
        step="Step 1 of 9 · Language"
        title="Choose your language"
        lang={lang}
        native="अपनी भाषा चुनें"
        description="Every question after this will be spoken and shown in the language you pick. You can change it at any time."
      />

      <div className="flex flex-col gap-3"><p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">How would you like to answer?</p><div className="grid gap-3 md:grid-cols-2"><button type="button" onClick={() => onModeChange('touch')} aria-pressed={mode === 'touch'} className={cn('flex min-h-28 items-start gap-4 rounded-md border p-5 text-left transition-colors focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none', mode === 'touch' ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:bg-accent')}><Hand className="mt-1 size-6 shrink-0" /><span className="flex flex-col gap-1"><span className="text-lg font-semibold">Touch mode</span><span className={cn('text-sm leading-6', mode === 'touch' ? 'text-primary-foreground/75' : 'text-muted-foreground')}>Tap choices, sliders, and fields yourself.</span></span></button><button type="button" onClick={() => onModeChange('voice')} aria-pressed={mode === 'voice'} className={cn('flex min-h-28 items-start gap-4 rounded-md border p-5 text-left transition-colors focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none', mode === 'voice' ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:bg-accent')}><Mic className="mt-1 size-6 shrink-0" /><span className="flex flex-col gap-1"><span className="text-lg font-semibold">Voice-only mode</span><span className={cn('text-sm leading-6', mode === 'voice' ? 'text-primary-foreground/75' : 'text-muted-foreground')}>Hear every question, answer aloud, and let the kiosk advance.</span></span></button></div></div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {LANGUAGES.map((language) => {
          const selected = value === language.code
          return (
            <li key={language.code}>
              <button
                type="button"
                onClick={() => onChange(language.code)}
                aria-pressed={selected}
                className={cn(
                  'flex min-h-32 w-full flex-col items-start justify-between gap-2 rounded-md border p-4 text-left transition-colors',
                  'focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
                  selected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <span className="flex w-full items-start justify-between gap-2">
                  <span className="text-2xl font-semibold tracking-tight">{language.native}</span>
                  {selected ? (
                    <Check aria-hidden className="size-5" />
                  ) : (
                    <Volume2 aria-hidden className="size-5 text-muted-foreground" />
                  )}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium">{language.label}</span>
                  <span
                    className={cn(
                      'font-mono text-[0.68rem] uppercase tracking-[0.12em]',
                      selected ? 'text-primary-foreground/70' : 'text-muted-foreground',
                    )}
                  >
                    {language.speakers}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="flex flex-wrap items-center gap-3 rounded-md border border-border bg-card p-4">
        <Volume2 aria-hidden className="size-5 text-primary" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Cannot read? Tap the speaker on any screen and the kiosk will read it out loud. Staff assistance
          button is on the right of every screen.
        </p>
        <Button variant="outline" size="sm" className="ml-auto">
          Call staff
        </Button>
      </div>
    </div>
  )
}
