import Banner from '@/components/banner';
import React from 'react';
import Packages from './_components/packages';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

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
