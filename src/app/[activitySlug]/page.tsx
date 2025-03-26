import Banner from '@/components/banner';
import React from 'react';
import Destinations from './_components/destinations';

const ActivitiesPage = () => {
  return (
    <main>
      <Banner
        title='Activities'
        image='/images/hero.jpg'
        breadcrumb={[{ name: 'Home', href: '/' }]}
        pageName='Activities'
      />
      <Destinations />
    </main>
  );
};

export default ActivitiesPage;
