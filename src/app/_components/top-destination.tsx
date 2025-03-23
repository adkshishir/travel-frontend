import DestinationCard from '@/components/destinations/destination-card';
import H1 from '@/components/typography/h1';
import P from '@/components/typography/P';
import PrimaryText from '@/components/typography/primary';
import React from 'react';

const TopDestination = () => {
  return (
    <section className='mx-auto max-w-[1180px] mt-32'>
      <div className='text-center max-w-2xl grid  mx-auto'>
        <PrimaryText className='mb-4'>Top Destination</PrimaryText>
        <H1 className='mb-8'>Search a best place in the world</H1>
        <P>
          Our dating website offers a range of features and benifits that make
          finding love online simple and enjoyable. With our advanced matching
          algorithm
        </P>
      </div>
      <div className='mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-between '>
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
        />
      </div>
    </section>
  );
};

export default TopDestination;
