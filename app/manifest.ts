import type { MetadataRoute } from 'next'

// Generated at build into /manifest.webmanifest (works with output: 'export').
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'oxdroid — mobile app security',
    short_name: 'oxdroid',
    description:
      'Autonomous mobile app security for iOS and Android teams. Static and dynamic testing on real devices, findings backed by reproducible proof.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f1f0eb',
    theme_color: '#c9ff43',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
