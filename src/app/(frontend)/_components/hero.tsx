import PrimaryText from '@/components/typography/primary';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import Link from 'next/link';

const HeroSection = async () => {
  const carousels = await fetchData(ENDPOINTS.CAROUSELS + '/home');
  console.log(carousels);
  return (
    <section className='relative h-[60vh]  lg:h-[85vh]'>
      <Image
        priority={true}
        quality={100}
        src={'/images/hero-bg.jpg'}
        alt={carousels?.[0]?.media?.alt || 'hero'}
        width={1920}
        height={1080}
        className='w-screen -z-10  absolute min-h-screen object-cover '
      />
      <div className='flex max-lg:flex-col-reverse max-lg:px-4  justify-between gap-2  h-fit container max-w-[1180px] mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/5'>
        <div className='w-full mt-8 max-lg:text-center max-lg:justify-center'>
          <PrimaryText>
            {carousels?.[0]?.title || 'Start Travelling with us'}
          </PrimaryText>
          <h1 className='text-[56px] font-semibold mt-4 leading-[62px] max-lg:text-[48px] max-md:text-[36px] max-lg:leading-[42px] text-[#012E41]'>
            {carousels?.[0]?.subtitle ||
              'Let’s enjoy your desired trip with Tourice'}
          </h1>
          <div className='mt-4'>
            {/* <SearchBar /> */}
            <Link
              href={'/booking'}
              className='bg-primary text-white w-fit px-4 rounded-sm py-2'>
              Book Now
            </Link>
          </div>
        </div>
        <div className='w-full'>
          <Image
            priority={true}
            quality={100}
            src={carousels?.[0]?.media?.phone || '/images/hero.jpg'}
            alt='hero'
            width={1000}
            height={500}
            className='w-full object-cover max-lg:hidden max-h-[400px] rounded-2xl'
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
