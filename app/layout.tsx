import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://oxdroid.io'),
  title: "oxdroid — Mobile security for what's next.",
  description: 'Independent mobile security lab for iOS and Android teams. Find what your mobile app is missing.',
  generator: 'oxdroid security lab',
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
    title: "oxdroid — Mobile security for what's next.",
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
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f1f0eb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
