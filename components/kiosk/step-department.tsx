'use client'

import { Check, Leaf, Stethoscope } from 'lucide-react'
import { StepHeading } from '@/components/kiosk/kiosk-chrome'
import { Badge } from '@/components/ui/badge'
import type { Department, LanguageCode } from '@/lib/kiosk-data'
import { cn } from '@/lib/utils'

const OPTIONS: {
  id: Department
  label: string
  native: string
  icon: typeof Stethoscope
  detail: string
  extras: string[]
}[] = [
  {
    id: 'allopathy',
    label: 'General OPD (Allopathy)',
    native: 'सामान्य ओ.पी.डी.',
    icon: Stethoscope,
    detail: 'Modern medicine. Standard SOAP history with review of systems.',
    extras: ['History of present illness', 'Past, drug & family history', 'Review of systems'],
  },
  {
    id: 'ayurveda',
    label: 'Ayurveda OPD (AYUSH)',
    native: 'आयुर्वेद ओ.पी.डी.',
    icon: Leaf,
    detail: 'Adds the ten-fold Dashavidha Pariksha assessment on top of the standard history.',
    extras: ['Prakriti & Sattva', 'Agni, Koshtha, Bala', 'Nidana & Ahara-Vihara'],
  },
]

export function StepDepartment({
  value,
  lang,
  onChange,
}: {
  value: Department
  lang: LanguageCode
  onChange: (next: Department) => void
}) {
  return (
    <div className="flex flex-col gap-8">
      <StepHeading
        step="Step 4 of 9 · Department"
        title="Which OPD are you visiting?"
        lang={lang}
        native="आप किस ओ.पी.डी. में आए हैं?"
        description="This decides which set of questions the kiosk asks. You can still describe the same problem either way."
      />

      <ul className="grid gap-4 md:grid-cols-2">
        {OPTIONS.map((option) => {
          const selected = value === option.id
          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => onChange(option.id)}
                aria-pressed={selected}
                className={cn(
                  'flex h-full w-full flex-col items-start gap-4 rounded-md border p-6 text-left transition-colors',
                  'focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
                  selected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <span className="flex w-full items-start justify-between gap-3">
                  <option.icon aria-hidden className="size-8" />
                  {selected && <Check aria-hidden className="size-6" />}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-xl font-semibold tracking-tight">{option.label}</span>
                  <span className={cn('text-base', selected ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                    {option.native}
                  </span>
                </span>
                <span
                  className={cn(
                    'text-sm leading-relaxed',
                    selected ? 'text-primary-foreground/80' : 'text-muted-foreground',
                  )}
                >
                  {option.detail}
                </span>
                <span className="mt-auto flex flex-wrap gap-2">
                  {option.extras.map((extra) => (
                    <Badge
                      key={extra}
                      variant={selected ? 'outline' : 'secondary'}
                      className={cn('font-normal', selected && 'border-primary-foreground/40 text-primary-foreground')}
                    >
                      {extra}
                    </Badge>
                  ))}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
