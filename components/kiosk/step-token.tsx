'use client'

import Link from 'next/link'
import { CheckCircle2, DoorOpen, Printer, Smartphone, Stethoscope } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { IntakeSummary } from '@/lib/intake-summary'
import { triageLevel } from '@/lib/intake-summary'
import type { Identity } from '@/components/kiosk/step-identify'
import { cn } from '@/lib/utils'

export function StepToken({
  summary,
  identity,
  onRestart,
}: {
  summary: IntakeSummary
  identity: Identity
  onRestart: () => void
}) {
  const triage = triageLevel(summary.redFlags)
  const token = triage.level === 'routine' ? 'B-114' : 'P-07'
  const room = triage.level === 'emergency' ? 'Casualty · Ground floor' : 'Room 14 · Block B, 1st floor'
  const wait = triage.level === 'routine' ? '~22 min' : triage.level === 'priority' ? '~6 min' : 'Immediate'

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 aria-hidden className="size-6 text-primary" />
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
            Step 9 of 9 · Done
          </p>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          History sent to the doctor
        </h1>
        <p className="text-lg text-muted-foreground">आपकी जानकारी डॉक्टर तक पहुँच गई है</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card
          className={cn(
            'border-2',
            triage.level === 'emergency' ? 'border-destructive' : 'border-primary',
          )}
        >
          <CardHeader>
            <CardDescription className="font-mono text-[0.68rem] uppercase tracking-[0.16em]">
              Your token
            </CardDescription>
            <CardTitle className="font-mono text-6xl tracking-tight">{token}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Badge
              variant={triage.level === 'emergency' ? 'destructive' : 'secondary'}
              className="w-fit font-normal"
            >
              {triage.label}
            </Badge>
            <Separator />
            <dl className="flex flex-col gap-3">
              {[
                { label: 'Go to', value: room, icon: DoorOpen },
                { label: 'Doctor', value: 'Dr. A. Menon · General Medicine', icon: Stethoscope },
                { label: 'Expected wait', value: wait, icon: Smartphone },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3">
                  <row.icon aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div className="flex flex-col">
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd className="font-medium">{row.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <Button size="lg" variant="outline" className="min-h-14">
              <Printer data-icon="inline-start" />
              Print token slip
            </Button>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What happens next</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="flex flex-col gap-4">
                {[
                  {
                    title: 'The doctor reads your history before you walk in',
                    detail: `${summary.answeredCount} answers and ${summary.documents.length} document(s) are already on the consultation screen.`,
                  },
                  {
                    title: 'Consultation time goes to examining you',
                    detail: 'No time is spent re-asking what you already told the kiosk.',
                  },
                  {
                    title: 'Your record is written to ABHA',
                    detail: `Linked to ${identity.abha || 'a new health account'} so the next doctor sees it too.`,
                  },
                ].map((item, index) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="font-medium leading-snug">{item.title}</span>
                      <span className="text-sm leading-relaxed text-muted-foreground">{item.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="text-base">See the other side of this demo</CardTitle>
              <CardDescription>
                The same intake, as the clinician and the triage desk see it.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button size="lg" className="min-h-14" render={<Link href="/physician" />}>
                Physician summary
              </Button>
              <Button size="lg" variant="outline" className="min-h-14" render={<Link href="/triage" />}>
                Triage board
              </Button>
              <Button size="lg" variant="ghost" className="min-h-14" onClick={onRestart}>
                Run kiosk again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
