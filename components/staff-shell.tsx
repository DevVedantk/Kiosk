'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { PortalBrand } from '@/components/portal-brand'
import { cn } from '@/lib/utils'
import { getSession, signOut } from '@/lib/client-auth'
import { useEffect, useState } from 'react'

const LINKS = [
  { href: '/physician', label: 'Physician' },
  { href: '/triage', label: 'Triage board' },
  { href: '/kiosk', label: 'Kiosk' },
  { href: '/nfc', label: 'NFC access' },
]

export function StaffShell({
  title,
  subtitle,
  meta,
  children,
}: {
  title: string
  subtitle: string
  meta?: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sessionName, setSessionName] = useState('')
  useEffect(() => { setSessionName(getSession()?.name ?? '') }, [])

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
          <PortalBrand compact />
          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <nav aria-label="Staff views" className="flex items-center gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={cn(
                  'rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {meta && (
            <Badge variant="outline" className="ml-auto font-mono text-[0.68rem] font-normal">
              {meta}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">{sessionName}</span>
          <button type="button" onClick={() => { signOut(); window.location.href = '/login' }} className="ml-auto text-xs font-medium text-primary hover:underline sm:ml-2">
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-5 pt-8">
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h1>
        <p className="mt-1 max-w-3xl leading-relaxed text-muted-foreground text-pretty">{subtitle}</p>
      </div>

      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-6">{children}</main>
    </div>
  )
}
