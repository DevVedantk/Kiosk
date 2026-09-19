'use client'

import Link from 'next/link'
import { Accessibility, ArrowLeft, Volume2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { BCP47, nativeLine, t } from '@/lib/i18n'
import type { LanguageCode } from '@/lib/kiosk-data'
import { cn } from '@/lib/utils'

export const KIOSK_STEPS = [
  { id: 'language', label: 'Language', key: 'language' },
  { id: 'identify', label: 'Identify', key: 'identify' },
  { id: 'consent', label: 'Consent', key: 'consent' },
  { id: 'department', label: 'Department', key: 'department' },
  { id: 'complaint', label: 'Complaint', key: 'complaint' },
  { id: 'interview', label: 'Interview', key: 'interview' },
  { id: 'documents', label: 'Documents', key: 'documents' },
  { id: 'review', label: 'Review', key: 'review' },
  { id: 'done', label: 'Token', key: 'token' },
] as const

export type KioskStepId = (typeof KIOSK_STEPS)[number]['id']

export function KioskHeader({
  stepIndex,
  lang,
  onSpeak,
  onRestart,
  largeText,
  onToggleLargeText,
}: {
  stepIndex: number
  lang: LanguageCode
  onSpeak: () => void
  onRestart: () => void
  largeText: boolean
  onToggleLargeText: () => void
}) {
  const progress = Math.round(((stepIndex + 1) / KIOSK_STEPS.length) * 100)

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5" aria-label="MediKiosk home">
          <span className="flex size-8 items-center justify-center rounded-sm bg-primary font-mono text-xs font-semibold text-primary-foreground">
            MK
          </span>
          <span className="font-semibold tracking-tight">MediKiosk</span>
        </Link>
        <Separator orientation="vertical" className="hidden h-6 sm:block" />
        <p className="hidden font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground sm:block">
          Kiosk K-03 · Block B
        </p>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSpeak}
            aria-label="Read this screen aloud"
          >
            <Volume2 data-icon="inline-start" />
            <span className="hidden sm:inline">{t(lang, 'readAloud')}</span>
          </Button>
          <Button
            variant={largeText ? 'default' : 'outline'}
            size="sm"
            onClick={onToggleLargeText}
            aria-pressed={largeText}
            aria-label="Toggle larger text"
          >
            <Accessibility data-icon="inline-start" />
            <span className="hidden sm:inline">{t(lang, 'biggerText')}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={onRestart} aria-label="Cancel and start over">
            <X data-icon="inline-start" />
            <span className="hidden sm:inline">{t(lang, 'startOver')}</span>
          </Button>
        </div>
      </div>
      <Progress value={progress} className="h-1 rounded-none" />
      <nav
        aria-label="Intake progress"
        className="mx-auto hidden max-w-5xl items-center gap-1 overflow-x-auto px-5 py-2 md:flex"
      >
        {KIOSK_STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center gap-1">
            <span
              aria-current={index === stepIndex ? 'step' : undefined}
              className={cn(
                'rounded-sm px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] whitespace-nowrap',
                index === stepIndex && 'bg-primary text-primary-foreground',
                index < stepIndex && 'text-primary',
                index > stepIndex && 'text-muted-foreground',
              )}
            >
              {t(lang, step.key)}
            </span>
            {index < KIOSK_STEPS.length - 1 && (
              <span aria-hidden className="text-muted-foreground/40">
                /
              </span>
            )}
          </div>
        ))}
      </nav>
    </header>
  )
}

export function KioskFooter({
  lang,
  onBack,
  onNext,
  nextLabel,
  nextNative,
  nextDisabled,
  backDisabled,
  hint,
}: {
  lang: LanguageCode
  onBack: () => void
  onNext: () => void
  nextLabel?: string
  nextNative?: string | null
  nextDisabled?: boolean
  backDisabled?: boolean
  hint?: string
}) {
  const label = nextLabel ?? t(lang, 'continue')
  const native = nextNative === undefined ? nativeLine(lang, 'continue') : nextNative

  return (
    <footer className="sticky bottom-0 z-20 border-t border-border bg-card">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-5 py-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={backDisabled}
          className="min-h-14 px-6"
        >
          <ArrowLeft data-icon="inline-start" />
          {t(lang, 'back')}
        </Button>
        {hint && <p className="hidden max-w-xs text-sm text-muted-foreground sm:block">{hint}</p>}
        <Button
          size="lg"
          onClick={onNext}
          disabled={nextDisabled}
          className="ml-auto min-h-14 min-w-48 flex-col gap-0 px-8 text-base"
        >
          <span>{label}</span>
          {native && (
            <span lang={BCP47[lang]} className="text-xs font-normal opacity-80">
              {native}
            </span>
          )}
        </Button>
      </div>
    </footer>
  )
}

export function StepHeading({
  step,
  title,
  native,
  lang = 'hi',
  description,
}: {
  step: string
  title: string
  native?: string | null
  lang?: LanguageCode
  description?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">{step}</p>
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
      {native && (
        <p lang={BCP47[lang]} className="text-lg text-muted-foreground">
          {native}
        </p>
      )}
      {description && (
        <p className="max-w-2xl leading-relaxed text-muted-foreground text-pretty">{description}</p>
      )}
    </div>
  )
}
