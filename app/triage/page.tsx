import { StaffShell } from '@/components/staff-shell'
import { TriageBoard } from '@/components/triage/triage-board'
import { RoleGuard } from '@/components/role-guard'

export const metadata = {
  title: 'Triage board — MediKiosk',
  description: 'Live OPD queue with red-flag escalations raised during kiosk intake.',
}

export default function TriagePage() {
  return (
    <RoleGuard role="triage"><StaffShell
      title="Triage & operations board"
      subtitle="One screen for the nursing desk: who is at a kiosk, whose history is ready, and which answers demand attention before the routine queue."
      meta="Sunday 25 Aug 2026 · 11:42 IST"
    >
      <TriageBoard />
    </StaffShell></RoleGuard>
  )
}
