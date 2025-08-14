import Banner from '@/components/banner';
import React from 'react';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { PackageDetails } from './_components/package-details';
import { PackageBooking } from './_components/booking';
import { Navigation } from './_components/navigation';
import { notFound } from 'next/navigation';

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
    const url = typeof window !== 'undefined' ? window.location.href : '';
    
    return {
      title,
      description,
      keywords,
      alternates: canonical ? { canonical } : undefined,
      openGraph: {
        title,
        description,
        url: canonical || url,
        type: 'article',
        images: [image],
        siteName: 'Your Site Name',
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

    return (
      <main>
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
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-2'>
              <Navigation packageData={result} />
              <PackageDetails pack={result} />
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
