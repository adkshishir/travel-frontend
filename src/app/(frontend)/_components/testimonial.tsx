import { TestimonialCarousel } from '@/components/testimonial/testimonial-carousel';
import H2 from '@/components/typography/h2';
import PrimaryText from '@/components/typography/primary';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import React from 'react';

const Testimonial = async () => {
  const testimonials = await fetchData(ENDPOINTS.REVIEWS);
  return (
    <section className='bg-[#F6F6F6] mt-32 max-lg:mt-16 max-lg:px-4'>
      <div className='max-w-[1180px] mx-auto py-32 max-lg:py-16 flex max-lg:flex-col gap-8'>
        {/* <div>
          <Image
            src={'/images/hero.jpg'}
            alt='about'
            width={500}
            height={1000}
            priority={false}
            className='rounded-[50%] max-lg:mx-auto object-cover h-[400px] w-[350px]'
          />
        </div> */}
        <div className=''>
          <div className='max-lg:text-center '>
            <PrimaryText className='text-center'>Testimonial</PrimaryText>
            <H2 className=' max-w-xl mx-auto text-center'>
              What Customer Said About Us
            </H2>
          </div>
          <div className='flex max-lg:flex-col gap-8 mt-8'>
            <TestimonialCarousel
              testimonials={testimonials?.map((item: any) => ({
                name: item.name,
                quote: item.description,
                rating: item.rating,
                avatarUrl: item.media?.thumbnail,
                role: item.role,
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
