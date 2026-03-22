import PackageCard from '@/components/packages/package-card';
import H2 from '@/components/typography/h2';
import PrimaryText from '@/components/typography/primary';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import Link from 'next/link';
import React from 'react';

const TopPackages = async () => {
  const dataRes = await fetchData(ENDPOINTS.PACKAGES);
  const data = dataRes?.items || [];
  return (
    <section className='mx-auto max-w-[1180px] max-lg:px-4 mt-24 max-lg:mt-16'>
      <div className='flex items-end justify-between gap-4 mb-8'>
        <div className='max-w-xl'>
          <PrimaryText className='mb-2'>Popular Packages</PrimaryText>
          <H2>Hand-Picked Treks for Every Adventurer</H2>
        </div>
        <Link
          href='/#activities'
          className='shrink-0 text-sm font-semibold text-primary hover:underline hidden sm:block'>
          View All →
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
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
