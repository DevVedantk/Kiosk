'use client'

import { CircleAlert, Mic, Pencil, ShieldAlert, Hand } from 'lucide-react'
import { StepHeading } from '@/components/kiosk/kiosk-chrome'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { LanguageCode } from '@/lib/kiosk-data'
import type { IntakeSummary } from '@/lib/intake-summary'
import { triageLevel } from '@/lib/intake-summary'
import { cn } from '@/lib/utils'

export function StepReview({
  summary,
  lang,
  onEditInterview,
}: {
  summary: IntakeSummary
  lang: LanguageCode
  onEditInterview: () => void
}) {
  const triage = triageLevel(summary.redFlags)

  return (
    <div className="flex flex-col gap-8">
      <StepHeading
        step="Step 8 of 9 · Review"
        title="Is this what you told us?"
        lang={lang}
        native="क्या हमने ठीक समझा?"
        description="Read it once. If anything is wrong, go back and change it — the doctor will see exactly this."
      />

      {summary.redFlags.length > 0 && (
        <Alert variant={triage.level === 'emergency' ? 'destructive' : 'default'}>
          <ShieldAlert />
          <AlertTitle>{triage.label}</AlertTitle>
          <AlertDescription>
            <p>{triage.detail}</p>
            <ul className="flex flex-col gap-1">
              {summary.redFlags.map((flag) => (
                <li key={flag.id} className="text-sm">
                  <span className="font-medium">{flag.label}</span> — {flag.reason}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-mono text-[0.65rem] font-normal">
              Chief complaint
            </Badge>
            <Badge variant="outline" className="font-mono text-[0.65rem] font-normal">
              {summary.answeredCount}/{summary.totalCount} answered
            </Badge>
            <Badge variant="outline" className="font-mono text-[0.65rem] font-normal">
              <Mic data-icon="inline-start" />
              {summary.voiceCount} by voice
            </Badge>
            <Button variant="outline" size="sm" className="ml-auto" onClick={onEditInterview}>
              <Pencil data-icon="inline-start" />
              Change my answers
            </Button>
          </div>
          <CardTitle className="text-2xl leading-snug text-balance">{summary.chiefComplaint}</CardTitle>
          <CardDescription className="text-base leading-relaxed">{summary.oneLiner}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {summary.sections.map((section) => (
          <Card key={section.section}>
            <CardHeader>
              <CardTitle className="text-base">{section.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="flex flex-col gap-3">
                {section.lines.map((line) => (
                  <div key={line.field} className="flex flex-col gap-1 border-b border-border pb-3 last:border-0 last:pb-0">
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {line.field}
                    </dt>
                    <dd className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          'font-medium',
                          line.source === 'skipped' && 'text-muted-foreground italic',
                        )}
                      >
                        {line.value}
                      </span>
                      {line.source === 'voice' && (
                        <Mic aria-label="Answered by voice" className="size-3.5 text-primary" />
                      )}
                      {line.source === 'skipped' && (
                        <Hand aria-label="Skipped" className="size-3.5 text-muted-foreground" />
                      )}
                    </dd>
                    {line.transcript && line.source === 'voice' && (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        &ldquo;{line.transcript}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>

      {summary.documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Documents attached</CardTitle>
            <CardDescription>These will be shown to the doctor as a dated timeline.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-2">
              {summary.documents.map((doc) => (
                <li key={doc.id}>
                  <Badge variant="secondary" className="font-normal">
                    {doc.title || doc.kind} · {doc.date}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <p className="flex items-start gap-3 rounded-md border border-border bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
        <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
        This is a history, not a diagnosis. The kiosk never prescribes or decides treatment — a registered
        doctor examines you and makes every clinical decision.
      </p>
    </div>
  )
}
