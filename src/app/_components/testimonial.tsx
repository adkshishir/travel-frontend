import TestimonialCard from '@/components/testimonial/testimonial-card';
import H1 from '@/components/typography/h1';
import PrimaryText from '@/components/typography/primary';
import Image from 'next/image';
import React from 'react';

const Testimonial = () => {
  return (
    <section className='bg-[#F6F6F6] mt-32'>
      <div className='max-w-[1296px] mx-auto py-32 flex gap-8'>
        <div>
          <Image
            src={'/images/hero.jpg'}
            alt='about'
            width={500}
            height={1000}
            priority={false}
            className='rounded-[50%] object-cover h-[400px] w-[350px]'
          />
        </div>
        <div className=''>
          <PrimaryText className=''>Testimonial</PrimaryText>
          <H1 className=' max-w-xl'>What Customer Said About Us</H1>
          <div className='flex gap-8 mt-8'>
            <TestimonialCard
              name='John Snow'
              quote="As a seasoned traveler, I can confidently say that Tourica is one of the best travel agencies I've had the pleasure of working."
              rating={5}
              avatarUrl='/images/hero.jpg'
              role='Customer'
            />
            <TestimonialCard
              name='John Snow'
              quote="As a seasoned traveler, I can confidently say that Tourica is one of the best travel agencies I've had the pleasure of working."
              rating={5}
              avatarUrl='/images/hero.jpg'
              role='Customer'
            />{' '}
            <TestimonialCard
              name='John Snow'
              quote="As a seasoned traveler, I can confidently say that Tourica is one of the best travel agencies I've had the pleasure of working."
              rating={5}
              avatarUrl='/images/hero.jpg'
              role='Customer'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
