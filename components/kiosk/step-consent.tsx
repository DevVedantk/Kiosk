'use client'

import { Lock, ShieldCheck, Timer, Volume2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { StepHeading } from '@/components/kiosk/kiosk-chrome'
import { CONSENT_CLAUSES, type LanguageCode } from '@/lib/kiosk-data'

const ASSURANCES = [
  { icon: Lock, title: 'Processed securely', detail: 'Voice and images are processed inside the hospital network.' },
  { icon: Timer, title: 'Session wiped', detail: 'Temporary session data is cleared the moment you submit.' },
  { icon: ShieldCheck, title: 'Revocable', detail: 'Withdraw ABHA sharing any time from your PHR app.' },
]

export function StepConsent({
  value,
  lang,
  onChange,
}: {
  value: Record<string, boolean>
  lang: LanguageCode
  onChange: (next: Record<string, boolean>) => void
}) {
  return (
    <div className="flex flex-col gap-8">
      <StepHeading
        step="Step 3 of 9 · Consent"
        title="Your permission, in plain words"
        lang={lang}
        native="आपकी अनुमति"
        description="Under the Digital Personal Data Protection Act 2023 nothing is recorded without your consent. The first two are needed for the kiosk to work; the rest are your choice."
      />

      <div className="flex flex-wrap items-center gap-3 rounded-md border border-border bg-card p-4">
        <Volume2 aria-hidden className="size-5 text-primary" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Prefer to listen? The kiosk will read each permission aloud in your language before you agree.
        </p>
        <Button variant="outline" size="sm" className="ml-auto">
          <Volume2 data-icon="inline-start" />
          Play audio consent
        </Button>
      </div>

      <FieldSet>
        <FieldLegend className="text-lg">Permissions</FieldLegend>
        <div className="flex flex-col gap-3">
          {CONSENT_CLAUSES.map((clause) => (
            <Field
              key={clause.id}
              orientation="horizontal"
              className="items-start rounded-md border border-border bg-card p-4"
            >
              <Checkbox
                id={`consent-${clause.id}`}
                className="mt-1 size-6"
                checked={Boolean(value[clause.id])}
                onCheckedChange={(checked) => onChange({ ...value, [clause.id]: checked === true })}
              />
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <FieldLabel htmlFor={`consent-${clause.id}`} className="text-base font-semibold">
                    {clause.title}
                  </FieldLabel>
                  <Badge variant={clause.required ? 'default' : 'secondary'} className="font-mono text-[0.65rem] font-normal">
                    {clause.required ? 'Required' : 'Optional'}
                  </Badge>
                </div>
                <FieldDescription className="leading-relaxed">{clause.detail}</FieldDescription>
              </div>
            </Field>
          ))}
        </div>
      </FieldSet>

      <ul className="grid gap-3 sm:grid-cols-3">
        {ASSURANCES.map((item) => (
          <li key={item.title} className="flex flex-col gap-2 rounded-md border border-border bg-secondary p-4">
            <item.icon aria-hidden className="size-5 text-primary" />
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
