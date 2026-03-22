import { TestimonialCarousel } from '@/components/testimonial/testimonial-carousel';
import H2 from '@/components/typography/h2';
import PrimaryText from '@/components/typography/primary';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import React from 'react';

const Testimonial = async () => {
  const testimonialsRes = await fetchData(ENDPOINTS.REVIEWS);
  const testimonialsList = testimonialsRes?.items || [];
  return (
    <section className='bg-[#f0ece3] mt-24 max-lg:mt-16'>
      <div className='max-w-[1180px] mx-auto py-20 max-lg:py-14 max-lg:px-4'>
        <div className='text-center mb-12'>
          <PrimaryText className='mb-2'>Testimonials</PrimaryText>
          <H2 className='max-w-xl mx-auto'>What Our Trekkers Say</H2>
        </div>
        <TestimonialCarousel
          testimonials={testimonialsList?.map((item: any) => ({
            name: item.name,
            quote: item.description,
            rating: item.rating,
            avatarUrl: item.media?.thumbnail,
            role: item.role,
          }))}
        />
      </div>
    </section>
  );
};

export default Testimonial;
