import Banner from '@/components/banner';
import React from 'react';
import Destinations from './_components/destinations';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

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
