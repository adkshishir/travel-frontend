import Banner from '@/components/banner';
import React from 'react';
import Packages from './_components/packages';

const DestinationPage = () => {
  return (
    <main>
      <Banner
        title='Destinations'
        image='/images/hero.jpg'
        breadcrumb={[{ name: 'Home', href: '/' }]}
        pageName='Destinations'
      />
      <Packages />
    </main>
  );
};

export default DestinationPage;
