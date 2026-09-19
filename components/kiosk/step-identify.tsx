'use client'

import * as React from 'react'
import { BadgeCheck, Fingerprint, IdCard, Loader2, ScanLine, UserPlus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StepHeading } from '@/components/kiosk/kiosk-chrome'
import { cn } from '@/lib/utils'
import type { LanguageCode } from '@/lib/kiosk-data'

export type IdentityMode = 'abha' | 'aadhaar' | 'new'

export type Identity = {
  mode: IdentityMode
  abha: string
  name: string
  age: string
  sex: string
  phone: string
  verified: boolean
}

const MODES: { id: IdentityMode; label: string; native: string; icon: typeof IdCard; detail: string }[] = [
  {
    id: 'abha',
    label: 'I have an ABHA number',
    native: 'मेरे पास ABHA नंबर है',
    icon: IdCard,
    detail: '14-digit number or your @abdm address',
  },
  {
    id: 'aadhaar',
    label: 'Use Aadhaar / fingerprint',
    native: 'आधार / फिंगरप्रिंट',
    icon: Fingerprint,
    detail: 'Creates an ABHA for you in one step',
  },
  {
    id: 'new',
    label: 'First visit — register me',
    native: 'पहली बार आया हूँ',
    icon: UserPlus,
    detail: 'Only name, age, sex and phone needed',
  },
]

const DEMO = {
  abha: '91-4423-8871-2019',
  name: 'Ramesh Yadav',
  age: '58',
  sex: 'male',
  phone: '98•••••231',
}

export function StepIdentify({
  value,
  lang,
  onChange,
}: {
  value: Identity
  lang: LanguageCode
  onChange: (next: Identity) => void
}) {
  const [fetching, setFetching] = React.useState(false)

  React.useEffect(() => {
    const stored = window.localStorage.getItem('ayushsetu-patient-profile')
    if (!stored || value.verified) return
    try {
      const profile = JSON.parse(stored) as { name?: string; phone?: string; patientId?: string }
      if (profile.name || profile.phone) onChange({ ...value, abha: profile.patientId ?? value.abha, name: profile.name ?? value.name, phone: profile.phone ?? value.phone, verified: true })
    } catch {
      window.localStorage.removeItem('ayushsetu-patient-profile')
    }
  }, [value.verified])

  function fetchAbha() {
    setFetching(true)
    window.setTimeout(() => {
      setFetching(false)
      onChange({
        ...value,
        abha: DEMO.abha,
        name: DEMO.name,
        age: DEMO.age,
        sex: DEMO.sex,
        phone: DEMO.phone,
        verified: true,
      })
    }, 1200)
  }

  return (
    <div className="flex flex-col gap-8">
      <StepHeading
        step="Step 2 of 9 · Identify"
        title="Who is visiting today?"
        lang={lang}
        native="आज कौन आया है?"
        description="Linking to ABHA lets the doctor see your past records. If you do not have one, register in 30 seconds — no documents required."
      />

      <ul className="grid gap-3 md:grid-cols-3">
        {MODES.map((mode) => {
          const selected = value.mode === mode.id
          return (
            <li key={mode.id}>
              <button
                type="button"
                onClick={() => onChange({ ...value, mode: mode.id, verified: false })}
                aria-pressed={selected}
                className={cn(
                  'flex min-h-36 w-full flex-col items-start gap-3 rounded-md border p-5 text-left transition-colors',
                  'focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
                  selected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <mode.icon aria-hidden className="size-7" />
                <span className="flex flex-col gap-1">
                  <span className="text-lg font-semibold leading-snug tracking-tight">{mode.label}</span>
                  <span className={cn('text-sm', selected ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                    {mode.native}
                  </span>
                  <span className={cn('text-sm', selected ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                    {mode.detail}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {value.mode === 'abha' && (
        <Card>
          <CardHeader>
            <CardTitle>Enter or scan your ABHA</CardTitle>
            <CardDescription>Hold the ABHA card under the scanner, or type the number.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="abha">ABHA number</FieldLabel>
                <Input
                  id="abha"
                  inputMode="numeric"
                  placeholder="91-XXXX-XXXX-XXXX"
                  className="h-14 font-mono text-lg"
                  value={value.abha}
                  onChange={(event) => onChange({ ...value, abha: event.target.value, verified: false })}
                />
                <FieldDescription>An OTP will be sent to the phone linked with your ABHA.</FieldDescription>
              </Field>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="min-h-14" onClick={fetchAbha} disabled={fetching}>
                  {fetching ? <Loader2 data-icon="inline-start" className="animate-spin" /> : <ScanLine data-icon="inline-start" />}
                  {fetching ? 'Verifying…' : 'Scan card & verify'}
                </Button>
                <Button size="lg" variant="outline" className="min-h-14" onClick={fetchAbha} disabled={fetching}>
                  Send OTP instead
                </Button>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      )}

      {value.mode === 'aadhaar' && (
        <Card>
          <CardHeader>
            <CardTitle>Place your thumb on the scanner</CardTitle>
            <CardDescription>
              Aadhaar biometric authentication. Your Aadhaar number is never stored on the kiosk.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex size-32 shrink-0 items-center justify-center rounded-md border-2 border-dashed border-primary/40 bg-secondary">
              <Fingerprint aria-hidden className="size-14 text-primary" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="leading-relaxed text-muted-foreground">
                Keep your thumb still until the light turns green. Staff can help if the fingerprint does not
                read after two tries.
              </p>
              <Button size="lg" className="min-h-14 self-start" onClick={fetchAbha} disabled={fetching}>
                {fetching ? <Loader2 data-icon="inline-start" className="animate-spin" /> : <Fingerprint data-icon="inline-start" />}
                {fetching ? 'Matching…' : 'Simulate fingerprint'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {value.mode === 'new' && (
        <Card>
          <CardHeader>
            <CardTitle>Quick registration</CardTitle>
            <CardDescription>Four details only. An ABHA can be created for you later at the counter.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="name">Full name</FieldLabel>
                  <Input
                    id="name"
                    className="h-14 text-lg"
                    placeholder="नाम / Name"
                    value={value.name}
                    onChange={(event) => onChange({ ...value, name: event.target.value })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="phone">Mobile number</FieldLabel>
                  <Input
                    id="phone"
                    inputMode="tel"
                    className="h-14 font-mono text-lg"
                    placeholder="10-digit number"
                    value={value.phone}
                    onChange={(event) => onChange({ ...value, phone: event.target.value })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="age">Age in years</FieldLabel>
                  <Input
                    id="age"
                    inputMode="numeric"
                    className="h-14 font-mono text-lg"
                    placeholder="e.g. 42"
                    value={value.age}
                    onChange={(event) => onChange({ ...value, age: event.target.value })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="sex">Sex</FieldLabel>
                  <Select
                    value={value.sex}
                    onValueChange={(next) => onChange({ ...value, sex: next as string })}
                  >
                    <SelectTrigger id="sex" className="h-14 text-base">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="female">Female / महिला</SelectItem>
                        <SelectItem value="male">Male / पुरुष</SelectItem>
                        <SelectItem value="other">Other / अन्य</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      )}

      {value.verified && (
        <Card className="border-primary/40 bg-secondary">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-3">
              <BadgeCheck aria-hidden className="size-6 text-primary" />
              <CardTitle className="text-lg">Record found and verified</CardTitle>
              <Badge variant="outline" className="ml-auto font-mono text-[0.7rem] font-normal">
                ABDM · HIE-CM
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-4">
              {[
                { label: 'Name', value: value.name },
                { label: 'Age / Sex', value: `${value.age} yrs · ${value.sex === 'male' ? 'M' : value.sex === 'female' ? 'F' : '—'}` },
                { label: 'ABHA', value: value.abha },
                { label: 'Linked phone', value: value.phone },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="font-medium">{item.value || '—'}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
