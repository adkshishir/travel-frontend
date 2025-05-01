import DestinationCard from '@/components/destinations/destination-card';
import H1 from '@/components/typography/h1';
import P from '@/components/typography/P';
import PrimaryText from '@/components/typography/primary';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import React from 'react';

const TopDestination = async() => {
  const destinations = await fetchData(ENDPOINTS.DESTINATIONS );

  return (
    <section className='mx-auto max-w-[1180px] max-lg:px-4 mt-32 max-lg:mt-16'>
      <div className='text-center  max-w-2xl grid  mx-auto'>
      
          <PrimaryText className='mb-4'>Top Destination</PrimaryText>
          <H1 className='mb-8'>Search a best place in the world</H1>
        
        <P>
          Our dating website offers a range of features and benifits that make
          finding love online simple and enjoyable. With our advanced matching
          algorithm
        </P>
      </div>
      <div className='mt-8 grid grid-cols-2 max-lg:justify-center lg:grid-cols-4 gap-4 lg:gap-8 justify-between '>
        {
          destinations?.map(
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
          )
        }
        {/* <DestinationCard
          name='Bali'
          description='Top Destination'
          imageUrl='/images/hero.jpg'
        />
        <DestinationCard
          name='Bali'
          description='Top Destination'
          imageUrl='/images/hero.jpg'
        />
        <DestinationCard
          name='Bali'
          description='Top Destination'
          imageUrl='/images/hero.jpg'
        />
        <DestinationCard
          name='Bali'
          description='Top Destination'
          imageUrl='/images/hero.jpg'
        />
        <DestinationCard
          name='Bali'
          description='Top Destination'
          imageUrl='/images/hero.jpg'
        />
        <DestinationCard
          name='Bali'
          description='Top Destination'
          imageUrl='/images/hero.jpg'
        />
        <DestinationCard
          name='Bali'
          description='Top Destination'
          imageUrl='/images/hero.jpg'
        />
        <DestinationCard
          name='Bali'
          description='Top Destination'
          imageUrl='/images/hero.jpg'
        />
        <DestinationCard
          name='Bali'
          description='Top Destination'
          imageUrl='/images/hero.jpg'
        />
        <DestinationCard
          name='Bali'
          description='Top Destination'
          imageUrl='/images/hero.jpg'
        />
        <DestinationCard
          name='Bali'
          description='Top Destination'
          imageUrl='/images/hero.jpg'
        />{' '}
        <DestinationCard
          name='Bali'
          description='Top Destination'
          imageUrl='/images/hero.jpg'
        /> */}
      </div>
    </section>
  );
};

export default TopDestination;
