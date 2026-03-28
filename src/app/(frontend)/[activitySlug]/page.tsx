export const revalidate = 3600;

import Banner from '@/components/banner';
import React from 'react';
import Destinations from './_components/destinations';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { activitySlug } = await params;

  try {
    const result = await fetchData(ENDPOINTS.ACTIVITIES + '/' + activitySlug);

    if (!result) {
      return { title: 'Activity Not Found', description: 'The requested activity could not be found.' };
    }

    const seo = result?.seo || {};
    const title = seo.metaTitle || result?.name || 'Activity';
    const description = seo.metaDescription || result?.description || 'Explore this amazing activity.';
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
    return { title: 'Activity Not Found', description: 'The requested activity could not be found.' };
  }
}

const ActivitiesPage = async ({ params }: { params: Promise<Params> }) => {
  const { activitySlug } = await params;

  try {
    const result = await fetchData(ENDPOINTS.ACTIVITIES + '/' + activitySlug);

    if (!result) notFound();

    return (
      <main>
        <Banner
          title={result?.name || 'Activities'}
          image={result?.media?.phone || '/images/hero.jpg'}
          breadcrumb={[{ name: 'Home', href: '/' }]}
          pageName={result?.name || 'Activities'}
        />

        {/* Activity intro */}
        {result?.description && (
          <div className='max-w-3xl mx-auto text-center py-12 px-4'>
            <p className='text-gray-600 text-lg leading-relaxed'>{result.description}</p>
          </div>
        )}

        <Destinations
          activityName={result?.name}
          activitySlug={activitySlug}
          destinations={result?.destinations}
        />
      </main>
    );
  } catch {
    notFound();
  }
};

export default ActivitiesPage;
