'use client'

import * as React from 'react'
import { MonitorSmartphone, ShieldAlert, Siren } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { KIOSK_STATIONS, QUEUE, TRIAGE_STATS, type QueuePatient } from '@/lib/clinic-data'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'flagged' | 'in-progress'

const STATION_STYLE: Record<string, string> = {
  busy: 'bg-primary',
  idle: 'bg-warning',
  offline: 'bg-destructive',
}

function priorityBadge(priority: QueuePatient['priority']) {
  return (
    <Badge
      variant={priority === 'emergency' ? 'destructive' : priority === 'urgent' ? 'default' : 'secondary'}
      className="font-normal"
    >
      {priority === 'emergency' ? 'Emergency' : priority === 'urgent' ? 'Urgent' : 'Routine'}
    </Badge>
  )
}

export function TriageBoard() {
  const [filter, setFilter] = React.useState<Filter>('all')

  const rows = QUEUE.filter((patient) => {
    if (filter === 'flagged') return patient.flags.length > 0
    if (filter === 'in-progress') return patient.status === 'in-progress'
    return true
  })

  const escalations = QUEUE.filter((patient) => patient.priority === 'emergency')

  return (
    <div className="flex flex-col gap-6">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TRIAGE_STATS.map((stat) => (
          <li key={stat.label}>
            <Card className="gap-2">
              <CardHeader className="gap-1">
                <CardDescription className="font-mono text-[0.66rem] uppercase tracking-[0.14em]">
                  {stat.label}
                </CardDescription>
                <CardTitle className="font-mono text-3xl tracking-tight">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{stat.delta}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      {escalations.length > 0 && (
        <Alert variant="destructive">
          <Siren />
          <AlertTitle>
            {escalations.length} emergency escalation{escalations.length > 1 ? 's' : ''} pending acknowledgement
          </AlertTitle>
          <AlertDescription>
            <ul className="flex flex-col gap-2">
              {escalations.map((patient) => (
                <li key={patient.id} className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-mono font-semibold">{patient.token}</span>
                  <span className="font-medium">{patient.name}</span>
                  <span>— {patient.flags[0]?.label}</span>
                  <Button size="sm" variant="outline" className="ml-auto">
                    Acknowledge & escort
                  </Button>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_20rem]">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-base">Live intake queue</CardTitle>
                <CardDescription>Ordered by clinical priority, then by waiting time.</CardDescription>
              </div>
              <ToggleGroup
                value={[filter]}
                onValueChange={(next) => {
                  const picked = next[0]
                  if (picked) setFilter(picked as Filter)
                }}
                className="ml-auto"
                aria-label="Filter queue"
              >
                <ToggleGroupItem value="all">All</ToggleGroupItem>
                <ToggleGroupItem value="flagged">Flagged</ToggleGroupItem>
                <ToggleGroupItem value="in-progress">At kiosk</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead className="hidden md:table-cell">Complaint</TableHead>
                  <TableHead className="hidden lg:table-cell">Department</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="hidden sm:table-cell">History</TableHead>
                  <TableHead className="text-right">Wait</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((patient) => (
                  <TableRow key={patient.id} className={cn(patient.priority === 'emergency' && 'bg-destructive/5')}>
                    <TableCell className="font-mono font-semibold">{patient.token}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1.5 font-medium">
                          {patient.name}
                          {patient.flags.length > 0 && (
                            <ShieldAlert
                              aria-label="Red flags present"
                              className={cn(
                                'size-3.5',
                                patient.priority === 'emergency' ? 'text-destructive' : 'text-primary',
                              )}
                            />
                          )}
                        </span>
                        <span className="font-mono text-[0.68rem] text-muted-foreground">
                          {patient.age}
                          {patient.sex} · {patient.language} · {patient.kiosk}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden max-w-56 md:table-cell">
                      <span className="block truncate text-sm text-muted-foreground">{patient.complaint}</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant="secondary" className="font-normal">
                        {patient.department}
                      </Badge>
                    </TableCell>
                    <TableCell>{priorityBadge(patient.priority)}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex w-28 flex-col gap-1">
                        <Progress value={patient.completeness} className="h-1.5" />
                        <span className="font-mono text-[0.65rem] text-muted-foreground">
                          {patient.completeness}% · {patient.docs} docs
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {patient.status === 'seen' ? 'Seen' : patient.status === 'in-progress' ? 'At kiosk' : `${patient.waitMinutes}m`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MonitorSmartphone aria-hidden className="size-4 text-primary" />
                <CardTitle className="text-base">Kiosk stations</CardTitle>
              </div>
              <CardDescription>Six units across the OPD block.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {KIOSK_STATIONS.map((station) => (
                  <li key={station.id} className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className={cn('size-2.5 shrink-0 rounded-full', STATION_STYLE[station.status])}
                    />
                    <span className="flex flex-1 flex-col">
                      <span className="font-mono text-sm font-semibold">{station.id}</span>
                      <span className="text-sm text-muted-foreground">{station.location}</span>
                    </span>
                    <span className="flex flex-col items-end">
                      <span className="font-mono text-sm">{station.sessionsToday}</span>
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                        {station.status}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="text-base">Escalation protocol</CardTitle>
              <CardDescription>
                The kiosk never diagnoses. It only routes based on documented red-flag answers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="flex flex-col gap-3">
                {[
                  'Red-flag answer recorded during interview.',
                  'Token re-prioritised and the triage nurse is paged.',
                  'Nurse acknowledges, escorts the patient, and records vitals.',
                  'Physician sees the full history with flags at the top.',
                ].map((line, index) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-[0.62rem] font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
