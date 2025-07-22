import Banner from '@/components/banner';
import React from 'react';
import Packages from './_components/packages';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { destinationSlug } = await params;
  const result = await fetchData(ENDPOINTS.DESTINATIONS + '/' + destinationSlug);
  const seo = result?.seo || {};
  const title = seo.metaTitle || result?.name || 'Destination';
  const description = seo.metaDescription || result?.description || 'Explore this destination.';
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

const DestinationPage = async ({ params }: { params: Promise<Params> }) => {
  const { activitySlug, destinationSlug } = await params;
  const result = await fetchData(ENDPOINTS.DESTINATIONS + '/' + destinationSlug);
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
};

export default DestinationPage;
