import ActivitiesCard from '@/components/activities/activity-card';
import H2 from '@/components/typography/h2';
import PrimaryText from '@/components/typography/primary';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import React from 'react';

const Activities = async () => {
  const activities = await fetchData(ENDPOINTS.ACTIVITIES);
  return (
    <section id='activities' className='mx-auto max-w-[1180px] max-lg:px-4 mt-24 max-lg:mt-16'>
      <div className='text-center mb-10'>
        <PrimaryText className='mb-2'>Activities</PrimaryText>
        <H2>Adventures Waiting for You</H2>
      </div>
      <div className='grid grid-cols-2 lg:flex gap-4'>
        {activities?.map(
          (activity: {
            id: number;
            name: string;
            slug: string;
            description: string;
            media: { thumbnail: string; alt: string };
          }) => (
            <ActivitiesCard
              key={activity?.id}
              slug={activity?.slug}
              title={activity?.name}
              description={activity?.description}
              image={activity?.media?.thumbnail}
              alt={activity?.media?.alt}
            />
          )
        )}
      </div>
    </section>
  );
};

export default Activities;
