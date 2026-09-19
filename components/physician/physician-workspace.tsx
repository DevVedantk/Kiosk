'use client'

import * as React from 'react'
import {
  Activity,
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  FileText,
  GitBranch,
  History,
  MessageSquareText,
  ScanLine,
  Search,
  ShieldAlert,
  Stethoscope,
  UserRound,
} from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { QUEUE, type QueuePatient } from '@/lib/clinic-data'
import { cn } from '@/lib/utils'

type Visit = {
  id: string
  date: string
  title: string
  doctor: string
  facility: string
  branch: string
  summary: string
  feedback: string
  assessment: string
  followUp: string
  status: 'completed' | 'current'
}

const PATIENTS = QUEUE.map((patient) => ({
  ...patient,
  patientId: `MK-${patient.id.replace('p-', '2026-00')}`,
  cardId: `NFC-${patient.id.toUpperCase()}-A7F2`,
}))

function visitsFor(patient: QueuePatient): Visit[] {
  const source = patient.timeline.filter((entry) => entry.kind !== 'Kiosk intake')
  const doctors = ['Dr. Meera Iyer', 'Dr. Vivek Shah', 'Dr. Ananya Rao', 'Dr. Kavita Joshi', 'Dr. Sameer Kulkarni']
  const facilities = [
    'Community Health Centre, Kanpur',
    'District Hospital, Kanpur',
    'Sanjivani Diagnostics, Kanpur',
    'Lok Nayak Medical College, Lucknow',
    'MediKiosk District Hospital',
  ]
  const lifetime: Visit[] = [
    {
      id: `${patient.id}-2019`, date: '2019-03-18', title: 'First recorded visit', doctor: doctors[0], facility: facilities[0], branch: 'primary-care',
      summary: 'Routine evaluation for recurring fatigue and elevated blood pressure. Family history and long-term medicines recorded.',
      feedback: 'Patient was advised to monitor blood pressure weekly and return with readings.', assessment: 'Early hypertension suspected.', followUp: 'Review after 4 weeks with home BP log.', status: 'completed',
    },
    {
      id: `${patient.id}-2021`, date: '2021-11-06', title: 'Diabetes follow-up', doctor: doctors[1], facility: facilities[1], branch: 'chronic-care',
      summary: 'Discussed increased thirst and fasting glucose. Started a structured diabetes plan with diet and daily walking.',
      feedback: 'Patient reported better energy after following the diet plan.', assessment: 'Type 2 diabetes under treatment.', followUp: 'HbA1c and renal panel in 3 months.', status: 'completed',
    },
    {
      id: `${patient.id}-2023`, date: '2023-07-22', title: 'Specialist consultation', doctor: doctors[2], facility: facilities[3], branch: 'specialist',
      summary: 'Reviewed diabetes and hypertension control. Medication adherence and possible cardiovascular risk were discussed in detail.',
      feedback: 'Continue current medicines; bring all prior reports to each visit.', assessment: 'Multiple cardiovascular risk factors noted.', followUp: 'Annual cardiac risk review and lipid profile.', status: 'completed',
    },
    ...source.map((entry, index) => ({
      id: `${patient.id}-record-${index}`, date: entry.date, title: entry.kind, doctor: doctors[(index + 3) % doctors.length], facility: entry.source || facilities[(index + 2) % facilities.length], branch: 'record',
      summary: entry.detail, feedback: index === 0 ? 'Symptoms improved with the prescribed plan.' : 'Patient understood and agreed with the advice.', assessment: patient.summary[index % patient.summary.length]?.lines[0] ?? 'Clinical assessment recorded.', followUp: index === 0 ? 'Return if symptoms worsen; routine review advised.' : 'Review records at next visit.', status: 'completed' as const,
    })),
    {
      id: `${patient.id}-current`, date: '2026-08-26', title: 'Current consultation', doctor: 'You · Dr. Priya Menon', facility: 'MediKiosk District Hospital', branch: 'current',
      summary: 'New consultation opened from NFC card / patient ID lookup.', feedback: 'Awaiting today\'s discussion and doctor feedback.', assessment: 'To be entered during consultation.', followUp: 'To be decided by treating physician.', status: 'current',
    },
  ]
  return lifetime
}

function Lookup({ onOpen }: { onOpen: (patient: typeof PATIENTS[number]) => void }) {
  const [patientId, setPatientId] = React.useState('')
  const [scanning, setScanning] = React.useState(false)
  const [error, setError] = React.useState('')

  function openById() {
    const value = patientId.trim().toLowerCase()
    const found = PATIENTS.find((patient) => patient.patientId.toLowerCase() === value || patient.id === value || patient.abha.toLowerCase() === value)
    if (found) {
      setError('')
      onOpen(found)
    } else {
      setError('Demo patient not found. Try MK-2026-001 or use NFC scan.')
    }
  }

  function simulateScan() {
    setScanning(true)
    setError('')
    window.setTimeout(() => {
      setScanning(false)
      onOpen(PATIENTS[0])
    }, 900)
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <Card className="border-primary/20 bg-card shadow-sm">
        <CardHeader className="gap-3 pb-5">
          <Badge variant="secondary" className="w-fit gap-1.5 font-mono text-[0.68rem] font-normal uppercase tracking-widest">
            <UserRound data-icon="inline-start" /> Start here
          </Badge>
          <CardTitle className="text-2xl">Open a patient record</CardTitle>
          <CardDescription className="max-w-xl text-base leading-relaxed">
            Tap the patient&apos;s NFC health card on the reader, or search using the patient ID printed on their card.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Button size="lg" className="min-h-24 justify-start gap-4 px-6 text-left" onClick={simulateScan} disabled={scanning}>
            <span className="flex size-12 items-center justify-center rounded-sm bg-primary-foreground/15">
              <ScanLine data-icon="inline-start" />
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-lg">{scanning ? 'Reading card…' : 'Scan NFC card'}</span>
              <span className="text-sm font-normal opacity-80">Place the card near the reader</span>
            </span>
          </Button>
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <Separator className="flex-1" /> or <Separator className="flex-1" />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="patient-id" className="text-sm font-medium">Patient ID, ABHA number, or card number</label>
            <div className="flex gap-2">
              <Input id="patient-id" value={patientId} onChange={(event) => setPatientId(event.target.value)} placeholder="e.g. MK-2026-001" onKeyDown={(event) => { if (event.key === 'Enter') openById() }} />
              <Button variant="outline" onClick={openById} aria-label="Find patient"><Search data-icon="inline-start" /> Find</Button>
            </div>
            {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">Frontend demo mode: scanning selects a sample record. Backend lookup and real NFC hardware can be connected later.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">What opens for you</CardTitle>
          <CardDescription>One place for the complete patient story.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {[
            ['Longitudinal history', 'Every previous visit, doctor, facility, and outcome.'],
            ['Discussion trail', 'Feedback and follow-up from each conversation.'],
            ['Source documents', 'Scanned reports and the structured intake together.'],
          ].map(([title, detail]) => (
            <div key={title} className="flex gap-3">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm bg-secondary text-primary"><History data-icon="inline-start" /></span>
              <div className="flex flex-col gap-0.5"><p className="font-medium">{title}</p><p className="text-sm leading-relaxed text-muted-foreground">{detail}</p></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function PatientRecord({ patient, onBack }: { patient: typeof PATIENTS[number]; onBack: () => void }) {
  const visits = React.useMemo(() => visitsFor(patient), [patient])
  const [selectedVisit, setSelectedVisit] = React.useState(visits[visits.length - 1].id)
  const [sharedDocuments, setSharedDocuments] = React.useState<Array<{ id: string; name: string; size: number; type: string; uploadedAt: string }>>([])
  const visit = visits.find((item) => item.id === selectedVisit) ?? visits[visits.length - 1]

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem('ayushsetu-patient-files')
      if (stored) setSharedDocuments(JSON.parse(stored))
    } catch {
      setSharedDocuments([])
    }
  }, [])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft data-icon="inline-start" /> Change patient</Button>
        <Badge variant="outline" className="font-mono text-[0.65rem] font-normal">{patient.patientId}</Badge>
        <Badge variant="secondary" className="gap-1 font-mono text-[0.65rem] font-normal"><CreditCard data-icon="inline-start" /> {patient.cardId}</Badge>
      </div>
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-start gap-3">
            <div className="flex size-12 items-center justify-center rounded-sm bg-secondary text-primary"><UserRound data-icon="inline-start" /></div>
            <div className="flex min-w-0 flex-1 flex-col gap-1"><CardTitle className="text-2xl">{patient.name}</CardTitle><CardDescription className="text-base">{patient.age} years · {patient.sex === 'M' ? 'Male' : 'Female'} · {patient.department}</CardDescription></div>
            <Button><Stethoscope data-icon="inline-start" /> Start consultation</Button>
          </div>
          <div className="grid gap-4 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['ABHA', patient.abha], ['Presenting concern', patient.complaint], ['Language', patient.language], ['Documents', `${patient.docs} digitised`],
            ].map(([label, value]) => <div key={label} className="flex flex-col gap-1"><span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">{label}</span><span className="text-sm font-medium">{value}</span></div>)}
          </div>
        </CardHeader>
      </Card>
      {patient.flags.length > 0 && <Alert variant={patient.priority === 'emergency' ? 'destructive' : 'default'}><ShieldAlert /><AlertTitle>{patient.flags.length} red flag{patient.flags.length > 1 ? 's' : ''} from intake</AlertTitle><AlertDescription><ul className="flex flex-col gap-1">{patient.flags.map((flag) => <li key={flag.label}><strong>{flag.label}:</strong> {flag.reason}</li>)}</ul></AlertDescription></Alert>}
      <div className="grid gap-5 lg:grid-cols-[19rem_1fr]">
        <Card className="h-fit">
          <CardHeader className="pb-3"><div className="flex items-center gap-2"><GitBranch className="size-4 text-primary" /><CardTitle className="text-base">Lifetime history</CardTitle></div><CardDescription>Every care encounter, oldest to today</CardDescription></CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="relative flex flex-col gap-1 pl-5 before:absolute before:bottom-3 before:left-[0.6rem] before:top-3 before:w-px before:bg-border">
              {visits.map((item) => <button key={item.id} type="button" onClick={() => setSelectedVisit(item.id)} className={cn('relative flex w-full items-start gap-2 rounded-sm p-2.5 text-left transition-colors', selectedVisit === item.id ? 'bg-secondary text-secondary-foreground' : 'hover:bg-accent')}><span className={cn('absolute -left-[1.28rem] mt-1.5 size-2.5 rounded-full border-2 border-card', item.status === 'current' ? 'bg-primary' : 'bg-muted-foreground')} /><span className="flex min-w-0 flex-1 flex-col gap-0.5"><span className="truncate text-sm font-medium">{item.title}</span><span className="font-mono text-[0.65rem] text-muted-foreground">{item.date}</span><span className="truncate text-[0.7rem] text-muted-foreground">{item.doctor}</span><span className="truncate text-[0.7rem] text-muted-foreground">{item.facility}</span></span><ChevronRight className="mt-1 size-3.5 shrink-0 text-muted-foreground" /></button>)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><div className="flex flex-wrap items-center gap-2"><Badge variant={visit.status === 'current' ? 'default' : 'secondary'} className="font-normal">{visit.status === 'current' ? 'Current consultation' : 'Past visit'}</Badge><span className="font-mono text-sm text-muted-foreground">{visit.date}</span></div><CardTitle className="text-xl">{visit.title}</CardTitle><CardDescription className="flex flex-wrap gap-x-2 gap-y-1"><span>{visit.doctor}</span><span aria-hidden>·</span><span>{visit.facility}</span></CardDescription></CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-sm border border-border p-4"><p className="mb-2 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground"><MessageSquareText className="size-3.5" /> Discussion</p><p className="text-sm leading-relaxed">{visit.summary}</p></div><div className="rounded-sm border border-border p-4"><p className="mb-2 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground"><Check className="size-3.5" /> Doctor feedback</p><p className="text-sm leading-relaxed">{visit.feedback}</p></div></div>
            <Separator />
            <dl className="grid gap-4 sm:grid-cols-2"><div><dt className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">Assessment</dt><dd className="mt-1 text-sm leading-relaxed">{visit.assessment}</dd></div><div><dt className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">Follow-up</dt><dd className="mt-1 text-sm leading-relaxed">{visit.followUp}</dd></div></dl>
          </CardContent>
        </Card>
      </div>
      {sharedDocuments.length > 0 && <Card><CardHeader><CardTitle className="text-base">Patient-uploaded documents</CardTitle><CardDescription>Documents selected by the patient to share with the physician.</CardDescription></CardHeader><CardContent className="grid gap-2 sm:grid-cols-2">{sharedDocuments.map((file) => <div key={file.id} className="flex items-center gap-3 rounded-sm border border-border p-3"><FileText className="size-4 text-primary" /><span className="min-w-0 flex-1 truncate text-sm font-medium">{file.name}</span><Badge variant="secondary">Shared</Badge></div>)}</CardContent></Card>}
      <Tabs defaultValue="overview"><TabsList><TabsTrigger value="overview">Structured history</TabsTrigger><TabsTrigger value="documents">Documents & vitals</TabsTrigger><TabsTrigger value="note">New discussion</TabsTrigger></TabsList><TabsContent value="overview" className="grid gap-4 md:grid-cols-2">{patient.summary.map((section) => <Card key={section.heading}><CardHeader><CardTitle className="text-base">{section.heading}</CardTitle></CardHeader><CardContent><ul className="flex flex-col gap-2">{section.lines.map((line) => <li key={line} className="flex gap-2 text-sm leading-relaxed"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{line}</li>)}</ul></CardContent></Card>)}</TabsContent><TabsContent value="documents"><Card><CardHeader><CardTitle className="text-base">Documents and vitals</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><div className="flex flex-col gap-2">{patient.timeline.map((entry) => <div key={`${entry.date}-${entry.kind}`} className="flex items-start gap-3 rounded-sm border border-border p-3"><FileText className="mt-0.5 size-4 text-primary" /><div><p className="text-sm font-medium">{entry.kind}</p><p className="text-xs text-muted-foreground">{entry.date} · {entry.source}</p><p className="mt-1 text-sm leading-relaxed">{entry.detail}</p></div></div>)}</div><div className="flex flex-wrap content-start gap-5 rounded-sm bg-secondary p-4">{patient.vitals?.map((vital) => <div key={vital.label} className="flex flex-col gap-1"><span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">{vital.label}</span><span className={cn('font-mono font-semibold', vital.abnormal && 'text-destructive')}>{vital.value}</span></div>)}</div></CardContent></Card></TabsContent><TabsContent value="note"><Card><CardHeader><CardTitle className="text-base">Continue today&apos;s discussion</CardTitle><CardDescription>Add examination findings, assessment, plan, and feedback in the connected EMR later.</CardDescription></CardHeader><CardContent><Button><Activity data-icon="inline-start" /> Open consultation note</Button></CardContent></Card></TabsContent></Tabs>
    </div>
  )
}

export function PhysicianWorkspace() {
  const [patient, setPatient] = React.useState<(typeof PATIENTS)[number] | null>(null)
  return patient ? <PatientRecord patient={patient} onBack={() => setPatient(null)} /> : <Lookup onOpen={setPatient} />
}

export default PhysicianWorkspace
