import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Noto_Sans_Bengali,
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
  Noto_Sans_Kannada,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
} from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

// Script coverage for the kiosk's regional languages. These are fallback faces in a
// single stack, not additional display families.
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-devanagari',
  display: 'swap',
})

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-bengali',
  display: 'swap',
})

const notoTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-tamil',
  display: 'swap',
})

const notoTelugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-telugu',
  display: 'swap',
})

const notoKannada = Noto_Sans_Kannada({
  subsets: ['kannada'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-kannada',
  display: 'swap',
})

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ['gujarati'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-gujarati',
  display: 'swap',
})

const fontVariables = [
  plexSans.variable,
  plexMono.variable,
  notoDevanagari.variable,
  notoBengali.variable,
  notoTamil.variable,
  notoTelugu.variable,
  notoKannada.variable,
  notoGujarati.variable,
].join(' ')

export const metadata: Metadata = {
  title: 'MediKiosk — AI Clinical Intake Platform',
  description:
    'Self-service AI clinical history kiosk for Indian hospital OPDs. Multilingual voice and touch intake, medical document digitisation, and physician-ready structured summaries.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0b5c47',
  userScalable: false,
  initialScale: 1,
  width: 'device-width',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light bg-background ${fontVariables}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
