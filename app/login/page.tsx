"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Building2, Flower2, LockKeyhole, ScanLine, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { PortalBrand, GovernmentMark } from '@/components/portal-brand'
import { cn } from '@/lib/utils'
import { registerAccount, roleHome, signIn, type AppRole } from '@/lib/client-auth'

const roles = [
  { id: 'kiosk', title: 'Patient kiosk', native: 'रोगी सेवा', description: 'Start a guided, multilingual intake for a new or returning patient.', href: '/kiosk', icon: ScanLine },
  { id: 'physician', title: 'Physician console', native: 'चिकित्सक डेस्क', description: 'Open a patient record using NFC, patient ID, and longitudinal history.', href: '/physician', icon: Stethoscope },
  { id: 'triage', title: 'Triage board', native: 'ट्रायेज़ बोर्ड', description: 'Review red flags, department signals, and the day’s care flow.', href: '/triage', icon: Building2 },
] as const

export default function LoginPage() {
  const [selected, setSelected] = useState<(typeof roles)[number]['id']>('physician')
  const [signedIn, setSignedIn] = useState(false)
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [aadhaar, setAadhaar] = useState('')
  const [abhaId, setAbhaId] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [language, setLanguage] = useState('en')
  const role = roles.find((item) => item.id === selected) ?? roles[1]
  const appRole: AppRole = selected === 'kiosk' ? 'patient' : selected
  const Icon = role.icon

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-card/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <PortalBrand />
          <GovernmentMark />
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
        <section className="relative overflow-hidden rounded-3xl border border-primary/15 bg-primary p-8 text-primary-foreground shadow-xl shadow-primary/10 sm:p-12">
          <div className="absolute -right-20 -top-20 size-64 rounded-full border border-primary-foreground/15" />
          <div className="absolute -bottom-28 -left-12 size-72 rounded-full border border-primary-foreground/10" />
          <div className="relative flex h-full flex-col justify-between gap-16">
            <div className="flex flex-col gap-7">
              <Badge variant="secondary" className="w-fit bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20">
                <BadgeCheck data-icon="inline-start" /> Secure role access
              </Badge>
              <div className="flex flex-col gap-4">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">One gateway for connected care.</h1>
                <p className="max-w-lg text-base leading-7 text-primary-foreground/75">A calm, accessible workspace for patient intake, physician decisions, and care-team coordination.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t border-primary-foreground/15 pt-5 text-sm text-primary-foreground/70">
              <Flower2 className="size-5" />
              <span>AyushSetu · डिजिटल स्वास्थ्य सेतु</span>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-6 lg:py-4">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Role sign in</p>
            <h2 className="text-3xl font-semibold tracking-tight">Choose your workspace</h2>
            <div className="flex items-center justify-between gap-4"><p className="text-muted-foreground">Create your role account once, then sign in to your private workspace.</p><label className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">Language<select value={language} onChange={(event) => setLanguage(event.target.value)} className="rounded-md border border-border bg-card px-2 py-1 text-foreground"><option value="en">English</option><option value="hi">हिन्दी</option><option value="mr">मराठी</option><option value="bn">বাংলা</option><option value="ta">தமிழ்</option><option value="te">తెలుగు</option></select></label></div>
          </div>
          <div className="grid gap-3">
            {roles.map((item) => {
              const ItemIcon = item.icon
              const active = selected === item.id
              return (
                <button key={item.id} type="button" onClick={() => { setSelected(item.id); setSignedIn(false) }} className={cn('flex items-start gap-4 rounded-2xl border p-4 text-left transition-colors', active ? 'border-primary bg-accent/60 shadow-sm' : 'border-border bg-card hover:bg-muted/50')}>
                  <span className={cn('grid size-11 shrink-0 place-items-center rounded-xl', active ? 'bg-primary text-primary-foreground' : 'bg-muted text-primary')}><ItemIcon className="size-5" /></span>
                  <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2 font-medium">{item.title}<span className="text-xs font-normal text-muted-foreground">{item.native}</span></span><span className="mt-1 block text-sm leading-5 text-muted-foreground">{item.description}</span></span>
                  <ArrowRight className={cn('mt-1 size-4 transition-transform', active ? 'translate-x-0 text-primary' : '-translate-x-1 text-muted-foreground')} />
                </button>
              )
            })}
          </div>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Icon className="size-5 text-primary" /> {mode === 'register' ? 'Create account' : 'Sign in'} to {role.title}</CardTitle><CardDescription>{role.native} · private {appRole} workspace</CardDescription></CardHeader>
<CardContent className="flex flex-col gap-4">
              {mode === 'register' && <div className="grid gap-2"><Label htmlFor="name">Full name</Label><Input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" /></div>}
              {appRole === 'patient' && <><div className="grid gap-2"><Label htmlFor="aadhaar">{mode === 'register' ? 'Aadhaar number' : 'Aadhaar number (or ABHA ID)'}</Label><Input id="aadhaar" inputMode="numeric" value={aadhaar} onChange={(event) => setAadhaar(event.target.value)} placeholder="12-digit Aadhaar" /></div><div className="grid gap-2"><Label htmlFor="abha">ABHA ID</Label><Input id="abha" value={abhaId} onChange={(event) => setAbhaId(event.target.value)} placeholder="Your ABHA ID" /></div>{mode === 'register' && <div className="grid gap-2 sm:grid-cols-2"><div><Label htmlFor="phone">Mobile number</Label><Input id="phone" inputMode="tel" value={phone} onChange={(event) => setPhone(event.target.value)} /></div><div><Label htmlFor="dob">Date of birth</Label><Input id="dob" type="date" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} /></div></div>}</>}
              {appRole !== 'patient' && <div className="grid gap-2"><Label htmlFor="email">Email address</Label><Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div>}
              <div className="grid gap-2"><Label htmlFor="access-pin">{appRole === 'patient' ? 'Password / PIN' : 'Password'}</Label><Input id="access-pin" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" /></div>
              {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
              {signedIn && <p className="text-sm text-primary">Account verified. Continue to the {role.title}.</p>}
              <Button size="lg" className="min-h-12" onClick={() => { try { setError(''); const account = mode === 'register' ? registerAccount({ name, email, password, aadhaar: appRole === 'patient' ? aadhaar : undefined, abhaId: appRole === 'patient' ? abhaId : undefined, phone, dateOfBirth, role: appRole, language }) : signIn(appRole === 'patient' ? (aadhaar || abhaId) : email, password, appRole); setSignedIn(true); window.location.href = roleHome[account.role] } catch (err) { setError(err instanceof Error ? err.message : 'Unable to continue.') } }}>{mode === 'register' ? 'Create account' : 'Sign in'}<LockKeyhole data-icon="inline-end" /></Button>
              <Button type="button" variant="ghost" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}>{mode === 'login' ? 'New here? Create an account' : 'Already registered? Sign in'}</Button>
            </CardContent>
          </Card>
          <p className="text-center text-xs text-muted-foreground">Need a public entry point? <Link className="font-medium text-primary hover:underline" href="/">Return to portal home</Link></p>
        </section>
      </div>
    </main>
  )
}
