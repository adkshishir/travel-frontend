'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TravelPackageCardProps {
  title: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  popular?: boolean;
}

export default function PackageCard({
  title = 'Colombian Coffee Trails',
  location = 'Istanbul, Turkey',
  image = '/placeholder.svg?height=300&width=500',
  price = 150,
  rating = 4,
  reviews = 4035,
  popular = true,
}: TravelPackageCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className='max-w-sm max-lg:max-w-md  rounded-xl overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-md'>
      <div className='relative'>
        {/* Image */}
        <div className='relative h-56 w-full'>
          <Image
            src={image || '/placeholder.svg'}
            alt={title}
            fill
            className='object-cover'
          />
        </div>

        {/* Popular badge */}
        {popular && (
          <div className='absolute top-3 left-3 bg-orange-500 text-white text-xs font-medium px-2.5 py-1 rounded'>
            Trekking
          </div>
        )}

        {/* Favorite button */}
        <button
          className='absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-sm transition-transform duration-200 active:scale-90'
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={
            isFavorite ? 'Remove from favorites' : 'Add to favorites'
          }>
          <Heart
            size={18}
            className={cn(
              'transition-colors duration-300',
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
            )}
          />
        </button>
      </div>

      <div className='p-4'>
        {/* Location */}
        <div className='flex items-center text-gray-500 mb-1'>
          <MapPin size={14} className='mr-1' />
          <span className='text-sm'>{location}</span>
        </div>

        {/* Title */}
        <h3 className='font-bold text-lg text-gray-900 mb-2'>{title}</h3>

        {/* Rating */}
        <div className='flex items-center mb-4'>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={cn(
                i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              )}
            />
          ))}
          <span className='text-sm text-gray-500 ml-1'>
            ({reviews.toLocaleString()})
          </span>
        </div>

        {/* Price and CTA */}
        <div className='flex items-center justify-between'>
          <div>
            <span className='font-bold text-xl'>${price}</span>
            <span className='text-gray-500 text-sm'>/Person</span>
          </div>
          <button className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors duration-300 active:scale-95 transform'>
            Book Trip
          </button>
        </div>
      </div>
    </div>
  );
}
