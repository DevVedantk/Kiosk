"use client"

import Link from 'next/link'
import { ArrowRight, BrainCircuit, CheckCircle2, FileSearch, Languages, Mic2, Radio, ShieldCheck, Smartphone, UploadCloud } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  { icon: Languages, title: 'Multilingual voice & touch', text: 'Patients can speak, listen, or tap in the language they understand best.' },
  { icon: BrainCircuit, title: 'Adaptive AI case-taking', text: 'Guided questions respond to each answer and build a clearer case summary.' },
  { icon: FileSearch, title: 'OCR medical records', text: 'Prescriptions and prior reports become useful context instead of lost paperwork.' },
  { icon: Mic2, title: 'Voice-first accessibility', text: 'The kiosk reads each question aloud and advances after the patient answers.' },
  { icon: UploadCloud, title: 'Structured doctor summary', text: 'Clinicians receive key symptoms, history, documents, and red flags together.' },
  { icon: ShieldCheck, title: 'Consent-led continuity', text: 'Every access point is designed for safe, traceable, connected care.' },
]

export function FeatureShowcase() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="mb-10 flex max-w-2xl flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Built for the whole care journey</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">More than an intake form.</h2>
          <p className="leading-7 text-muted-foreground">MediKiosk connects the patient&apos;s voice, the doctor&apos;s context, and the health record into one thoughtful digital layer.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="rounded-2xl transition-transform hover:-translate-y-1 hover:shadow-md">
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-accent text-primary"><Icon className="size-5" /></span>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8 lg:pb-24">
        <div className="grid overflow-hidden rounded-[2rem] border border-primary/20 bg-accent/35 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-primary/10 p-8 sm:p-12">
            <div className="absolute size-72 rounded-full border border-primary/15" />
            <div className="absolute size-48 rounded-full border border-primary/15" />
            <img src="https://cdn.dribbble.com/userupload/36413736/file/original-917229ce1b62817fa76cff02b62aa76d.gif" alt="NFC card tap animation" className="relative w-full max-w-sm rounded-xl drop-shadow-xl" />
          </div>
          <div className="flex flex-col justify-center gap-6 p-8 sm:p-12">
            <Badge className="w-fit bg-accent text-accent-foreground hover:bg-accent"><Radio data-icon="inline-start" /> New access layer</Badge>
            <div className="flex flex-col gap-3"><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Smart NFC cards</h2><p className="text-lg font-medium text-primary">Verify once. Continue care everywhere.</p><p className="leading-7 text-muted-foreground">When a patient enters the doctor&apos;s room, they can tap their card or share a patient ID. Authorized teams open the right record with less repetition and more context.</p></div>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2"><li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />Contactless patient verification</li><li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />Patient ID fallback always available</li><li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />Lifetime history at a glance</li><li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />Consent-led record access</li></ul>
            <Button className="w-fit" render={<Link href="/nfc" />}>Learn more<ArrowRight data-icon="inline-end" /></Button>
          </div>
        </div>
      </section>
    </>
  )
}
