import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/config/sitemap'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()

  // This is a sitemap index - it references other sitemaps
  // This approach is better for sites with many URLs (500+ pages)
  return [
    // Reference to individual sitemaps
    {
      url: `${baseUrl}/sitemap-static.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/sitemap-activities.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap-destinations.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sitemap-packages.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sitemap-blogs.xml`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sitemap-categories.xml`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
} 