import Image from 'next/image';
import PrimaryText from '@/components/typography/primary';
import H2 from '@/components/typography/h2';
import { cn } from '@/lib/utils';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  rating: number;
  feature: string;
  image: string;
  size: 'medium' | 'large';
  slug: string;
  activity: { name: string; slug: string };
  alt: string;
}

export default async function Destinations() {
  const fetchedDestinationsRes = await fetchData(ENDPOINTS.DESTINATIONS);
  const fetchedDestinations = fetchedDestinationsRes?.items || [];
  const destinations: Destination[] | undefined = fetchedDestinations
    ?.filter((_: any, index: number) => index < 4)
    .map((destination: any) => ({
      id: destination.id,
      name: destination.name,
      rating: destination.rating,
      feature: destination.feature,
      image: destination.media?.thumbnail,
      size: destination.size,
      alt: destination.media?.alt,
      activity: {
        name: destination.activity.name,
        slug: destination.activity.slug,
      },
      slug: destination.slug,
    }));

  return (
    <section id='popular-destinations' className='mx-auto max-w-[1180px] pb-24 max-lg:px-4'>
      <div className='flex items-end justify-between gap-4 mt-24 max-lg:mt-16 mb-8'>
        <div className='max-w-xl'>
          <PrimaryText className='mb-2'>Popular Destinations</PrimaryText>
          <H2>Nepal&apos;s Most Spectacular Treks</H2>
        </div>
        <Link
          href='/#activities'
          className='shrink-0 text-sm font-semibold text-primary hover:underline hidden sm:block'>
          Explore All →
        </Link>
      </div>

      <div className='grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4'>
        {destinations?.map((destination, index) => (
          <Link
            href={`/${destination.activity.slug}/${destination.slug}`}
            key={destination.id}
            className={cn(
              'group relative overflow-hidden rounded-2xl w-full',
              index === 0 && 'h-56 lg:row-span-1',
              index === 1 && 'h-56 md:h-full lg:row-span-2 lg:col-start-2',
              index >= 2 && 'h-56'
            )}>
            <Image
              src={destination.image || '/images/hero.jpg'}
              alt={destination.alt || destination?.name}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-105'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent' />

            <div className='absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white rounded-full px-3 py-1 text-xs font-medium border border-white/30'>
              {destination.activity.name}
            </div>

            <div className='absolute bottom-0 left-0 p-4 text-white'>
              <h3 className='text-xl font-bold drop-shadow'>{destination.name}</h3>
              {destination.feature && (
                <p className='text-xs text-white/75 mt-0.5 flex items-center gap-1'>
                  <MapPin size={11} /> {destination.feature}
                </p>
              )}
              <span className='mt-2 inline-flex items-center gap-1 text-xs font-semibold text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                Explore <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
