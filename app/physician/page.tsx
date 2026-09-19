import { PhysicianWorkspace } from '@/components/physician/physician-workspace'
import { StaffShell } from '@/components/staff-shell'
import { RoleGuard } from '@/components/role-guard'

export const metadata = {
  title: 'Physician summary — MediKiosk',
  description:
    'The structured history captured at the kiosk, ready before the patient walks into the consultation room.',
}

export default function PhysicianPage() {
  return (
    <RoleGuard role="physician"><StaffShell
      title="Consultation desk"
      subtitle="Scan a patient NFC card or enter their ID to open the complete longitudinal record, prior discussions, feedback, and follow-up trail."
      meta="Dr. A. Menon · General Medicine · Room 14"
    >
      <PhysicianWorkspace />
    </StaffShell></RoleGuard>
  )
}
