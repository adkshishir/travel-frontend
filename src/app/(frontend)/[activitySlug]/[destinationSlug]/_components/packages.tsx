import PackageCard from '@/components/packages/package-card';
import React from 'react';

const Packages = () => {
  return (
    <div className='grid max-lg:px-4  max-w-[1180px] mx-auto my-16 max-lg:justify-center grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <PackageCard
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
      />
    </div>
  );
};

export default Packages;
