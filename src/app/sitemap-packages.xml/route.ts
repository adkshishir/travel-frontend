import { getBaseUrl } from '@/config/sitemap'
import { NextResponse } from 'next/server'
import { fetchData } from '@/utils/request-intregation'
import ENDPOINTS from '@/utils/endpoints'

export async function GET() {
  const baseUrl = getBaseUrl()
  
  try {
    // Fetch all packages with their related destinations and activities
    const packagesRes = await fetchData(ENDPOINTS.PACKAGES)
    const packages = packagesRes?.items || []

    if (!packages || !Array.isArray(packages) || packages.length === 0) {
      throw new Error('No packages found')
    }

    const packageUrls = packages.map((pkg: any) => {
      const activitySlug = pkg.destination?.activity?.slug || 'activity'
      const destinationSlug = pkg.destination?.slug || 'destination'
      const packageSlug = pkg.slug
      
      return {
        url: `${baseUrl}/${activitySlug}/${destinationSlug}/${packageSlug}`,
        lastModified: pkg.updatedAt || pkg.createdAt || new Date().toISOString(),
        changeFreq: 'weekly',
        priority: 0.9, // High priority for packages as they are main content
        package: pkg,
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
${packageUrls
  .map((item) => {
    const { package: pkg } = item
    const mainImage = pkg?.media?.original || pkg?.media?.thumbnail
    const galleryImages = pkg?.mediaIds || []
    
    let imageXml = ''
    
    // Add main image
    if (mainImage) {
      imageXml += `
    <image:image>
      <image:loc>${mainImage}</image:loc>
      <image:title>${pkg?.title || 'Package'}</image:title>
      <image:caption>${(pkg?.description || '').slice(0, 256)}</image:caption>
    </image:image>`
    }
    
    // Add gallery images (limit to 10 for performance)
    if (galleryImages && Array.isArray(galleryImages)) {
      galleryImages.slice(0, 10).forEach((mediaItem: any, index: number) => {
        if (mediaItem?.original || mediaItem?.thumbnail) {
          imageXml += `
    <image:image>
      <image:loc>${mediaItem.original || mediaItem.thumbnail}</image:loc>
      <image:title>${pkg?.title || 'Package'} - Image ${index + 2}</image:title>
      <image:caption>${(pkg?.description || '').slice(0, 256)}</image:caption>
    </image:image>`
        }
      })
    }
    
    return `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFreq}</changefreq>
    <priority>${item.priority}</priority>${imageXml}
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
    console.error('Error generating packages sitemap:', error)
    
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