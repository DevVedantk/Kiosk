'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Activity,
  ArrowLeft,
  Bell,
  CalendarDays,
  ChevronRight,
  FileCheck2,
  FileText,
  HeartPulse,
  Home,
  LogOut,
  MoreHorizontal,
  Pencil,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  Trash2,
  Upload,
  UserRound,
  X,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RoleGuard } from '@/components/role-guard'
import { getSession, signOut } from '@/lib/client-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PortalBrand, GovernmentMark } from '@/components/portal-brand'

type PatientFile = { id: string; name: string; size: number; type: string; uploadedAt: string }
const PROFILE_KEY = 'ayushsetu-patient-profile'
const FILES_KEY = 'ayushsetu-patient-files'

const previousVisits = [
  { date: '12', month: 'SEP', year: '2026', title: 'General wellness consultation', doctor: 'Dr. Ananya Sharma · Ayurveda', time: '10:30 AM', clinic: 'AyushSetu Wellness Centre · Block B', summary: 'Routine consultation and wellness review.' },
  { date: '28', month: 'AUG', year: '2026', title: 'Joint and back pain review', doctor: 'Dr. Rohan Mehta · Panchakarma', time: '03:15 PM', clinic: 'AyushSetu Wellness Centre · Block B', summary: 'Follow-up visit with treatment plan review.' },
  { date: '04', month: 'JUL', year: '2026', title: 'First consultation', doctor: 'Dr. Ananya Sharma · Ayurveda', time: '11:00 AM', clinic: 'AyushSetu Wellness Centre · Block A', summary: 'Initial health history and care plan recorded.' },
]

export default function AccountPage() {
  const [profile, setProfile] = React.useState({ name: '', phone: '', patientId: '' })
  const [files, setFiles] = React.useState<PatientFile[]>([])
  const [form, setForm] = React.useState({ name: '', phone: '' })
  const [saved, setSaved] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [activeTab, setActiveTab] = React.useState('health')
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const session = getSession()
    if (session) {
      const sessionProfile = { name: session.name, phone: session.phone ?? '', patientId: session.abhaId ?? session.aadhaar ?? '' }
      setProfile(sessionProfile)
      setForm({ name: session.name, phone: session.phone ?? '' })
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(sessionProfile))
    }
    const storedProfile = window.localStorage.getItem(PROFILE_KEY)
    const storedFiles = window.localStorage.getItem(FILES_KEY)
    if (storedProfile) {
      const next = JSON.parse(storedProfile)
      setProfile(next)
      setForm({ name: next.name ?? '', phone: next.phone ?? '' })
    }
    if (storedFiles) setFiles(JSON.parse(storedFiles))
  }, [])

  function saveProfile(event: React.FormEvent) {
    event.preventDefault()
    const next = { ...form, patientId: profile.patientId || `AY-${form.phone.replace(/\D/g, '').slice(-4) || 'DEMO'}` }
    setProfile(next)
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(next))
    setSaved(true)
  }

  function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const additions = Array.from(event.target.files ?? [])
      .filter((file) => file.type === 'application/pdf' || file.type.startsWith('image/'))
      .map((file) => ({ id: `${file.name}-${file.lastModified}`, name: file.name, size: file.size, type: file.type, uploadedAt: new Date().toISOString() }))
    const next = [...files, ...additions.filter((file) => !files.some((current) => current.id === file.id))]
    setFiles(next)
    window.localStorage.setItem(FILES_KEY, JSON.stringify(next))
    event.target.value = ''
  }

  function remove(id: string) {
    const next = files.filter((file) => file.id !== id)
    setFiles(next)
    window.localStorage.setItem(FILES_KEY, JSON.stringify(next))
  }

  const visibleFiles = files.filter((file) => file.name.toLowerCase().includes(query.toLowerCase()))
  const initials = profile.name ? profile.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase() : 'P'

return (
  <RoleGuard role="patient"><main className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3 lg:px-8">
          <PortalBrand />
          <div className="flex items-center gap-3"><Button variant="ghost" size="icon" aria-label="Notifications"><Bell className="size-5" /></Button><div className="hidden items-center gap-2 sm:flex"><div className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{initials}</div><span className="text-sm font-medium">{profile.name || 'Patient account'}</span></div><button type="button" onClick={() => { signOut(); window.location.href = '/login' }} className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Sign out</button></div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-0 lg:grid-cols-[240px_1fr]">
        <aside className="hidden border-r border-border/70 bg-card px-4 py-6 lg:block"><p className="mb-4 px-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Patient portal</p><nav className="flex flex-col gap-1">{[[Home, 'Overview'], [FileText, 'My documents'], [CalendarDays, 'Appointments'], [HeartPulse, 'Health summary'], [UserRound, 'Profile & settings']].map(([Icon, label], index) => { const destinations = ['#overview', '#documents', '#appointments', '#health-summary', '#profile-settings']; const tab = index === 3 ? 'health' : index === 4 ? 'profile' : undefined; return tab ? <button type="button" key={label as string} onClick={() => { setActiveTab(tab); window.requestAnimationFrame(() => document.getElementById('health-summary')?.scrollIntoView({ behavior: 'smooth', block: 'start' })) }} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"><Icon className="size-4" />{label as string}</button> : <a key={label as string} href={destinations[index]} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${index === 0 ? 'bg-primary/10 font-medium text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}><Icon className="size-4" />{label as string}</a> })}</nav><div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-4"><ShieldCheck className="mb-3 size-5 text-primary" /><p className="text-sm font-medium">Your records stay private</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Only documents you select will be shared at the MediKiosk.</p></div></aside>

        <section className="min-w-0 px-5 py-7 lg:px-9 lg:py-9">
          <div id="overview" className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Patient dashboard</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Good to see you, {profile.name ? profile.name.split(' ')[0] : 'patient'}</h1><p className="mt-2 text-muted-foreground">Review your complete care history, manage your records, and prepare for your next clinic visit.</p></div><Link href="/kiosk" className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90"><Stethoscope className="size-4" /> Start MediKiosk check-in</Link></div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Card><CardContent className="flex items-center gap-4 p-5"><div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><FileText className="size-5" /></div><div><p className="text-2xl font-semibold">{files.length}</p><p className="text-sm text-muted-foreground">Saved documents</p></div></CardContent></Card><Card><CardContent className="flex items-center gap-4 p-5"><div className="grid size-11 place-items-center rounded-xl bg-amber-500/10 text-amber-700"><CalendarDays className="size-5" /></div><div><p className="text-2xl font-semibold">{previousVisits.length}</p><p className="text-sm text-muted-foreground">Previous visits</p></div></CardContent></Card><Card><CardContent className="flex items-center gap-4 p-5"><div className="grid size-11 place-items-center rounded-xl bg-sky-500/10 text-sky-700"><Activity className="size-5" /></div><div><p className="text-2xl font-semibold">Good</p><p className="text-sm text-muted-foreground">Wellness status</p></div></CardContent></Card><Card><CardContent className="flex items-center gap-4 p-5"><div className="grid size-11 place-items-center rounded-xl bg-emerald-500/10 text-emerald-700"><ShieldCheck className="size-5" /></div><div><p className="text-2xl font-semibold">Private</p><p className="text-sm text-muted-foreground">Sharing control</p></div></CardContent></Card></div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]"><Card id="documents" className="scroll-mt-24"><CardHeader className="flex flex-row items-start justify-between gap-4"><div><CardTitle>My documents</CardTitle><CardDescription>Upload from home and choose what your doctor can see.</CardDescription></div><><input ref={inputRef} type="file" accept="image/*,.pdf" multiple className="sr-only" onChange={upload} /><Button size="sm" onClick={() => inputRef.current?.click()}><Upload data-icon="inline-start" /> Upload</Button></></CardHeader><CardContent><div className="mb-4 flex items-center gap-2"><Search className="size-4 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search documents" className="h-9" /></div>{visibleFiles.length === 0 ? <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-8 text-center"><FileText className="mx-auto size-8 text-primary" /><p className="mt-3 font-medium">No documents uploaded yet</p><p className="mt-1 text-sm text-muted-foreground">Add prescriptions, reports, or discharge summaries to use at the kiosk.</p><Button variant="outline" className="mt-4" onClick={() => inputRef.current?.click()}>Choose files</Button></div> : <div className="flex flex-col divide-y">{visibleFiles.map((file) => <div key={file.id} className="flex items-center gap-3 py-3"><div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"><FileCheck2 className="size-5" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{file.name}</p><p className="text-xs text-muted-foreground">{new Date(file.uploadedAt).toLocaleDateString()} · {(file.size / 1024).toFixed(0)} KB</p></div><Badge variant="secondary">Available at kiosk</Badge><Button variant="ghost" size="icon" onClick={() => remove(file.id)} aria-label={`Delete ${file.name}`}><Trash2 className="size-4 text-muted-foreground" /></Button></div>)}</div>}</CardContent></Card>

            <Card id="appointments" className="scroll-mt-24"><CardHeader><CardTitle>Previous visits</CardTitle><CardDescription>Your complete visit history, including when, where, and with whom you were seen.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3">{previousVisits.map((visit) => <details key={`${visit.date}-${visit.month}-${visit.year}`} className="group rounded-xl border p-3"><summary className="flex cursor-pointer list-none items-center gap-3"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground"><span className="text-lg font-semibold leading-none">{visit.date}</span><span className="text-[0.6rem] font-medium">{visit.month} {visit.year}</span></div><div className="min-w-0 flex-1"><p className="text-sm font-medium">{visit.title}</p><p className="mt-1 text-xs text-muted-foreground">{visit.doctor}</p></div><ChevronRight className="size-4 text-muted-foreground transition-transform group-open:rotate-90" /></summary><div className="mt-3 grid gap-2 border-t pt-3 text-xs text-muted-foreground sm:grid-cols-2"><p><span className="font-medium text-foreground">Date & time:</span> {visit.date} {visit.month} {visit.year}, {visit.time}</p><p><span className="font-medium text-foreground">Clinic:</span> {visit.clinic}</p><p className="sm:col-span-2"><span className="font-medium text-foreground">Visit note:</span> {visit.summary}</p></div></details>)}</CardContent></Card></div>

          <div id="health-summary" className="scroll-mt-24"><Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="health" className="mt-6"><TabsList><TabsTrigger value="health">Health summary</TabsTrigger><TabsTrigger value="profile">Profile & settings</TabsTrigger></TabsList><TabsContent value="health"><div className="grid gap-6 pt-4 md:grid-cols-3"><Card><CardHeader><CardTitle className="text-base">Care snapshot</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Primary care</span><span className="font-medium">Ayurveda</span></div><div className="flex justify-between"><span className="text-muted-foreground">Last visit</span><span className="font-medium">{previousVisits[0].date} {previousVisits[0].month} {previousVisits[0].year}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Blood group</span><span className="font-medium">Not added</span></div></CardContent></Card><Card><CardHeader><CardTitle className="text-base">Wellness goals</CardTitle></CardHeader><CardContent><div className="mb-2 flex justify-between text-sm"><span>Daily routine</span><span className="font-medium text-primary">70%</span></div><div className="h-2 rounded-full bg-muted"><div className="h-2 w-[70%] rounded-full bg-primary" /></div><p className="mt-3 text-xs leading-5 text-muted-foreground">Keep your profile updated so your physician has a complete picture.</p></CardContent></Card><Card><CardHeader><CardTitle className="text-base">Quick actions</CardTitle></CardHeader><CardContent className="flex flex-col gap-2"><Link href="/kiosk" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium shadow-xs hover:bg-accent"><Stethoscope className="size-4" /> Check in at kiosk</Link><Button variant="outline" onClick={() => inputRef.current?.click()}><Upload data-icon="inline-start" /> Add a document</Button></CardContent></Card></div></TabsContent><TabsContent value="profile"><div id="profile-settings" className="scroll-mt-24"><Card className="mt-4"><CardHeader><CardTitle>Profile details</CardTitle><CardDescription>This information helps the kiosk find your records.</CardDescription></CardHeader><CardContent><form onSubmit={saveProfile} className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end"><div className="grid gap-2"><Label htmlFor="patient-name">Full name</Label><Input id="patient-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div><div className="grid gap-2"><Label htmlFor="patient-phone">Phone number</Label><Input id="patient-phone" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></div><Button type="submit"><Pencil data-icon="inline-start" /> {saved ? 'Saved' : 'Save changes'}</Button></form>{profile.patientId && <p className="mt-4 rounded-lg bg-accent p-3 text-sm">Patient ID: <strong>{profile.patientId}</strong></p>}</CardContent></Card></div></TabsContent></Tabs></div>

          <div className="mt-8 flex items-center justify-between border-t border-border/70 pt-5"><Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back to AyushSetu</Link><GovernmentMark /></div>
        </section>
      </div>
    </main></RoleGuard>
  )
}
