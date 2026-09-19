'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileScan,
  Fingerprint,
  LockKeyhole,
  Nfc,
  Radio,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  Volume2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PortalBrand } from '@/components/portal-brand'

const steps = [
  ['01', 'Patient arrives', 'The patient carries a MediKiosk NFC card issued by the care network.'],
  ['02', 'Doctor taps card', 'The physician taps the card at the consultation desk to identify the patient securely.'],
  ['03', 'Record opens', 'The latest intake, documents, vitals, and lifetime care history appear together.'],
  ['04', 'Care continues', 'The doctor adds today\'s discussion, advice, feedback, and follow-up to the record.'],
]

const innovations = [
  { icon: Volume2, title: 'Multilingual voice and touch', text: 'Patients can share symptoms in the language and input mode that feels most natural.' },
  { icon: FileScan, title: 'OCR for old records', text: 'Prescriptions and reports can be digitised so important context is not lost.' },
  { icon: Sparkles, title: 'Adaptive case-taking', text: 'Guided questions adjust to the complaint and surface useful clinical context.' },
  { icon: ClipboardCheck, title: 'Structured doctor summary', text: 'The physician receives a concise, reviewable history instead of a blank screen.' },
  { icon: ShieldCheck, title: 'Consent-first access', text: 'Every access path is designed around patient consent, role verification, and traceability.' },
  { icon: Radio, title: 'Continuity across facilities', text: 'The same patient story can follow them from local clinic to hospital and back.' },
]

export default function NfcPage() {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'found'>('idle')
  const [patientId, setPatientId] = useState('')

  function simulateTap() {
    setScanState('scanning')
    window.setTimeout(() => setScanState('found'), 900)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <PortalBrand />
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" render={<Link href="/" />}><ArrowLeft data-icon="inline-start" /> Home</Button>
            <Button size="sm" render={<Link href="/login" />}>Care gateway<ArrowRight data-icon="inline-end" /></Button>
          </div>
        </div>
      </header>

      <section className="border-b border-border/70 bg-gradient-to-br from-accent/55 via-background to-background">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div className="flex flex-col gap-7">
            <Badge variant="outline" className="w-fit border-primary/25 bg-card/70 text-primary"><Nfc data-icon="inline-start" /> NFC patient access · सुरक्षित पहचान</Badge>
            <div className="flex flex-col gap-4"><h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">A tap that brings the whole patient story into the room.</h1><p className="max-w-xl text-lg leading-8 text-muted-foreground">MediKiosk NFC cards give doctors a fast, secure way to verify a patient and open their connected care history.</p></div>
            <div className="flex flex-wrap gap-3"><Button size="lg" render={<a href="#try-it" />}>See how it works<ArrowRight data-icon="inline-end" /></Button><Button size="lg" variant="outline" render={<Link href="/physician" />}>Open physician console<Stethoscope data-icon="inline-end" /></Button></div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"><span className="flex items-center gap-2"><LockKeyhole className="size-4 text-primary" /> Consent-first</span><span className="flex items-center gap-2"><Fingerprint className="size-4 text-primary" /> Contactless</span><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Traceable</span></div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-card p-4 shadow-xl shadow-primary/10 sm:p-7"><img src="https://cdn.dribbble.com/userupload/36413736/file/original-917229ce1b62817fa76cff02b62aa76d.gif" alt="Animated NFC card tap demonstration" className="w-full rounded-2xl" /><p className="px-2 pt-4 text-center text-xs text-muted-foreground">NFC access is one part of a complete, multilingual, structured care journey.</p></div>
        </div>
      </section>

      <section id="try-it" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">For the consultation desk</p><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Two simple ways to find the right record.</h2><p className="max-w-md leading-7 text-muted-foreground">The patient can tap their NFC card, or share their patient ID when a card is unavailable. Both paths open the same verified record.</p><div className="flex flex-col gap-3 pt-2 text-sm"><div className="flex items-start gap-3"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">1</span><span><strong>NFC card:</strong> quick, contactless, and easy for returning patients.</span></div><div className="flex items-start gap-3"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">2</span><span><strong>Patient ID:</strong> a clear fallback for first visits or lost cards.</span></div></div></div>
        <Card className="overflow-hidden rounded-3xl"><CardHeader className="border-b border-border/70 bg-muted/30"><CardTitle className="flex items-center gap-2"><ScanLine className="size-5 text-primary" /> Doctor verification desk</CardTitle><CardDescription>Frontend simulation — connect your NFC reader and identity service later.</CardDescription></CardHeader><CardContent className="grid gap-8 p-6 sm:p-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-primary/30 bg-accent/35 p-7 text-center"><div className={`grid size-24 place-items-center rounded-full border-2 ${scanState === 'scanning' ? 'animate-pulse border-primary bg-primary/15' : 'border-primary/30 bg-card'}`}><Nfc className="size-10 text-primary" /></div><div className="flex flex-col gap-1"><p className="font-semibold">{scanState === 'idle' ? 'Ready to scan' : scanState === 'scanning' ? 'Reading card…' : 'Patient verified'}</p><p className="text-sm text-muted-foreground">{scanState === 'found' ? 'NFC-P-1-A7F2 · Ramesh Yadav' : 'Hold the patient card near the reader'}</p></div><Button onClick={simulateTap} disabled={scanState === 'scanning'}>{scanState === 'found' ? 'Scan another card' : 'Try a card tap'}<Radio data-icon="inline-end" /></Button></div>
          <div className="flex flex-col gap-4"><div className="flex flex-col gap-2"><label htmlFor="patient-id" className="text-sm font-medium">Or enter patient ID</label><Input id="patient-id" value={patientId} onChange={(event) => setPatientId(event.target.value)} placeholder="MK-2026-001" className="h-12 font-mono" /></div><Button variant="outline" disabled={!patientId.trim()} className="h-12">Open patient history<UserRound data-icon="inline-end" /></Button><div className="rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground"><p className="flex items-center gap-2 font-medium text-foreground"><CheckCircle2 className="size-4 text-primary" /> Same verified record</p><p className="mt-2 leading-6">Whether found by NFC or ID, the doctor sees consent, demographics, intake summary, documents, red flags, and the lifetime visit history.</p></div></div>
        </CardContent></Card>
      </section>

      <section className="border-y border-border/70 bg-card/55"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20"><div className="mb-10 flex max-w-2xl flex-col gap-3"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">The patient journey</p><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">From arrival to informed consultation.</h2></div><div className="grid gap-4 md:grid-cols-4">{steps.map(([number, title, text]) => <Card key={number} className="rounded-2xl"><CardContent className="flex flex-col gap-4 p-6"><span className="font-mono text-sm text-primary">{number}</span><h3 className="text-lg font-semibold">{title}</h3><p className="text-sm leading-6 text-muted-foreground">{text}</p></CardContent></Card>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><div className="mb-10 flex max-w-2xl flex-col gap-3"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Beyond the card</p><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">A more thoughtful digital care layer.</h2><p className="leading-7 text-muted-foreground">NFC makes the doorway faster. These connected features make the consultation more useful.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{innovations.map(({ icon: Icon, title, text }) => <Card key={title} className="rounded-2xl"><CardContent className="flex flex-col gap-4 p-6"><span className="grid size-11 place-items-center rounded-full bg-accent text-primary"><Icon className="size-5" /></span><h3 className="text-lg font-semibold">{title}</h3><p className="text-sm leading-6 text-muted-foreground">{text}</p></CardContent></Card>)}</div></section>

      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8 lg:pb-24"><div className="flex flex-col gap-5 rounded-3xl bg-primary px-6 py-10 text-primary-foreground sm:px-10"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/70">Designed for trust</p><div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><h2 className="max-w-2xl text-3xl font-semibold tracking-tight">The card identifies the patient. The care team decides the care.</h2><Button variant="secondary" render={<Link href="/login" />}>Explore workspaces<ArrowRight data-icon="inline-end" /></Button></div><p className="max-w-2xl text-sm leading-6 text-primary-foreground/75">This prototype demonstrates the experience. Production deployment should connect an approved NFC reader, consent service, identity verification, and ABDM-compliant records backend.</p></div></section>
    </main>
  )
}
