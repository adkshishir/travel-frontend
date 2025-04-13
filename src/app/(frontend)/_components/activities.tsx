import ActivitiesCard from '@/components/activities/activity-card';
import H1 from '@/components/typography/h1';
import PrimaryText from '@/components/typography/primary';
import React from 'react';

const Activities = () => {
  return (
    <section className=' mx-auto max-w-[1180px] max-lg:px-4 mt-16'>
      <PrimaryText className='mx-auto w-fit'>Activities</PrimaryText>
      <H1 className='mx-auto w-fit '>We Offer The Best Service</H1>
      <div className='lg:flex grid grid-cols-2 max-lg:justify-center  justify-between gap-4 mt-8 '>
        <ActivitiesCard
          title='title'
          description='descirpiotnasd asdf asdf asdf as df'
          image=''
        />{' '}
        <ActivitiesCard
          title='title'
          description='descirpiotnasd asdf asdf asdf as dfnnnnnnn'
          image=''
        />{' '}
        <ActivitiesCard
          title='title'
          description='descirpiotnasd asdf asdf asdf as df'
          image=''
        />
        <ActivitiesCard
          title='title'
          description='descirpiotnasd asdf asdf asdf as df'
          image=''
        />
      </div>
    </section>
  );
};

export default Activities;
