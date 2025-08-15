import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://poonhill.com'
  const currentDate = new Date().toISOString()

  const sitemaps = [
    {
      loc: `${baseUrl}/sitemap-static.xml`,
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/sitemap-activities.xml`,
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/sitemap-destinations.xml`,
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/sitemap-packages.xml`,
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/sitemap-blogs.xml`,
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/sitemap-categories.xml`,
      lastmod: currentDate,
    },
  ]

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (sitemap) => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`

  return new NextResponse(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
} 