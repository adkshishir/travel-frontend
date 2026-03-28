import { NextResponse } from 'next/server'
import { getBaseUrl } from '@/config/sitemap'

export async function GET() {
  const baseUrl = getBaseUrl()

  const staticPages = [
    { url: baseUrl, lastModified: new Date().toISOString(), changeFreq: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString(), changeFreq: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date().toISOString(), changeFreq: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified: new Date().toISOString(), changeFreq: 'daily', priority: 0.8 },
    { url: `${baseUrl}/team`, lastModified: new Date().toISOString(), changeFreq: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/gallery`, lastModified: new Date().toISOString(), changeFreq: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/why-us`, lastModified: new Date().toISOString(), changeFreq: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/responsible-travel`, lastModified: new Date().toISOString(), changeFreq: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/travel-tips`, lastModified: new Date().toISOString(), changeFreq: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/testimonials`, lastModified: new Date().toISOString(), changeFreq: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/search`, lastModified: new Date().toISOString(), changeFreq: 'daily', priority: 0.9 },
    { url: `${baseUrl}/booking`, lastModified: new Date().toISOString(), changeFreq: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: new Date().toISOString(), changeFreq: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date().toISOString(), changeFreq: 'yearly', priority: 0.3 },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
