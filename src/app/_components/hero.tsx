import PrimaryText from '@/components/typography/primary';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className='relative h-[85vh]'>
      <Image
        priority={true}
        quality={100}
        src={'/images/hero-bg.jpg'}
        alt='hero'
        width={1920}
        height={1080}
        className='w-screen -z-10 absolute min-h-screen object-cover '
      />
      <div className='flex justify-between gap-2  h-fit container max-w-[1180px] mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/5'>
        <div className='w-full mt-8'>
          <PrimaryText>Start Travelling with us</PrimaryText>
          <h1 className='text-[56px] font-semibold mt-4 leading-[62px] text-[#012E41]'>
            Let’s enjoy your desired trip with Tourice
          </h1>
          <div className='mt-4'>
            {/* <SearchBar /> */}
            <Button variant={'secondary'} className=''>
              Book Now
            </Button>
          </div>
        </div>
        <div className='w-full'>
          <Image
            priority={true}
            quality={100}
            src={'/images/hero.jpg'}
            alt='hero'
            width={1000}
            height={1000}
            className='w-full object-cover rounded-2xl'
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
