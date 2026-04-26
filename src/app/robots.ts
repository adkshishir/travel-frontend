import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://traveltreks.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/auth/',
          '/api/',
          '/private/',
          '/_next/',
          '/temp/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/api/', '/private/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/auth/', '/api/', '/private/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap-static.xml`,
      `${baseUrl}/sitemap-activities.xml`,
      `${baseUrl}/sitemap-destinations.xml`,
      `${baseUrl}/sitemap-packages.xml`,
      `${baseUrl}/sitemap-blogs.xml`,
      `${baseUrl}/sitemap-categories.xml`,
      `${baseUrl}/sitemap-comprehensive.xml`,
    ],
    host: baseUrl,
  }
}
