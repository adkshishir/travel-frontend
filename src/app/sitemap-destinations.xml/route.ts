import { getBaseUrl } from '@/config/sitemap'
import { NextResponse } from 'next/server'
import { fetchData } from '@/utils/request-intregation'
import ENDPOINTS from '@/utils/endpoints'

export async function GET() {
  const baseUrl = getBaseUrl()
  
  try {
    // Fetch all destinations with their related activities
    const destinationsRes = await fetchData(ENDPOINTS.DESTINATIONS)
    const destinations = destinationsRes?.items || []

    if (!destinations || !Array.isArray(destinations) || destinations.length === 0) {
      throw new Error('No destinations found')
    }

    const destinationUrls = destinations.map((destination: any) => {
      const activitySlug = destination.activity?.slug || 'activity'
      return {
        url: `${baseUrl}/${activitySlug}/${destination.slug}`,
        lastModified: destination.updatedAt || destination.createdAt || new Date().toISOString(),
        changeFreq: 'weekly',
        priority: 0.7,
        destination,
      }
    })

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
${destinationUrls
  .map((item) => {
    const { destination } = item
    const imageUrl = destination?.media?.original || destination?.media?.thumbnail
    
    return `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFreq}</changefreq>
    <priority>${item.priority}</priority>${imageUrl ? `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${destination?.name || 'Destination'}</image:title>
      <image:caption>${(destination?.description || '').slice(0, 256)}</image:caption>
    </image:image>` : ''}
  </url>`
  })
  .join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating destinations sitemap:', error)
    
    // Return empty sitemap on error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`

    return new NextResponse(emptySitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    })
  }
} 