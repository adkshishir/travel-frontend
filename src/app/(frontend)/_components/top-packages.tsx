import PackageCard from '@/components/packages/package-card';
import H1 from '@/components/typography/h1';
import PrimaryText from '@/components/typography/primary';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import React from 'react';

const TopPackages = async () => {
  const data = await fetchData(ENDPOINTS.PACKAGES);
  return (
    <section className='mx-auto max-w-[1180px] mt-32 max-lg:mt-16'>
      <div className='text-center max-w-2xl mx-auto'>
        <PrimaryText className='mb-4'>POPULAR PACKAGES</PrimaryText>
        <H1 className='mb-8'>Vacations To Make Your Experience Enjoyable</H1>
      </div>
      <div className='grid max-lg:px-4 grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data?.map(
          (item: any, index: number) =>
            index <= 2 && (
              <PackageCard
                key={item.id}
                title={item.title}
                location={item.location}
                image={
                  item.media?.length > 0
                    ? item.media[0].thumbnail
                    : '/images/hero.jpg'
                }
                price={item.price}
                rating={item.rating}
                reviews={item.reviews}
                popular
              />
            )
        )}
        {/* <PackageCard
          title='Colombian Coffee Trails'
          location='Regions'
          image='/images/hero.jpg'
          price={150}
          rating={4}
          reviews={4035}
          popular
        />
        <PackageCard
          title='Colombian Coffee Trails'
          location='Istanbul, Turkey'
          image='/images/hero.jpg'
          price={150}
          rating={4}
          reviews={4035}
          popular
        />{' '}
        <PackageCard
          title='Colombian Coffee Trails'
          location='Another Region'
          image='/images/hero.jpg'
          price={150}
          rating={4}
          reviews={4035}
          popular
        /> */}
      </div>
    </section>
  );
};

export default TopPackages;
