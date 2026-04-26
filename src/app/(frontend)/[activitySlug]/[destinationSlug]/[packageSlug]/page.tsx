export const revalidate = 1800; // 30 min for package pages

import Banner from '@/components/banner';
import React from 'react';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { PackageDetails } from './_components/package-details';
import { PackageBooking } from './_components/booking';
import { Navigation } from './_components/navigation';
import { notFound } from 'next/navigation';
import getCanonicalUrl from '@/utils/canonical';
import JsonLd, { tourPackageSchema, faqPageSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import ShareButtons from '@/components/share-buttons';
import DifficultyBadge from '@/components/difficulty-badge';
import CommentSection from '@/components/comment-section';

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { activitySlug, destinationSlug, packageSlug } = await params;
  
  try {
    const response = await fetchData(ENDPOINTS.PACKAGES + '/' + packageSlug);
    const result = response?.package;
    
    // Validate URL structure matches backend data
    if (!result || 
        result.destination?.slug !== destinationSlug || 
        result.destination?.activity?.slug !== activitySlug) {
      return {
        title: 'Package Not Found',
        description: 'The requested package could not be found.',
      };
    }

    const seo = result?.seo || {};
    const title = seo.metaTitle || result?.title || 'Package Details';
    const description = seo.metaDescription || result?.description || 'Explore this amazing package.';
    const keywords = seo.metaKeywords || '';
    const canonical = seo.metaCanonical || '';
    const image = result?.mainImage?.thumbnail || result?.mainImage?.original || result?.media?.[0]?.thumbnail || result?.seo?.media?.thumbnail || '/images/hero.jpg';
    const pageUrl = canonical || getCanonicalUrl(`/${activitySlug}/${destinationSlug}/${packageSlug}`);
    
    return {
      title,
      description,
      keywords,
      alternates: { canonical: pageUrl },
      openGraph: {
        title,
        description,
        url: pageUrl,
        type: 'article',
        images: [image],
        siteName: 'Traveltreks',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
      robots: {
        index: true,
        follow: true,
      },
      ...(seo.schema && { other: { 'application/ld+json': seo.schema } }),
    };
  } catch (error) {
    return {
      title: 'Package Not Found',
      description: 'The requested package could not be found.',
    };
  }
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { activitySlug, destinationSlug, packageSlug } = await params;
  
  try {
    const response = await fetchData(ENDPOINTS.PACKAGES + '/' + packageSlug);
    const result = response?.package;

    // Handle case where package is not found
    if (!result) {
      notFound();
    }

    // Validate URL structure matches backend data (soft 404)
    const destination = result?.destination;
    const activity = destination?.activity;
    
    if (destination && destination.slug !== destinationSlug) {
      notFound();
    }
    
    if (activity && activity.slug !== activitySlug) {
      notFound();
    }

    const breadcrumbItems = [
      { name: 'Home', href: '/' },
      { name: activity?.name || 'Activity', href: `/${activity?.slug || activitySlug}` },
      { name: destination?.name || 'Destination', href: `/${activity?.slug || activitySlug}/${destination?.slug || destinationSlug}` },
      { name: result?.title || 'Package', href: `/${activitySlug}/${destinationSlug}/${packageSlug}` },
    ];

    return (
      <main>
        <JsonLd schema={tourPackageSchema({ ...result, slug: packageSlug as string })} />
        {result?.faqs?.length > 0 && <JsonLd schema={faqPageSchema(result.faqs)} />}
        <JsonLd schema={breadcrumbSchema(breadcrumbItems)} />

        <Banner
          title={result?.title || 'Package Details'}
          image={result?.mainImage?.thumbnail || result?.mainImage?.original || result?.media?.[0]?.thumbnail || '/images/hero.jpg'}
          breadcrumb={[
            { name: 'Home', href: '/' },
            { name: activity?.name || 'Activity', href: `/${activity?.slug || activitySlug}` },
            { name: destination?.name || 'Destination', href: `/${activity?.slug || activitySlug}/${destination?.slug || destinationSlug}` },
          ]}
          pageName={result?.title || 'Package Details'}
        />

        <div className='max-w-7xl mx-auto px-4 py-8'>
          {/* Package meta bar */}
          <div className='flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100'>
            <div className='flex flex-wrap items-center gap-3'>
              <DifficultyBadge difficulty={result?.culture || result?.activity} />
              {result?.bestSeason && (
                <span className='text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
                  Best: {result.bestSeason}
                </span>
              )}
              {result?.altitude && (
                <span className='text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
                  Max Alt: {result.altitude}
                </span>
              )}
            </div>
            <ShareButtons title={result?.title || 'Package Details'} url={getCanonicalUrl(`/${activitySlug}/${destinationSlug}/${packageSlug}`)} />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-2'>
              <Navigation packageData={result} />
              <PackageDetails pack={result} />
              <CommentSection packageId={result?.id} />
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-1'>
              <div className='sticky top-8'>
                <PackageBooking packageData={result} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching package:', error);
    notFound();
  }
}
