import { getBaseUrl } from '@/config/sitemap'
import { NextResponse } from 'next/server'
import { fetchData } from '@/utils/request-intregation'
import ENDPOINTS from '@/utils/endpoints'

export async function GET() {
  const baseUrl = getBaseUrl()
  
  try {
    // Fetch all active categories/static pages
    const categoriesRes = await fetchData(ENDPOINTS.CATEGORIES)
    const categories = categoriesRes?.items || []

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      throw new Error('No categories found')
    }

    // Filter only active categories
    const activeCategories = categories.filter((category: any) => category.isActive === true)

    const categoryUrls = activeCategories.map((category: any) => {
      // Use endpoint or slug for URL
      const urlPath = category.endpoint || category.slug || category.title?.toLowerCase().replace(/\s+/g, '-')
      
      return {
        url: `${baseUrl}/pages/${urlPath}`,
        lastModified: category.updatedAt || category.createdAt || new Date().toISOString(),
        changeFreq: 'monthly',
        priority: 0.5,
        category,
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
${categoryUrls
  .map((item) => {
    const { category } = item
    const imageUrl = category?.seo?.media?.original || category?.seo?.media?.thumbnail
    
    return `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFreq}</changefreq>
    <priority>${item.priority}</priority>${imageUrl ? `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${category?.title || 'Page'}</image:title>
      <image:caption>${(category?.seo?.metaDescription || '').slice(0, 256)}</image:caption>
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
    console.error('Error generating categories sitemap:', error)
    
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