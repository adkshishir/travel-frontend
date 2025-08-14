import Banner from '@/components/banner';
import React from 'react';
import Packages from './_components/packages';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { activitySlug, destinationSlug } = await params;
  
  try {
    const result = await fetchData(ENDPOINTS.DESTINATIONS + '/' + destinationSlug);
 
    
    // Validate URL structure matches backend data
    if (!result || result.activity?.slug !== activitySlug) {
      return {
        title: 'Destination Not Found',
        description: 'The requested destination could not be found.',
      };
    }

    const seo = result?.seo || {};
    const title = seo.metaTitle || result?.name || 'Destination';
    const description = seo.metaDescription || result?.description || 'Explore this amazing destination.';
    const keywords = seo.metaKeywords || '';
    const canonical = seo.metaCanonical || '';
    const image = result?.media?.phone || result?.media?.thumbnail || result?.seo?.media?.thumbnail || '/images/hero.jpg';
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
        type: 'website',
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
      title: 'Destination Not Found',
      description: 'The requested destination could not be found.',
    };
  }
}

const DestinationPage = async ({ params }: { params: Promise<Params> }) => {
  const { activitySlug, destinationSlug } = await params;
  
  try {
    const result = await fetchData(ENDPOINTS.DESTINATIONS + '/' + destinationSlug);

    // Handle case where destination is not found
    if (!result) {
      notFound();
    }

    // Validate URL structure matches backend data (soft 404)
    const activity = result?.activity;
    if (activity && activity.slug !== activitySlug) {
      notFound();
    }

    return (
      <main>
        <Banner
          title={result?.name || 'Destination'}
          image={result?.media?.phone || '/images/hero.jpg'}
          breadcrumb={[
            { name: 'Home', href: '/' },
            { name: activity?.name || 'Activity', href: `/${activity?.slug || activitySlug}` },
          ]}
          pageName={result?.name || 'Destination'}
        />
        
        {/* Overview Section */}
        {result?.overview && (
          <div className='max-w-6xl mx-auto py-16 px-4'>
            <div className='space-y-6'>
              <h2 className='text-3xl font-bold text-gray-900'>Overview</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: result.overview,
                }}
                className='prose prose-lg max-w-none text-gray-700'
              />
            </div>
          </div>
        )}

        <Packages packages={result?.packages} activitySlug={activitySlug} />
      </main>
    );
  } catch (error) {
    // Handle network errors or other issues
    notFound();
  }
};

export default DestinationPage;
