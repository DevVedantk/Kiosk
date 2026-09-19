"use client"

import Link from 'next/link'
import { Flower2, ShieldCheck } from 'lucide-react'

export function PortalBrand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="AyushSetu home">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Flower2 aria-hidden="true" className="size-5" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-semibold tracking-tight">AyushSetu</span>
        {!compact && <span className="text-[0.68rem] text-muted-foreground">Integrated Care Gateway</span>}
      </span>
    </Link>
  )
}

export function GovernmentMark() {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <ShieldCheck aria-hidden="true" className="size-4 text-primary" />
      <span>Public health prototype · Ministry of AYUSH inspired</span>
    </div>
  )
}

export function PortalFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <GovernmentMark />
        <span>ABDM-ready workflow · Frontend demonstration</span>
      </div>
    </footer>
  )
}
