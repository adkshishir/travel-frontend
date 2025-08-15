import { NextResponse } from 'next/server'
import { fetchData } from '@/utils/request-intregation'
import ENDPOINTS from '@/utils/endpoints'

export async function GET() {
  const baseUrl = 'https://poonhill.com'
  
  try {
    // Fetch all activities from API
    const activities = await fetchData(ENDPOINTS.ACTIVITIES)
    
    if (!activities || !Array.isArray(activities)) {
      throw new Error('No activities found')
    }

    const activityUrls = activities.map((activity: any) => ({
      url: `${baseUrl}/${activity.slug}`,
      lastModified: activity.updatedAt || activity.createdAt || new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.8,
    }))

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
${activityUrls
  .map((activity) => {
    const activityData = activities.find((a: any) => `${baseUrl}/${a.slug}` === activity.url)
    const imageUrl = activityData?.media?.original || activityData?.media?.thumbnail
    
    return `  <url>
    <loc>${activity.url}</loc>
    <lastmod>${activity.lastModified}</lastmod>
    <changefreq>${activity.changeFreq}</changefreq>
    <priority>${activity.priority}</priority>${imageUrl ? `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${activityData?.name || 'Activity'}</image:title>
      <image:caption>${(activityData?.description || '').slice(0, 256)}</image:caption>
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
    console.error('Error generating activities sitemap:', error)
    
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