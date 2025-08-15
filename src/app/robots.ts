import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://poonhill.com'

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
          '*.json',
          '/sitemap.xml', // Disallow the default Next.js sitemap since we have custom ones
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/auth/',
          '/api/',
          '/private/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/auth/',
          '/api/',
          '/private/',
        ],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap-static.xml`,
      `${baseUrl}/sitemap-activities.xml`,
      `${baseUrl}/sitemap-destinations.xml`,
      `${baseUrl}/sitemap-packages.xml`,
      `${baseUrl}/sitemap-blogs.xml`,
      `${baseUrl}/sitemap-categories.xml`,
    ],
    host: baseUrl,
  }
} 