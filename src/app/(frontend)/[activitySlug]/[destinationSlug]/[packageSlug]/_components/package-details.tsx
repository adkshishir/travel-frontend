'use client';
import {
  Clock,
  MapPin,
  Utensils,
  Hotel,
  Car,
  Camera,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TravelAccordion from '@/components/travel/accordion';
import { extractDataFromHTML } from './extract-data';
import Packages, { Package } from '../../_components/packages';
import Image from 'next/image';

export function PackageDetails({ pack }: { pack: any | undefined }) {
  // const { itinerary, includes } = pack;
  const itinerary = pack?.itinerary || '';
  const includes = pack?.includes || '';
  const extractData = extractDataFromHTML(itinerary);
  const extractIncludes = extractDataFromHTML(includes);

  return (
    <div className='space-y-8 '>
      {/* Overview Section */}
      <div className='space-y-4'>
        <div className='flex flex-wrap gap-2'>
          <Badge variant='outline' className='flex items-center gap-1'>
            <Clock className='h-3 w-3' />
            {pack?.duration}
            {/* 7 Days / 6 Nights */}
          </Badge>
          <Badge variant='outline' className='flex items-center gap-1'>
            <Users className='h-3 w-3' />
            Max {pack?.groupSize} People
          </Badge>
          <Badge variant='outline' className='flex items-center gap-1'>
            <MapPin className='h-3 w-3' />
            Multiple Destinations
          </Badge>
        </div>

        <h2 className='text-xl font-semibold'>Overview</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: pack?.overview || '',
          }}
          id='overview'
          className='space-y-4 text-muted-foreground'></div>
      </div>

      {/* Highlights Section */}
      <div>
        <h2 className='mb-4 text-xl font-semibold'>Package Highlights</h2>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: pack?.highlights || '',
            }}
            id='highlights'
            className='space-y-4 text-muted-foreground'></div>
        </div>
        {/* <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='rounded-lg border bg-card p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <Hotel className='h-5 w-5' />
              </div>
              <div>
                <h3 className='font-medium'>Luxury Accommodations</h3>
                <p className='text-sm text-muted-foreground'>
                  5-star beachfront resort
                </p>
              </div>
            </div>
          </div>

          <div className='rounded-lg border bg-card p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <Utensils className='h-5 w-5' />
              </div>
              <div>
                <h3 className='font-medium'>Gourmet Dining</h3>
                <p className='text-sm text-muted-foreground'>
                  Daily breakfast & 3 special dinners
                </p>
              </div>
            </div>
          </div>

          <div className='rounded-lg border bg-card p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <Camera className='h-5 w-5' />
              </div>
              <div>
                <h3 className='font-medium'>Guided Excursions</h3>
                <p className='text-sm text-muted-foreground'>
                  4 premium tours included
                </p>
              </div>
            </div>
          </div>

          <div className='rounded-lg border bg-card p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <Car className='h-5 w-5' />
              </div>
              <div>
                <h3 className='font-medium'>Private Transportation</h3>
                <p className='text-sm text-muted-foreground'>
                  Airport transfers & tour transport
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Itinerary Section */}
      <div id='itinerary'>
        <h2 className='mb-4 text-xl font-semibold'>{extractData?.title}</h2>
        <div className='space-y-4'>
          {extractData?.sections?.map((data) => (
            <div className='rounded-lg border p-4'>
              <h3 className='font-medium'>{data?.subtitle}</h3>
              <ul className='mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground'>
                {data?.items?.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <Button variant='outline' className='mt-2 w-full'>
            View Full Itinerary
          </Button>
        </div>
      </div>

      {/* Inclusions Section */}
      <div id='inclusions'>
        <h2 className='mb-4 text-xl font-semibold'>{extractIncludes?.title}</h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {extractIncludes?.sections?.map(
            (data, index) =>
              index < 2 && (
                <div>
                  <h3 className='mb-2 font-medium'>{data?.subtitle}</h3>
                  <ul className='space-y-2 text-sm text-muted-foreground'>
                    {data?.items?.map((item) => (
                      <li className='flex items-start'>
                        {index === 0 ? (
                          <svg
                            className='mr-2 h-5 w-5 text-green-500'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M5 13l4 4L19 7'
                            />
                          </svg>
                        ) : (
                          <svg
                            className='mr-2 h-5 w-5 text-red-500'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M6 18L18 6M6 6l12 12'
                            />
                          </svg>
                        )}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}

          {/* <div>
            <h3 className='mb-2 font-medium'>What's Not Included</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
                <span>International flights</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
                <span>Travel insurance</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
                <span>Meals not mentioned in the itinerary</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
                <span>Personal expenses & souvenirs</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
                <span>Optional activities not in itinerary</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
                <span>Visa fees (if applicable)</span>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
      <div id='map'>
        <h2 className='mb-4 text-lg font-semibold'>Map</h2>
        <Image
          alt='map'
          width={1000}
          height={1000}
          className='w-full h-auto rounded-lg object-cover  mb-4'
          src={pack?.map?.original || '/images/hero-bg.jpg'}
        />
      </div>

      {/* FAQ Section */}
      <div id='faq'>
        <h2 className='mb-4 text-lg font-semibold'>
          Frequently Asked Questions
        </h2>
        <TravelAccordion data={pack?.faqs || []} />
      </div>
    </div>
  );
}
