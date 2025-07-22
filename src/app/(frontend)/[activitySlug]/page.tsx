import Banner from '@/components/banner';
import React from 'react';
import Destinations from './_components/destinations';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { activitySlug } = await params;
  const result = await fetchData(ENDPOINTS.ACTIVITIES + '/' + activitySlug);
  const seo = result?.seo || {};
  const title = seo.metaTitle || result?.name || 'Activity';
  const description = seo.metaDescription || result?.description || 'Explore this activity.';
  const keywords = seo.metaKeywords || '';
  const canonical = seo.metaCanonical || '';
  const image = result?.media?.phone || '/images/hero.jpg';
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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    ...(seo.schema && { other: { 'application/ld+json': seo.schema } }),
  };
}

const ActivitiesPage = async ({ params }: { params: Promise<Params> }) => {
  const { activitySlug } = await params;
  const result = await fetchData(ENDPOINTS.ACTIVITIES + '/' + activitySlug);

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
};

export default ActivitiesPage;
