'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ParamValue } from 'next/dist/server/request/params';
import Link from 'next/link';

interface Destination {
  id: string;
  name: string;
  rating: number;
  feature: string;
  size: 'medium' | 'large';
  activity: { name: string; slug: string };
  slug: string;
  media: { thumbnail: string; alt: string };
}

export default function Destinations({
  destinations,
  activitySlug,
  activityName
}: {
  destinations: Destination[];
    activitySlug: ParamValue;
  activityName: string;
}) {
  console.log(destinations);
  // const [destinations] = useState<Destination[]>([
  //   {
  //     id: '1',
  //     name: 'Finland',
  //     rating: 5.0,
  //     feature: 'Waterfall',
  //     image: '/images/hero.jpg',
  //     size: 'medium',
  //   },
  //   {
  //     id: '2',
  //     name: 'Ankara',
  //     rating: 5.0,
  //     feature: 'Waterfall',
  //     image: '/images/hero.jpg',
  //     size: 'large',
  //   },
  //   {
  //     id: '3',
  //     name: 'Istanbul',
  //     rating: 5.0,
  //     feature: 'Waterfall',
  //     image: '/images/hero.jpg',
  //     size: 'large',
  //   },
  //   {
  //     id: '4',
  //     name: 'Prag',
  //     rating: 5.0,
  //     feature: 'Waterfall',
  //     image: '/images/hero.jpg',
  //     size: 'medium',
  //   },
  //   {
  //     id: '5',
  //     name: 'Florence',
  //     rating: 5.0,
  //     feature: 'Waterfall',
  //     image: '/images/hero.jpg',
  //     size: 'medium',
  //   },
  //   {
  //     id: '5',
  //     name: 'Florence',
  //     rating: 5.0,
  //     feature: 'Waterfall',
  //     image: '/images/hero.jpg',
  //     size: 'medium',
  //   },
  //   {
  //     id: '5',
  //     name: 'Florence',
  //     rating: 5.0,
  //     feature: 'Waterfall',
  //     image: '/images/hero.jpg',
  //     size: 'medium',
  //   },
  //   {
  //     id: '5',
  //     name: 'Florence',
  //     rating: 5.0,
  //     feature: 'Waterfall',
  //     image: '/images/hero.jpg',
  //     size: 'medium',
  //   },
  //   {
  //     id: '5',
  //     name: 'Florence',
  //     rating: 5.0,
  //     feature: 'Waterfall',
  //     image: '/images/hero.jpg',
  //     size: 'medium',
  //   },
  //   {
  //     id: '5',
  //     name: 'Florence',
  //     rating: 5.0,
  //     feature: 'Waterfall',
  //     image: '/images/hero.jpg',
  //     size: 'medium',
  //   },
  //   {
  //     id: '5',
  //     name: 'Florence',
  //     rating: 5.0,
  //     feature: 'Waterfall',
  //     image: '/images/hero.jpg',
  //     size: 'medium',
  //   },
  // ]);

  return (
    <section className=' mx-auto max-w-[1180px] max-lg:px-4 '>
      <div className='grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-3 my-16  lg:grid-rows-2 gap-4'>
        {destinations?.map((destination, index) => (
          <Link
            href={`/${activitySlug}/${destination.slug}`}
            key={index}
            className={cn(
              'relative overflow-hidden h-56 rounded-lg w-full max-lg:mx-auto',
              index == 0 && '  lg:row-span-1',
              index == 1 && 'col-span-1 lg:row-span-2 lg:col-start-2 h-full '
            )}>
            <div className='relative h-full w-full'>
              <Image
                src={destination.media?.thumbnail || '/placeholder.svg'}
                alt={destination.media?.alt || destination?.name}
                fill
                className='object-cover transition-transform duration-300 hover:scale-105'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent'></div>

              <div className='absolute top-3 left-3 bg-slate-900/80 text-white rounded-full px-2 py-1 text-sm font-medium'>
                {activityName}
              </div>

              <div className='absolute bottom-0 left-0 p-4 text-white'>
                <h3 className='text-xl md:text-2xl font-bold mb-1'>
                  {destination.name}
                </h3>
                <p className='text-sm opacity-90'>{activityName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
