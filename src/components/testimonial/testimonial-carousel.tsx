'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import { Button } from '@/components/ui/button';
import TestimonialCard from './testimonial-card';

export type Testimonial = {
  name: string;
  quote: string;
  rating: number;
  avatarUrl: string;
  role: string;
};

export function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[]|undefined;
}) {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <div className='relative max-w-full mx-auto'>
      <Carousel setApi={setApi} className='w-full'>
        <CarouselContent className='lg:-ml-4'>
          {testimonials?.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className='lg:pl-4 md:basis-1/2 lg:basis-1/3'>
              <TestimonialCard {...testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className='flex justify-center gap-2 mt-6'>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full'
            onClick={() => api?.scrollPrev()}>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full'
            onClick={() => api?.scrollNext()}>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </Carousel>
    </div>
  );
}
