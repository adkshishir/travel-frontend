import DestinationCard from '@/components/destinations/destination-card';
import H2 from '@/components/typography/h2';
import P from '@/components/typography/P';
import PrimaryText from '@/components/typography/primary';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import Link from 'next/link';
import React from 'react';

const TopDestination = async () => {
  const destinations = await fetchData(ENDPOINTS.DESTINATIONS);

  return (
    <section className='mx-auto max-w-[1180px] max-lg:px-4 mt-24 max-lg:mt-16'>
      <div className='flex items-end justify-between gap-4 mb-8'>
        <div className='max-w-xl'>
          <PrimaryText className='mb-2'>Top Destinations</PrimaryText>
          <H2>Explore Nepal&apos;s Most Loved Trails</H2>
        </div>
        <Link
          href='/#popular-destinations'
          className='shrink-0 text-sm font-semibold text-primary hover:underline hidden sm:block'>
          View All →
        </Link>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {destinations?.map(
          (destination: {
            id: number;
            name: string;
            slug: string;
            description: string;
            activity: { slug: string };
            media: { thumbnail: string; alt: string };
          }) => (
            <DestinationCard
              activitySlug={destination?.activity?.slug}
              key={destination?.id}
              slug={destination?.slug}
              name={destination?.name}
              description={destination?.description}
              imageUrl={destination?.media?.thumbnail}
              alt={destination?.media?.alt}
            />
          )
        )}
      </div>
    </section>
  );
};

export default TopDestination;
