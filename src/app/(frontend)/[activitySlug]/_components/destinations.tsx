'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ParamValue } from 'next/dist/server/request/params';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

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
  activityName,
}: {
  destinations: Destination[];
  activitySlug: ParamValue;
  activityName: string;
}) {
  if (!destinations?.length) {
    return (
      <section className='max-w-[1180px] max-lg:px-4 mx-auto my-16 text-center text-gray-500 py-16'>
        <MapPin size={40} className='mx-auto mb-4 text-gray-300' />
        <p className='text-lg'>No destinations found for this activity.</p>
      </section>
    );
  }

  return (
    <section className='max-w-[1180px] max-lg:px-4 mx-auto my-12'>
      <div className='mb-8'>
        <p className='text-primary font-medium text-sm uppercase tracking-wide mb-1'>{activityName}</p>
        <h2 className='text-3xl font-bold text-[#012E41]'>Choose Your Destination</h2>
        <p className='text-gray-500 mt-2 text-sm'>Select a destination to explore available packages</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {destinations?.map((destination, index) => (
          <Link
            href={`/${activitySlug}/${destination.slug}`}
            key={destination.id || index}
            className='group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300'>
            <div className='relative h-60 w-full'>
              <Image
                src={destination.media?.thumbnail || '/images/hero.jpg'}
                alt={destination.media?.alt || destination?.name}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />

              <div className='absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white rounded-full px-3 py-1 text-xs font-medium border border-white/30'>
                {activityName}
              </div>
            </div>

            <div className='absolute bottom-0 left-0 right-0 p-5 text-white'>
              <h3 className='text-xl font-bold drop-shadow'>{destination.name}</h3>
              {destination.feature && (
                <p className='text-sm text-white/75 mt-1 flex items-center gap-1'>
                  <MapPin size={12} /> {destination.feature}
                </p>
              )}
              <span className='mt-3 inline-flex items-center gap-1 text-sm font-semibold text-orange-300 group-hover:gap-2 transition-all duration-300'>
                Explore Packages <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
