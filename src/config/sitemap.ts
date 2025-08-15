// Sitemap Configuration
export const SITEMAP_CONFIG = {
  // Base URL of the website
  BASE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://poonhill.com',
  
  // Cache settings
  CACHE_DURATION: 3600, // 1 hour in seconds
  ERROR_CACHE_DURATION: 300, // 5 minutes in seconds
  
  // Priority settings for different content types
  PRIORITIES: {
    HOME: 1.0,
    PACKAGES: 0.9,
    BOOKING: 0.9,
    ACTIVITIES: 0.8,
    BLOGS: 0.6,
    DESTINATIONS: 0.7,
    CATEGORIES: 0.5,
    STATIC_PAGES: {
      ABOUT: 0.8,
      CONTACT: 0.7,
      PRIVACY: 0.3,
      TERMS: 0.3,
    }
  },
  
  // Change frequency settings
  CHANGE_FREQUENCIES: {
    HOME: 'daily',
    PACKAGES: 'weekly',
    ACTIVITIES: 'weekly',
    DESTINATIONS: 'weekly',
    BLOGS: 'monthly',
    CATEGORIES: 'monthly',
    STATIC_PAGES: {
      DYNAMIC: 'monthly',
      LEGAL: 'yearly',
    }
  },
  
  // Image settings
  IMAGES: {
    MAX_PER_URL: 10, // Maximum images per URL in sitemap
    CAPTION_MAX_LENGTH: 256,
  },
  
  // News sitemap settings
  NEWS: {
    RECENT_DAYS: 2, // Days to consider as "recent news"
    PUBLICATION_NAME: 'Poon Hill Trekking & Tours',
    LANGUAGE: 'en',
  },
  
  // Content filters
  FILTERS: {
    PUBLISHED_ONLY: true,
    ACTIVE_ONLY: true,
  }
}

// Helper function to get base URL
export const getBaseUrl = (): string => {
  return SITEMAP_CONFIG.BASE_URL
}

// Helper function to format date for sitemap
export const formatSitemapDate = (date: string | Date): string => {
  const d = new Date(date)
  return d.toISOString()
}

// Helper function to escape XML content
export const escapeXml = (unsafe: string): string => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}

// Helper function to truncate text for captions
export const truncateText = (text: string, maxLength: number = SITEMAP_CONFIG.IMAGES.CAPTION_MAX_LENGTH): string => {
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text
} 