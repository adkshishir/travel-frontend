import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import { Params } from 'next/dist/server/request/params';
import React from 'react';
import DestinationForm from '../../_components/destination-form';

const DestinationEdit = async ({ params }: { params: Promise<Params> }) => {
  const { slug } = await params;
  const result = await fetchData(ENDPOINTS.DESTINATIONS + '/' + slug);
  const activities = await fetchData(ENDPOINTS.ACTIVITIES);

  return (
    <div>
      <DestinationForm
        initialData={result}
        activities={activities?.map((activity: any) => ({
          value: activity.id,
          label: activity.name,
        }))}
      />
    </div>
  );
};

export default DestinationEdit;
