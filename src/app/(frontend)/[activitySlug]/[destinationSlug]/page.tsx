import Banner from '@/components/banner';
import React from 'react';
import Packages from './_components/packages';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { activitySlug, destinationSlug } = await params;

  try {
    const result = await fetchData(ENDPOINTS.DESTINATIONS + '/' + destinationSlug);

    if (!result || result.activity?.slug !== activitySlug) {
      return { title: 'Destination Not Found', description: 'The requested destination could not be found.' };
    }

    const seo = result?.seo || {};
    const title = seo.metaTitle || result?.name || 'Destination';
    const description = seo.metaDescription || result?.description || 'Explore this amazing destination.';
    const keywords = seo.metaKeywords || '';
    const canonical = seo.metaCanonical || '';
    const image = result?.media?.phone || result?.media?.thumbnail || '/images/hero.jpg';

    return {
      title,
      description,
      keywords,
      alternates: canonical ? { canonical } : undefined,
      openGraph: { title, description, url: canonical, type: 'website', images: [image], siteName: 'Poonhill Treks' },
      twitter: { card: 'summary_large_image', title, description, images: [image] },
      robots: { index: true, follow: true },
      ...(seo.schema && { other: { 'application/ld+json': seo.schema } }),
    };
  } catch {
    return { title: 'Destination Not Found', description: 'The requested destination could not be found.' };
  }
}

const DestinationPage = async ({ params }: { params: Promise<Params> }) => {
  const { activitySlug, destinationSlug } = await params;

  try {
    const result = await fetchData(ENDPOINTS.DESTINATIONS + '/' + destinationSlug);

    if (!result) notFound();

    const activity = result?.activity;
    if (activity && activity.slug !== activitySlug) notFound();

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

        {/* Overview */}
        {result?.overview && (
          <div className='max-w-5xl mx-auto py-14 px-4'>
            <div className='flex items-center gap-2 mb-4'>
              <MapPin size={18} className='text-primary' />
              <span className='text-primary font-medium text-sm uppercase tracking-wide'>
                {activity?.name}
              </span>
            </div>
            <h2 className='text-3xl font-bold text-[#012E41] mb-6'>About {result?.name}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: result.overview }}
              className='prose prose-lg max-w-none text-gray-700 prose-headings:text-[#012E41] prose-a:text-primary'
            />
          </div>
        )}

        {/* Packages */}
        <div className='bg-gray-50 py-4'>
          <div className='max-w-[1180px] mx-auto px-4 pt-8 pb-4'>
            <p className='text-primary font-medium text-sm uppercase tracking-wide mb-1'>{result?.name}</p>
            <h2 className='text-3xl font-bold text-[#012E41]'>Available Packages</h2>
            <p className='text-gray-500 mt-1 text-sm'>Choose a package that fits your adventure level</p>
          </div>
          <Packages packages={result?.packages} activitySlug={activitySlug} />
        </div>
      </main>
    );
  } catch {
    notFound();
  }
};

export default DestinationPage;
