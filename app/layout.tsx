import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'

// Self-hosted at build time (no runtime request to Google — privacy-safe).
// Geist = body/sans, Geist Mono = labels/code, Fraunces = serif display headlines.
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://oxdroid.io'),
  title: "oxdroid | Mobile security for what's next.",
  description: 'Independent mobile security lab for iOS and Android teams. Find what your mobile app is missing.',
  generator: 'oxdroid security lab',
  applicationName: 'oxdroid',
  keywords: [
    'mobile app security',
    'mobile pentesting',
    'iOS security',
    'Android security',
    'mobile application security testing',
    'MASVS',
    'OWASP Mobile Top 10',
    'autonomous security',
    'app security scanner',
    'mobile AppSec',
    'APK security testing',
    'account takeover',
  ],
  authors: [{ name: 'oxdroid' }],
  creator: 'oxdroid',
  publisher: 'oxdroid',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: "oxdroid | Mobile security for what's next.",
    description: 'Independent mobile security lab for iOS and Android teams. Find what your mobile app is missing.',
    url: 'https://oxdroid.io',
    siteName: 'oxdroid',
    images: [
      {
        url: '/images/oxdroid-logo.png',
        width: 1024,
        height: 1024,
        alt: 'oxdroid mobile security logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@oxdroidlab',
    creator: '@oxdroidlab',
    title: "oxdroid | Mobile security for what's next.",
    description: 'Autonomous mobile app security for iOS and Android teams. Findings backed by reproducible proof.',
    images: ['/images/oxdroid-logo.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f1f0eb',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'oxdroid',
  url: 'https://oxdroid.io',
  logo: 'https://oxdroid.io/images/oxdroid-logo.png',
  description: 'Autonomous mobile app security for iOS and Android teams. Static and dynamic testing on real devices, findings backed by reproducible proof.',
  sameAs: [
    'https://github.com/oxdroid',
    'https://www.linkedin.com/company/oxdroid',
    'https://twitter.com/oxdroidlab',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  )
}
