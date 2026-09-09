import type { MetadataRoute } from 'next'

// Generated at build into /sitemap.xml (works with output: 'export').
export const dynamic = 'force-static'

const BASE = 'https://oxdroid.io'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: `${BASE}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/blogs`, lastModified, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
