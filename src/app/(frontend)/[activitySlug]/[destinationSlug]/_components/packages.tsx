import PackageCard from '@/components/packages/package-card';
import { ParamValue } from 'next/dist/server/request/params';
import Link from 'next/link';
import React from 'react';
export type Package = {
  id: number;
  title: string;
  description: string;
  duration: string;
  slug: string;
  price: string;
  groupSize: string;
  rating: number;
  destination: { name: string; slug: string };
  media: { thumbnail: string; alt: string }[];
  createdAt: string;
};

const Packages = ({
  packages=[],
  activitySlug,
}: {
  packages: Package[];
  activitySlug: ParamValue;
}) => {
  return (
    <div className='grid max-lg:px-4  max-w-[1180px] mx-auto my-16 max-lg:justify-center grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {packages.map((pack) => (
        <Link
          href={`/${activitySlug}/${pack.destination.slug}/${pack.slug}`}
          key={pack.id}>
          <PackageCard
            key={pack.id}
            title={pack.title}
            location={pack.destination.name}
            image={
              (pack?.media?.length > 0 && pack.media[0]?.thumbnail) ||
              '/images/hero.jpg'
            }
            price={Number(pack.price || 0)}
            rating={pack.rating}
            reviews={100}
            popular
          />
        </Link>
      ))}
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
      />
      <PackageCard
        title='Colombian Coffee Trails'
        location='Another Region'
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
      />{' '}
      <PackageCard
        title='Colombian Coffee Trails'
        location='Another Region'
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
  );
};

export default Packages;
