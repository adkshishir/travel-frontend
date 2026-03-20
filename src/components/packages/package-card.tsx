'use client';

import Image from 'next/image';
import { MapPin, Star, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TravelPackageCardProps {
  title: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  popular?: boolean;
  duration?: string;
}

export default function PackageCard({
  title = 'Poon Hill Trek',
  location = 'Ghorepani, Nepal',
  image = '/images/hero.jpg',
  price = 0,
  rating = 4,
  reviews = 0,
  popular = true,
  duration,
}: TravelPackageCardProps) {
  return (
    <div className='group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300'>
      {/* Image */}
      <div className='relative h-52 w-full overflow-hidden'>
        <Image
          src={image || '/images/hero.jpg'}
          alt={title}
          fill
          className='object-cover transition-transform duration-500 group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        {popular && (
          <div className='absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full'>
            Popular
          </div>
        )}
        {duration && (
          <div className='absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1'>
            <Clock size={11} /> {duration}
          </div>
        )}
      </div>

      <div className='p-4'>
        {/* Location */}
        <div className='flex items-center text-gray-400 mb-1.5'>
          <MapPin size={13} className='mr-1 shrink-0' />
          <span className='text-xs truncate'>{location}</span>
        </div>

        {/* Title */}
        <h3 className='font-bold text-base text-gray-900 mb-3 leading-snug line-clamp-2'>{title}</h3>

        {/* Rating */}
        <div className='flex items-center gap-1 mb-4'>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              className={cn(i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200')}
            />
          ))}
          {reviews > 0 && (
            <span className='text-xs text-gray-400 ml-1'>({reviews})</span>
          )}
        </div>

        {/* Price and CTA */}
        <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
          <div>
            {price > 0 ? (
              <>
                <span className='font-bold text-xl text-gray-900'>${price}</span>
                <span className='text-gray-400 text-xs'>/person</span>
              </>
            ) : (
              <span className='text-sm text-gray-400'>Price on request</span>
            )}
          </div>
          <button className='bg-primary hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-300 active:scale-95'>
            View Trek
          </button>
        </div>
      </div>
    </div>
  );
}
