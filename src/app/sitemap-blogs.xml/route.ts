import { NextResponse } from 'next/server'
import { fetchData } from '@/utils/request-intregation'
import ENDPOINTS from '@/utils/endpoints'

export async function GET() {
  const baseUrl = 'https://poonhill.com'
  
  try {
    // Fetch all published blogs
    const blogsRes = await fetchData(ENDPOINTS.BLOGS)
    const blogs = blogsRes?.items || []

    if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
      throw new Error('No blogs found')
    }

    // Filter only published blogs if there's a published field
    const publishedBlogs = blogs.filter((blog: any) => blog.isPublished !== false)

    const blogUrls = publishedBlogs.map((blog: any) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt || blog.createdAt || new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.6,
      blog,
    }))

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd
        http://www.google.com/schemas/sitemap-news/0.9
        http://www.google.com/schemas/sitemap-news/0.9/sitemap-news.xsd">
${blogUrls
  .map((item) => {
    const { blog } = item
    const featuredImage = blog?.media?.original || blog?.media?.thumbnail
    const seoImage = blog?.seo?.media?.original || blog?.seo?.media?.thumbnail
    const imageUrl = featuredImage || seoImage
    
    // Check if blog is recent (within last 2 days) for news sitemap
    const blogDate = new Date(blog.createdAt || blog.publishedAt)
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    const isRecentNews = blogDate > twoDaysAgo
    
    let newsXml = ''
    if (isRecentNews) {
      newsXml = `
    <news:news>
      <news:publication>
        <news:name>Poon Hill Trekking &amp; Tours</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${blogDate.toISOString()}</news:publication_date>
      <news:title>${blog?.title || 'Blog Post'}</news:title>
    </news:news>`
    }
    
    return `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFreq}</changefreq>
    <priority>${item.priority}</priority>${imageUrl ? `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${blog?.title || 'Blog Post'}</image:title>
      <image:caption>${(blog?.description || blog?.subtitle || '').slice(0, 256)}</image:caption>
    </image:image>` : ''}${newsXml}
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
    console.error('Error generating blogs sitemap:', error)
    
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