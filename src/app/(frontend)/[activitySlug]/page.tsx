import Banner from '@/components/banner';
import React from 'react';
import Destinations from './_components/destinations';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { activitySlug } = await params;
  
  try {
    const result = await fetchData(ENDPOINTS.ACTIVITIES + '/' + activitySlug);
    
    if (!result) {
      return {
        title: 'Activity Not Found',
        description: 'The requested activity could not be found.',
      };
    }

    const seo = result?.seo || {};
    const title = seo.metaTitle || result?.name || 'Activity';
    const description = seo.metaDescription || result?.description || 'Explore this amazing activity.';
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
      title: 'Activity Not Found',
      description: 'The requested activity could not be found.',
    };
  }
}

const ActivitiesPage = async ({ params }: { params: Promise<Params> }) => {
  const { activitySlug } = await params;
  
  try {
    const result = await fetchData(ENDPOINTS.ACTIVITIES + '/' + activitySlug);


    // Handle case where activity is not found
    if (!result) {
      return (
        <main>
          <Banner
            title="Activity Not Found"
            image="/images/hero.jpg"
            breadcrumb={[{ name: 'Home', href: '/' }]}
            pageName="Activity Not Found"
          />
          <div className='max-w-4xl mx-auto my-16 px-4'>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold mb-4'>Activity Not Found</h2>
              <p className='text-gray-600 mb-6'>
                Sorry, we couldn't find the activity you're looking for. It may have been moved or deleted.
              </p>
              <a 
                href="/" 
                className='bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors'
              >
                Back to Home
              </a>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main>
        <Banner
          title={result?.name || 'Activities'}
          image={result?.media?.phone || '/images/hero.jpg'}
          breadcrumb={[{ name: 'Home', href: '/' }]}
          pageName={result?.name || 'Activities'}
        />
        <Destinations
          activityName={result?.name}
          activitySlug={activitySlug}
          destinations={result?.destinations}
        />
      </main>
    );
  } catch (error) {
    // Handle network errors or other issues
    return (
      <main>
        <Banner
          title="Error Loading Activity"
          image="/images/hero.jpg"
          breadcrumb={[{ name: 'Home', href: '/' }]}
          pageName="Error"
        />
        <div className='max-w-4xl mx-auto my-16 px-4'>
          <div className='text-center'>
            <h2 className='text-2xl font-semibold mb-4'>Error Loading Activity</h2>
            <p className='text-gray-600 mb-6'>
              There was an error loading the activity. Please try again later.
            </p>
            <a 
              href="/" 
              className='bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors'
            >
              Back to Home
            </a>
          </div>
        </div>
      </main>
    );
  }
};

export default ActivitiesPage;
