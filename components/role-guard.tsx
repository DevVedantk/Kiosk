'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession, type AppRole } from '@/lib/client-auth'

export function RoleGuard({ role, children }: { role: AppRole; children: React.ReactNode }) {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)
  useEffect(() => {
    const session = getSession()
    if (!session || session.role !== role) router.replace('/login')
    else setAllowed(true)
  }, [role, router])
  return allowed ? children : <main className="grid min-h-svh place-items-center bg-background text-sm text-muted-foreground">Checking secure workspace…</main>
}
