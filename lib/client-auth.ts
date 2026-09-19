export type AppRole = 'patient' | 'physician' | 'triage'

export type LocalAccount = {
  id: string
  name: string
  email: string
  password: string
  aadhaar?: string
  abhaId?: string
  phone?: string
  dateOfBirth?: string
  role: AppRole
  language: string
  createdAt: string
}

const ACCOUNTS_KEY = 'ayushsetu-accounts'
const SESSION_KEY = 'ayushsetu-session'

export function getAccounts(): LocalAccount[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(window.localStorage.getItem(ACCOUNTS_KEY) ?? '[]') } catch { return [] }
}

export function registerAccount(account: Omit<LocalAccount, 'id' | 'createdAt'>) {
  const accounts = getAccounts()
  if (account.role === 'patient' && !account.aadhaar && !account.abhaId) throw new Error('Patient registration requires Aadhaar or ABHA ID.')
  if (accounts.some((item) => (account.email && item.email && item.email.toLowerCase() === account.email.toLowerCase()) || (account.aadhaar && item.aadhaar === account.aadhaar) || (account.abhaId && item.abhaId === account.abhaId))) throw new Error('An account already exists with these details.')
  const next = { ...account, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, next]))
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(next))
  return next
}

export function signIn(identifier: string, password: string, role: AppRole) {
  const normalized = identifier.trim().toLowerCase()
  const account = getAccounts().find((item) => ((role === 'patient' && (item.aadhaar === identifier.trim() || item.abhaId?.toLowerCase() === normalized)) || (role !== 'patient' && item.email.toLowerCase() === normalized)) && item.password === password && item.role === role)
  if (!account) throw new Error('Email, password, or role does not match.')
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(account))
  return account
}

export function getSession(): LocalAccount | null {
  if (typeof window === 'undefined') return null
  try { return JSON.parse(window.localStorage.getItem(SESSION_KEY) ?? 'null') } catch { return null }
}

export function signOut() { window.localStorage.removeItem(SESSION_KEY) }

export const roleHome: Record<AppRole, string> = { patient: '/account', physician: '/physician', triage: '/triage' }
