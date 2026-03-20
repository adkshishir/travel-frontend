import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface DestinationCardProps {
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
  alt: string;
  activitySlug: string;
}

export default function DestinationCard({
  name = 'Qatar',
  slug = 'qatar',
  description = 'Explore this destination',
  alt = 'Destination',
  activitySlug = 'trekking',
  imageUrl = '/images/hero.jpg',
}: DestinationCardProps) {
  return (
    <Link
      href={`/${activitySlug}/${slug}`}
      className='group relative overflow-hidden rounded-xl h-52 w-full block border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300'>
      <Image
        src={imageUrl || '/images/hero.jpg'}
        alt={alt || name}
        fill
        className='object-cover transition-transform duration-500 group-hover:scale-105'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent' />
      <div className='absolute bottom-0 left-0 p-4 text-white'>
        <h3 className='font-bold text-lg drop-shadow'>{name}</h3>
        <p className='text-xs text-white/75 mt-0.5 flex items-center gap-1'>
          <MapPin size={11} /> {description}
        </p>
      </div>
    </Link>
  );
}
