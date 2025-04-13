import TravelAccordion from '@/components/travel/accordion';
import H1 from '@/components/typography/h1';
import PrimaryText from '@/components/typography/primary';
import React from 'react';

const Faq = () => {
  return (
    <section className='bg-[#F6F6F6] max-lg:mt-16 max-lg:py-16 py-32'>
      <div className=' max-w-[1180px] max-lg:px-4 mx-auto '>
        <div className='text-center max-w-2xl grid   mx-auto'>
          <PrimaryText className='mb-4'>FAQ</PrimaryText>
          <H1 className='mb-8'>Unpacking Your Travel Questions</H1>
        </div>
        <TravelAccordion />
      </div>
    </section>
  );
};

export default Faq;
