import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import { Params } from 'next/dist/server/request/params';
import React from 'react';
import ActivityForm from '../../_components/activity-form';

const EditActivities = async ({ params }: { params: Promise<Params> }) => {
  const { slug } = await params;
  const result = await fetchData(ENDPOINTS.ACTIVITIES + '/' + slug);
  return (
    <div>
      <h1 className='text-2xl font-semibold mb-2'>Edit Activity</h1>
      <ActivityForm initialData={result} />
    </div>
  );
};

export default EditActivities;
