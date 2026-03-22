import TravelAccordion from '@/components/travel/accordion';
import H2 from '@/components/typography/h2';
import PrimaryText from '@/components/typography/primary';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import React from 'react';

const Faq = async () => {
  const resultRes = await fetchData(ENDPOINTS.FAQ);
  const result = resultRes?.items || [];
  return (
    <section id='faq' className='bg-[#f0ece3] max-lg:mt-16 max-lg:py-14 py-20'>
      <div className='max-w-[1180px] max-lg:px-4 mx-auto'>
        <div className='text-center max-w-2xl mx-auto mb-10'>
          <PrimaryText className='mb-2'>FAQ</PrimaryText>
          <H2>Everything You Need to Know</H2>
          <p className='text-gray-500 mt-3 text-sm'>
            Have more questions? <a href='/contact' className='text-primary font-medium hover:underline'>Contact us</a> — we&apos;re happy to help.
          </p>
        </div>
        <TravelAccordion data={result} />
      </div>
    </section>
  );
};

export default Faq;
