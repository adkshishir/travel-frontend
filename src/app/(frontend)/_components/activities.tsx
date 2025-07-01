import ActivitiesCard from '@/components/activities/activity-card';
import H1 from '@/components/typography/h1';
import PrimaryText from '@/components/typography/primary';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import React from 'react';

const Activities = async () => {
  const activities = await fetchData(ENDPOINTS.ACTIVITIES);
  return (
    <section className=' mx-auto max-w-[1180px] max-lg:px-4 mt-16'>
      <PrimaryText className='mx-auto w-fit'>Activities</PrimaryText>
      <H1 className='mx-auto w-fit '>We Offer The Best Service</H1>
      <div className='lg:flex grid grid-cols-2 max-lg:justify-center  justify-between gap-4 mt-8 '>
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
