import Banner from '@/components/banner';
import React from 'react';
import Packages from './_components/packages';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

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
      return (
        <main>
          <Banner
            title="Destination Not Found"
            image="/images/hero.jpg"
            breadcrumb={[
              { name: 'Home', href: '/' },
              { name: 'Activities', href: '/' },
            ]}
            pageName="Destination Not Found"
          />
          <div className='max-w-4xl mx-auto my-16 px-4'>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold mb-4'>Destination Not Found</h2>
              <p className='text-gray-600 mb-6'>
                Sorry, we couldn't find the destination you're looking for. It may have been moved or deleted.
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

    // Validate URL structure matches backend data (soft 404)
    if (result.activity?.slug !== activitySlug) {
      return (
        <main>
          <Banner
            title="Invalid Destination URL"
            image="/images/hero.jpg"
            breadcrumb={[
              { name: 'Home', href: '/' },
              { name: 'Activities', href: '/' },
            ]}
            pageName="Invalid URL"
          />
          <div className='max-w-4xl mx-auto my-16 px-4'>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold mb-4'>Invalid Destination URL</h2>
              <p className='text-gray-600 mb-6'>
                The URL structure doesn't match the destination's activity. Please check the correct URL.
              </p>
              <div className='space-y-2 mb-6'>
                <p className='text-sm text-gray-500'>
                  Correct URL should be: /{result.activity?.slug}/{result.slug}
                </p>
              </div>
              <div className='flex gap-4 justify-center'>
                <a 
                  href={`/${result.activity?.slug}/${result.slug}`}
                  className='bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors'
                >
                  Go to Correct URL
                </a>
                <a 
                  href="/" 
                  className='bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors'
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main>
        <Banner
          title={result?.name || 'Destinations'}
          image={result?.media?.phone || '/images/hero.jpg'}
          breadcrumb={[
            { name: 'Home', href: '/' },
            { name: result?.activity?.name, href: `/${activitySlug}` },
          ]}
          pageName={result?.name || 'Destinations'}
        />
        <Packages activitySlug={activitySlug} packages={result?.packages} />
      </main>
    );
  } catch (error) {
    // Handle network errors or other issues
    return (
      <main>
        <Banner
          title="Error Loading Destination"
          image="/images/hero.jpg"
          breadcrumb={[
            { name: 'Home', href: '/' },
            { name: 'Activities', href: '/' },
          ]}
          pageName="Error"
        />
        <div className='max-w-4xl mx-auto my-16 px-4'>
          <div className='text-center'>
            <h2 className='text-2xl font-semibold mb-4'>Error Loading Destination</h2>
            <p className='text-gray-600 mb-6'>
              There was an error loading the destination. Please try again later.
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

export default DestinationPage;
