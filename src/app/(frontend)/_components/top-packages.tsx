import PackageCard from '@/components/packages/package-card';
import H2 from '@/components/typography/h2';
import PrimaryText from '@/components/typography/primary';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import Link from 'next/link';
import React from 'react';

const TopPackages = async () => {
  const data = await fetchData(ENDPOINTS.PACKAGES);
  console.log(data);
  return (
    <section className='mx-auto max-w-[1180px] mt-32 max-lg:mt-16'>
      <div className='text-center max-w-2xl mx-auto'>
        <PrimaryText className='mb-4'>POPULAR PACKAGES</PrimaryText>
        <H2 className='mb-8'>Vacations To Make Your Experience Enjoyable</H2>
      </div>
      <div className='grid max-lg:px-4 grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data?.map(
          (item: any, index: number) =>
            index <= 2 && (
              <Link
                key={item.id}
                href={`/${item.destination.activity.slug}/${item.destination.slug}/${item.slug}`}>
                <PackageCard
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
              </Link>
            )
        )}
      </div>
    </section>
  );
};

export default TopPackages;
