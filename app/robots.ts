import type { MetadataRoute } from 'next'

// Generated at build into /robots.txt (works with output: 'export').
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://oxdroid.io/sitemap.xml',
    host: 'https://oxdroid.io',
  }
}
