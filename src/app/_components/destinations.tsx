'use client';

import { useState } from 'react';
import Image from 'next/image';
import PrimaryText from '@/components/typography/primary';
import H1 from '@/components/typography/h1';
import { cn } from '@/lib/utils';

interface Destination {
  id: string;
  name: string;
  rating: number;
  feature: string;
  image: string;
  size: 'medium' | 'large';
}

export default function Destinations() {
  const [destinations] = useState<Destination[]>([
    {
      id: '1',
      name: 'Finland',
      rating: 5.0,
      feature: 'Waterfall',
      image: '/images/hero.jpg',
      size: 'medium',
    },
    {
      id: '2',
      name: 'Ankara',
      rating: 5.0,
      feature: 'Waterfall',
      image: '/images/hero.jpg',
      size: 'large',
    },
    {
      id: '3',
      name: 'Istanbul',
      rating: 5.0,
      feature: 'Waterfall',
      image: '/images/hero.jpg',
      size: 'large',
    },
    {
      id: '4',
      name: 'Prag',
      rating: 5.0,
      feature: 'Waterfall',
      image: '/images/hero.jpg',
      size: 'medium',
    },
    {
      id: '5',
      name: 'Florence',
      rating: 5.0,
      feature: 'Waterfall',
      image: '/images/hero.jpg',
      size: 'medium',
    },
  ]);

  return (
    <section className=' mx-auto max-w-[1296px] '>
      <div className='text-center max-w-2xl grid mt-32  mx-auto'>
        <PrimaryText className='mb-4'>Popular Destinations</PrimaryText>
        <H1 className='mb-8'>Search a best place in the world</H1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4'>
        {destinations.map((destination, index) => (
          <div
            key={destination.id}
            className={cn(
              'relative overflow-hidden rounded-lg',
              index == 0 && ' h-56 lg:row-span-1',
              index == 1 && 'col-span-1 lg:row-span-2 col-start-2 h-full '
            )}>
            <div className='relative h-full w-full'>
              <Image
                src={destination.image || '/placeholder.svg'}
                alt={destination.name}
                fill
                className='object-cover transition-transform duration-300 hover:scale-105'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent'></div>

              <div className='absolute top-3 left-3 bg-slate-900/80 text-white rounded-full px-2 py-1 text-sm font-medium'>
                {destination.rating}
              </div>

              <div className='absolute bottom-0 left-0 p-4 text-white'>
                <h3 className='text-xl md:text-2xl font-bold mb-1'>
                  {destination.name}
                </h3>
                <p className='text-sm opacity-90'>{destination.feature}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
