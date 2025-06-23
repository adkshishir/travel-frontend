import Image from 'next/image';
import PrimaryText from '@/components/typography/primary';
import H1 from '@/components/typography/h1';
import { cn } from '@/lib/utils';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import Dest from '../[activitySlug]/_components/destinations';
import Link from 'next/link';

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
  const fetchedDestinations = await fetchData(ENDPOINTS.DESTINATIONS);
  const destinations: Destination[] | undefined = fetchedDestinations
    ?.filter((destination: any, index: number) => index < 4)
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
    <section className=' mx-auto max-w-[1180px] pb-32 max-lg:px-4 '>
      <div className='text-center max-lg:text-center max-w-2xl grid mt-32 max-lg:mt-16  mx-auto'>
        <PrimaryText className='mb-4'>Popular Destinations</PrimaryText>
        <H1 className='mb-8'>Search a best place in the world</H1>
      </div>
      <div className='grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-3  lg:grid-rows-2 gap-4'>
        {destinations?.map((destination, index) => (
          <Link
            href={`/${destination.activity.slug}/${destination.slug}`}
            key={destination.id}
            className={cn(
              'relative overflow-hidden h-56 rounded-lg w-full max-lg:mx-auto',
              index == 0 && '  lg:row-span-1',
              index == 1 && 'col-span-1 lg:row-span-2 lg:col-start-2 h-full '
            )}>
            <div className='relative h-full w-full'>
              <Image
                src={destination.image || '/placeholder.svg'}
                alt={destination.alt || destination?.name}
                fill
                className='object-cover transition-transform duration-300 hover:scale-105'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
              <div className='absolute inset-0 h-1/4 top-3/4 bg-gradient-to-t from-black/70 via-black/20 to-transparent'></div>

              <div className='absolute top-3 left-3 bg-slate-900/80 text-white rounded-full px-2 py-1 text-sm font-medium'>
                {destination.activity.name}
              </div>

              <div className='absolute bottom-0 left-0 p-4 text-white'>
                <h3 className='text-xl md:text-2xl font-bold mb-1'>
                  {destination.name}
                </h3>
                <p className='text-sm opacity-90'>{destination.feature}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
