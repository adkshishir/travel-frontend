import H1 from '@/components/typography/h1';
import P from '@/components/typography/P';
import PrimaryText from '@/components/typography/primary';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const AboutSection = () => {
  return (
    <section className='max-w-[1180px] max-lg:px-4 mt-32 max-lg:mt-16 mx-auto flex max-lg:flex-col gap-8 justify-between items-center'>
      <div className='w-full'>
        <Image
          src={'/images/hero.jpg'}
          alt='about'
          priority={false}
          quality={100}
          width={1000}
          height={1000}
          className='rounded-2xl'
        />
      </div>
      <div className='w-full'>
        <div className='max-lg:justify-center max-lg:text-center'>
          <PrimaryText>About</PrimaryText>
          <H1>We Are The Best Travel Agency</H1>
        </div>
        <div className='flex max-lg:flex-col mt-8 gap-4 items-center'>
          <Button variant={'ghost'} size={'icon'} className='w-20'>
            <Image
              src={'/images/btn-text-about.jpg'}
              height={300}
              width={300}
              alt='More About Us'
              className='max-lg:p-2'
            />
          </Button>
          <div className=''>
            <P>
              Venenatis donec sit sit egestas varius. Dictum sit risus
              scelerisque nulla amet vel mollis sem morbi. Egestas quam
              scelerisque morbi nisi lacinia nunc. <br /> <br />
              Venenatis donec sit sit egestas varius. Dictum sit risus
              scelerisque nulla amet vel mollis sem morbi. Egestas quam
              scelerisque morbi nisi lacinia nunc.
            </P>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
