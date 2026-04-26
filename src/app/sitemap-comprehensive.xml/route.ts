import { NextResponse } from 'next/server';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import {
  getBaseUrl,
  formatSitemapDate,
  escapeXml,
  truncateText,
} from '@/config/sitemap';

export async function GET() {
  const baseUrl = getBaseUrl();

  try {
    // Fetch all data in parallel
    const [
      activitiesRes,
      destinationsRes,
      packagesRes,
      blogsRes,
      categoriesRes,
    ] = await Promise.all([
      fetchData(ENDPOINTS.ACTIVITIES).catch(() => ({})),
      fetchData(ENDPOINTS.DESTINATIONS).catch(() => ({})),
      fetchData(ENDPOINTS.PACKAGES).catch(() => ({})),
      fetchData(ENDPOINTS.BLOGS).catch(() => ({})),
      fetchData(ENDPOINTS.CATEGORIES).catch(() => ({})),
    ]);

    const activities = activitiesRes?.items || [];
    const destinations = destinationsRes?.items || [];
    const packages = packagesRes?.items || [];
    const blogs = blogsRes?.items || [];
    const categories = categoriesRes?.items || [];

    const allUrls: any[] = [];

    // Static pages (highest priority)
    const staticPages = [
      { url: baseUrl, priority: 1.0, changefreq: 'daily' },
      { url: `${baseUrl}/about`, priority: 0.8, changefreq: 'monthly' },
      { url: `${baseUrl}/contact`, priority: 0.7, changefreq: 'monthly' },
      { url: `${baseUrl}/blogs`, priority: 0.8, changefreq: 'daily' },
      { url: `${baseUrl}/booking`, priority: 0.9, changefreq: 'monthly' },
      { url: `${baseUrl}/privacy`, priority: 0.3, changefreq: 'yearly' },
      { url: `${baseUrl}/terms`, priority: 0.3, changefreq: 'yearly' },
    ];

    allUrls.push(
      ...staticPages.map((page) => ({
        ...page,
        lastmod: new Date().toISOString(),
        type: 'static',
      })),
    );

    // Activities
    if (Array.isArray(activities)) {
      activities.forEach((activity: any) => {
        allUrls.push({
          url: `${baseUrl}/${activity.slug}`,
          lastmod: formatSitemapDate(
            activity.updatedAt || activity.createdAt || new Date(),
          ),
          changefreq: 'weekly',
          priority: 0.8,
          type: 'activity',
          data: activity,
        });
      });
    }

    // Destinations
    if (Array.isArray(destinations)) {
      destinations.forEach((destination: any) => {
        const activitySlug = destination.activity?.slug || 'activity';
        allUrls.push({
          url: `${baseUrl}/${activitySlug}/${destination.slug}`,
          lastmod: formatSitemapDate(
            destination.updatedAt || destination.createdAt || new Date(),
          ),
          changefreq: 'weekly',
          priority: 0.7,
          type: 'destination',
          data: destination,
        });
      });
    }

    // Packages (highest content priority)
    if (Array.isArray(packages)) {
      packages.forEach((pkg: any) => {
        const activitySlug = pkg.destination?.activity?.slug || 'activity';
        const destinationSlug = pkg.destination?.slug || 'destination';
        allUrls.push({
          url: `${baseUrl}/${activitySlug}/${destinationSlug}/${pkg.slug}`,
          lastmod: formatSitemapDate(
            pkg.updatedAt || pkg.createdAt || new Date(),
          ),
          changefreq: 'weekly',
          priority: 0.9,
          type: 'package',
          data: pkg,
        });
      });
    }

    // Blogs
    if (Array.isArray(blogs)) {
      const publishedBlogs = blogs.filter(
        (blog: any) => blog.isPublished !== false,
      );
      publishedBlogs.forEach((blog: any) => {
        allUrls.push({
          url: `${baseUrl}/blogs/${blog.slug}`,
          lastmod: formatSitemapDate(
            blog.updatedAt || blog.createdAt || new Date(),
          ),
          changefreq: 'monthly',
          priority: 0.6,
          type: 'blog',
          data: blog,
        });
      });
    }

    // Categories
    if (Array.isArray(categories)) {
      const activeCategories = categories.filter(
        (category: any) => category.isActive === true,
      );
      activeCategories.forEach((category: any) => {
        const urlPath =
          category.endpoint ||
          category.slug ||
          category.title?.toLowerCase().replace(/\s+/g, '-');
        allUrls.push({
          url: `${baseUrl}/pages/${urlPath}`,
          lastmod: formatSitemapDate(
            category.updatedAt || category.createdAt || new Date(),
          ),
          changefreq: 'monthly',
          priority: 0.5,
          type: 'category',
          data: category,
        });
      });
    }

    // Sort by priority (descending) then by type
    allUrls.sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      return a.type.localeCompare(b.type);
    });

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
${allUrls
  .map((item) => {
    let imageXml = '';
    let newsXml = '';

    // Add images based on content type
    if (item.type === 'package' && item.data) {
      const mainImage = item.data.media?.original || item.data.media?.thumbnail;
      if (mainImage) {
        imageXml = `
    <image:image>
      <image:loc>${mainImage}</image:loc>
      <image:title>${escapeXml(item.data.title || 'Package')}</image:title>
      <image:caption>${escapeXml(truncateText(item.data.description || ''))}</image:caption>
    </image:image>`;
      }
    } else if (
      (item.type === 'activity' || item.type === 'destination') &&
      item.data
    ) {
      const imageUrl = item.data.media?.original || item.data.media?.thumbnail;
      if (imageUrl) {
        imageXml = `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${escapeXml(item.data.name || item.data.title || 'Image')}</image:title>
      <image:caption>${escapeXml(truncateText(item.data.description || ''))}</image:caption>
    </image:image>`;
      }
    } else if (item.type === 'blog' && item.data) {
      const featuredImage =
        item.data.media?.original || item.data.media?.thumbnail;
      const seoImage =
        item.data.seo?.media?.original || item.data.seo?.media?.thumbnail;
      const imageUrl = featuredImage || seoImage;

      if (imageUrl) {
        imageXml = `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${escapeXml(item.data.title || 'Blog Post')}</image:title>
      <image:caption>${escapeXml(truncateText(item.data.description || item.data.subtitle || ''))}</image:caption>
    </image:image>`;
      }

      // Add news sitemap for recent blogs
      const blogDate = new Date(item.data.createdAt || item.data.publishedAt);
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      if (blogDate > twoDaysAgo) {
        newsXml = `
    <news:news>
      <news:publication>
        <news:name>Travel Trekking &amp; Tours</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${blogDate.toISOString()}</news:publication_date>
      <news:title>${escapeXml(item.data.title || 'Blog Post')}</news:title>
    </news:news>`;
      }
    }

    return `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>${imageXml}${newsXml}
  </url>`;
  })
  .join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating comprehensive sitemap:', error);

    // Return minimal sitemap on error
    const errorSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new NextResponse(errorSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    });
  }
}
