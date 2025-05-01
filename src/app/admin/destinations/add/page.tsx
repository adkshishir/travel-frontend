import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import React from 'react';
import DestinationForm from '../_components/destination-form';

const FormPage = async () => {
  const activities = await fetchData(ENDPOINTS.ACTIVITIES);
  return (
    <div>
      <DestinationForm
        activities={activities?.map((activity: any) => ({
          value: activity.id,
          label: activity.name,
        }))}
      />
    </div>
  );
};

export default FormPage;
