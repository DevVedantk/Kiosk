'use client'

import * as React from 'react'
import { Check, FileText, FlaskConical, Images, PenLine, ScanLine, Sparkles, Upload, X } from 'lucide-react'
import { StepHeading } from '@/components/kiosk/kiosk-chrome'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Progress } from '@/components/ui/progress'
import { Spinner } from '@/components/ui/spinner'
import { AVAILABLE_DOCS, type LanguageCode, type ScannedDoc } from '@/lib/kiosk-data'
import { cn } from '@/lib/utils'

const KIND_ICON: Record<ScannedDoc['kind'], typeof FileText> = {
  Prescription: PenLine,
  'Lab report': FlaskConical,
  'Discharge summary': FileText,
  Imaging: Images,
}

export function StepDocuments({
  value,
  lang,
  onChange,
  savedFiles = [],
}: {
  value: string[]
  lang: LanguageCode
  onChange: (next: string[]) => void
  savedFiles?: Array<{ id: string; name: string; size: number; type: string; uploadedAt: string }>
}) {
  const [scanning, setScanning] = React.useState<string | null>(null)
  const [progress, setProgress] = React.useState(0)
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const timers = React.useRef<number[]>([])

  React.useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), [])

  function scan(docId: string) {
    if (scanning) return
    setScanning(docId)
    setProgress(0)
    for (let step = 1; step <= 10; step += 1) {
      timers.current.push(
        window.setTimeout(() => setProgress(step * 10), step * 110),
      )
    }
    timers.current.push(
      window.setTimeout(() => {
        setScanning(null)
        setProgress(0)
        onChange(value.includes(docId) ? value : [...value, docId])
      }, 1300),
    )
  }

  function remove(docId: string) {
    onChange(value.filter((id) => id !== docId))
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).filter((file) => file.type.startsWith('image/') || file.type === 'application/pdf')
    if (!files.length) return
    setUploadedFiles((current) => [...current, ...files])
    onChange([...value, ...files.map((file) => `upload:${file.name}`)])
    event.target.value = ''
  }

  function removeUpload(file: File) {
    setUploadedFiles((current) => current.filter((item) => item !== file))
    onChange(value.filter((id) => id !== `upload:${file.name}`))
  }

  const pending = savedFiles.length > 0 ? [] : AVAILABLE_DOCS.filter((doc) => !value.includes(doc.id))
  const scanned = AVAILABLE_DOCS.filter((doc) => value.includes(doc.id))
  const selectedSavedFiles = savedFiles.filter((file) => value.includes(`account:${file.id}`))

  return (
    <div className="flex flex-col gap-8">
      <StepHeading
        step="Step 7 of 9 · Documents"
        title="Place your old papers on the scanner"
        lang={lang}
        native="पुराने कागज़ात स्कैनर पर रखें"
        description="Prescriptions, lab reports, discharge summaries — even handwritten ones. The kiosk reads them and arranges them by date for the doctor. This step is optional."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Scanner tray</CardTitle>
            <CardDescription>
              One page at a time, printed side down. Tap a document below to simulate a scan.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div
              className={cn(
                'flex min-h-52 flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed p-6 text-center',
                scanning ? 'border-primary bg-secondary' : 'border-border bg-card',
              )}
            >
              {scanning ? (
                <>
                  <Spinner className="size-8 text-primary" />
                  <p className="font-medium">Reading page…</p>
                  <Progress value={progress} className="max-w-xs" />
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                    OCR · Devanagari + Latin · handwriting model
                  </p>
                </>
              ) : (
                <>
                  <ScanLine aria-hidden className="size-10 text-primary" />
                  <p className="font-medium">Scanner ready</p>
                  <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                    No papers with you today? Skip this step — the doctor can still see your ABHA records.
                  </p>
                </>
              )}
            </div>

            <div className="rounded-md border border-dashed border-primary/40 bg-primary/5 p-4"><input ref={fileInputRef} type="file" accept="image/*,.pdf" multiple className="sr-only" onChange={handleUpload} /><Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}><Upload data-icon="inline-start" /> Upload prescription or report</Button><p className="mt-2 text-xs text-muted-foreground">JPG, PNG, or PDF · stays on this kiosk session only</p></div>
            {uploadedFiles.length > 0 && <ul className="flex flex-col gap-2">{uploadedFiles.map((file) => <li key={`${file.name}-${file.lastModified}`} className="flex items-center gap-3 rounded-md border border-border bg-secondary p-3 text-sm"><FileText className="size-4 text-primary" /><span className="min-w-0 flex-1 truncate">{file.name}</span><Badge variant="secondary">Ready for OCR</Badge><Button type="button" variant="ghost" size="icon" onClick={() => removeUpload(file)} aria-label={`Remove ${file.name}`}><X /></Button></li>)}</ul>}

            {savedFiles.length > 0 && <div className="flex flex-col gap-3 rounded-md border border-primary/30 bg-primary/5 p-4"><div><p className="font-medium">Your uploaded documents</p><p className="text-sm text-muted-foreground">Select the documents you want to share with the doctor today.</p></div><ul className="flex flex-col gap-2">{savedFiles.map((file) => { const selected = value.includes(`account:${file.id}`); return <li key={file.id} className="flex items-center gap-3 rounded-md border border-border bg-card p-3"><input type="checkbox" checked={selected} onChange={() => onChange(selected ? value.filter((id) => id !== `account:${file.id}`) : [...value, `account:${file.id}`])} aria-label={`Share ${file.name}`} className="size-4 accent-primary" /><FileText className="size-4 text-primary" /><span className="min-w-0 flex-1 truncate text-sm">{file.name}</span><Badge variant={selected ? 'default' : 'secondary'}>{selected ? 'Share with doctor' : 'Not selected'}</Badge></li> })}</ul></div>}

            <ul className="flex flex-col gap-2">
              {pending.map((doc) => {
                const Icon = KIND_ICON[doc.kind]
                return (
                  <li key={doc.id}>
                    <button
                      type="button"
                      onClick={() => scan(doc.id)}
                      disabled={Boolean(scanning)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-md border border-border bg-card p-4 text-left transition-colors',
                        'hover:bg-accent hover:text-accent-foreground disabled:opacity-60',
                        'focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
                      )}
                    >
                      <Icon aria-hidden className="size-5 shrink-0 text-primary" />
                      <span className="flex flex-1 flex-col">
                        <span className="font-medium leading-snug">{doc.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {doc.source} · {doc.date}
                        </span>
                      </span>
                      {doc.handwritten && (
                        <Badge variant="secondary" className="font-normal">
                          Handwritten
                        </Badge>
                      )}
                    </button>
                  </li>
                )
              })}
              {pending.length === 0 && (
                <li className="rounded-md border border-border bg-secondary p-4 text-sm text-muted-foreground">
                  All demo documents have been scanned.
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
            <Sparkles aria-hidden className="size-4 text-primary" />
            <h2 className="font-semibold tracking-tight">Documents for the doctor</h2>
            <Badge variant="secondary" className="ml-auto font-mono text-[0.65rem] font-normal">
              {scanned.length + selectedSavedFiles.length} document{scanned.length + selectedSavedFiles.length === 1 ? '' : 's'}
            </Badge>
          </div>

          {selectedSavedFiles.length > 0 && <ul className="flex flex-col gap-3">{selectedSavedFiles.map((file) => <li key={file.id}><Card><CardContent className="flex items-center gap-3 p-4"><FileText className="size-5 text-primary" /><span className="min-w-0 flex-1 truncate font-medium">{file.name}</span><Badge>Selected</Badge></CardContent></Card></li>)}</ul>}

          {scanned.length === 0 && selectedSavedFiles.length === 0 ? (
            <Empty className="rounded-md border border-dashed border-border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FileText />
                </EmptyMedia>
                <EmptyTitle>Nothing scanned yet</EmptyTitle>
                <EmptyDescription>
                  Scanned values appear here so you can check them before the doctor sees them.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <ul className="flex flex-col gap-3">
              {scanned.map((doc) => (
                <li key={doc.id}>
                  <Card>
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="font-mono text-[0.65rem] font-normal">
                          {doc.kind}
                        </Badge>
                        <Badge variant="secondary" className="font-mono text-[0.65rem] font-normal">
                          OCR {Math.round(doc.confidence * 100)}%
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => remove(doc.id)}
                          aria-label={`Remove ${doc.title}`}
                        >
                          <X data-icon="inline-start" />
                          Remove
                        </Button>
                      </div>
                      <CardTitle className="text-base">{doc.title}</CardTitle>
                      <CardDescription>
                        {doc.source} · {doc.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <dl className="flex flex-col gap-2">
                        {doc.extracted.map((row) => (
                          <div
                            key={row.label}
                            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-border pb-2 last:border-0 last:pb-0"
                          >
                            <dt className="text-sm text-muted-foreground">{row.label}</dt>
                            <dd
                              className={cn(
                                'font-mono text-sm',
                                row.abnormal ? 'font-semibold text-destructive' : 'text-foreground',
                              )}
                            >
                              {row.value}
                              {row.abnormal && <span className="sr-only"> (abnormal)</span>}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          )}

          {scanned.length > 0 && (
            <p className="flex items-start gap-2 rounded-md border border-border bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
              Values marked in red are outside the reference range and will be highlighted at the top of the
              doctor&apos;s summary.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
