'use client';
import {
  Clock,
  MapPin,
  Users,
  Mountain,
  Calendar,
  Play,
  Info,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import TravelAccordion from '@/components/travel/accordion';
import { extractDataFromHTML } from './extract-data';
import Image from 'next/image';

export function PackageDetails({ pack }: { pack: any | undefined }) {
  // const { itinerary, includes } = pack;
  const itinerary = pack?.itinerary || '';
  const includes = pack?.includes || '';
  const extractData = extractDataFromHTML(itinerary);
  const extractIncludes = extractDataFromHTML(includes);

  return (
    <div className='space-y-12 pb-8'>
      {/* Subtitle Section */}
      {pack?.subtitle && (
        <div className='space-y-4'>
          <h2 className='text-lg font-medium text-muted-foreground'>
            {pack.subtitle}
          </h2>
        </div>
      )}

      {/* Trip Information Badges */}
      <div className='space-y-4'>
        <div className='flex flex-wrap gap-2'>
          {pack?.duration && (
            <Badge variant='outline' className='flex items-center gap-1'>
              <Clock className='h-3 w-3' />
              {pack.duration}
            </Badge>
          )}
          {pack?.groupSize && (
            <Badge variant='outline' className='flex items-center gap-1'>
              <Users className='h-3 w-3' />
              Max {pack.groupSize} People
            </Badge>
          )}
          {pack?.altitude && (
            <Badge variant='outline' className='flex items-center gap-1'>
              <Mountain className='h-3 w-3' />
              {pack.altitude}
            </Badge>
          )}
          {pack?.bestSeason && (
            <Badge variant='outline' className='flex items-center gap-1'>
              <Calendar className='h-3 w-3' />
              {pack.bestSeason}
            </Badge>
          )}
          <Badge variant='outline' className='flex items-center gap-1'>
            <MapPin className='h-3 w-3' />
            Multiple Destinations
          </Badge>
        </div>
      </div>

      {/* Trip Details Section */}
      {(pack?.startFrom || pack?.endAt || pack?.groupAge) && (
        <div className='space-y-6'>
          <h2 className='text-2xl font-semibold'>Trip Details</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {pack?.startFrom && (
              <div className='p-4 bg-gray-50 rounded-lg border'>
                <h3 className='font-medium text-sm text-gray-600 mb-1'>Start From</h3>
                <p className='text-sm font-medium'>{pack.startFrom}</p>
              </div>
            )}
            {pack?.endAt && (
              <div className='p-4 bg-gray-50 rounded-lg border'>
                <h3 className='font-medium text-sm text-gray-600 mb-1'>End At</h3>
                <p className='text-sm font-medium'>{pack.endAt}</p>
              </div>
            )}
            {pack?.groupAge && (
              <div className='p-4 bg-gray-50 rounded-lg border'>
                <h3 className='font-medium text-sm text-gray-600 mb-1'>Age Group</h3>
                <p className='text-sm font-medium'>{pack.groupAge}</p>
              </div>
            )}
          </div>
        </div>
      )}

    

      {/* Overview Section */}
      {pack?.overview && (
        <div className='space-y-4' id='overview'>
          <h2 className='text-2xl font-semibold'>Overview</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: pack.overview,
            }}
            className='prose prose-gray max-w-none'></div>
        </div>
      )}

      {/* Video Section */}
      {pack?.videoLink && (
        <div className='space-y-4'>
          <h2 className='text-2xl font-semibold flex items-center gap-2'>
            <Play className='h-5 w-5' />
            Video Preview
          </h2>
          <div className='aspect-video rounded-lg overflow-hidden border shadow-sm'>
            {pack.videoLink.includes('youtube.com') || pack.videoLink.includes('youtu.be') ? (
              <iframe
                src={pack.videoLink.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                className='w-full h-full'
                allowFullScreen
                title='Package Video'
              />
            ) : pack.videoLink.includes('vimeo.com') ? (
              <iframe
                src={pack.videoLink.replace('vimeo.com/', 'player.vimeo.com/video/')}
                className='w-full h-full'
                allowFullScreen
                title='Package Video'
              />
            ) : (
              <video
                src={pack.videoLink}
                controls
                className='w-full h-full object-cover'
              />
            )}
          </div>
        </div>
      )}

      {/* Highlights Section */}
      {pack?.highlights && (
        <div id='highlights' className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Package Highlights</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: pack.highlights,
            }}
            className='prose prose-gray max-w-none'></div>
        </div>
      )}

      {/* Cultural Information */}
      {(pack?.culture || pack?.attractions || pack?.nature || pack?.activity) && (
        <div className='space-y-6' id='experience'>
          <h2 className='text-2xl font-semibold'>Experience & Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {pack?.culture && (
              <div className='space-y-3 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border'>
                <h3 className='font-semibold text-lg flex items-center gap-2'>
                  <Info className='h-5 w-5 text-blue-600' />
                  Culture
                </h3>
                <div className='text-sm text-gray-700 whitespace-pre-line leading-relaxed'>
                  {pack.culture}
                </div>
              </div>
            )}
            {pack?.attractions && (
              <div className='space-y-3 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border'>
                <h3 className='font-semibold text-lg flex items-center gap-2'>
                  <MapPin className='h-5 w-5 text-green-600' />
                  Attractions
                </h3>
                <div className='text-sm text-gray-700 whitespace-pre-line leading-relaxed'>
                  {pack.attractions}
                </div>
              </div>
            )}
            {pack?.nature && (
              <div className='space-y-3 p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg border'>
                <h3 className='font-semibold text-lg flex items-center gap-2'>
                  <Mountain className='h-5 w-5 text-teal-600' />
                  Nature
                </h3>
                <div className='text-sm text-gray-700 whitespace-pre-line leading-relaxed'>
                  {pack.nature}
                </div>
              </div>
            )}
            {pack?.activity && (
              <div className='space-y-3 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border'>
                <h3 className='font-semibold text-lg flex items-center gap-2'>
                  <Users className='h-5 w-5 text-orange-600' />
                  Activities
                </h3>
                <div className='text-sm text-gray-700 whitespace-pre-line leading-relaxed'>
                  {pack.activity}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Accommodation Section */}
      {pack?.accommodation && (
        <div className='space-y-4' id='accommodation'>
          <h2 className='text-2xl font-semibold'>Accommodation</h2>
          <div className='text-muted-foreground whitespace-pre-line leading-relaxed p-6 bg-gray-50 rounded-lg border'>
            {pack.accommodation}
          </div>
        </div>
      )}

      {/* Itinerary Section */}
      {itinerary && extractData?.sections?.length > 0 && (
        <div id='itinerary' className='space-y-6'>
          <h2 className='text-2xl font-semibold'>{extractData?.title}</h2>
          <div className='space-y-4'>
            {extractData?.sections?.map((data, index) => (
              <div key={index} className='rounded-lg border p-6 bg-white shadow-sm hover:shadow-md transition-shadow'>
                <h3 className='font-semibold text-lg mb-3'>{data?.subtitle}</h3>
                <ul className='space-y-2 text-sm text-muted-foreground'>
                  {data?.items?.map((item, itemIndex) => (
                    <li key={itemIndex} className='flex items-start gap-2'>
                      <div className='w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                      <span className='leading-relaxed'>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inclusions Section */}
      {includes && extractIncludes?.sections?.length > 0 && (
        <div id='inclusions' className='space-y-6'>
          <h2 className='text-2xl font-semibold'>{extractIncludes?.title}</h2>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {extractIncludes?.sections?.map(
              (data, index) =>
                index < 2 && (
                  <div key={index} className='p-6 bg-white border rounded-lg shadow-sm'>
                    <h3 className='font-semibold text-lg mb-4'>{data?.subtitle}</h3>
                    <ul className='space-y-3 text-sm'>
                      {data?.items?.map((item, itemIndex) => (
                        <li key={itemIndex} className='flex items-start gap-3'>
                          {index === 0 ? (
                            <div className='flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5'>
                              <svg
                                className='w-3 h-3 text-green-600'
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
                            </div>
                          ) : (
                            <div className='flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mt-0.5'>
                              <svg
                                className='w-3 h-3 text-red-600'
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
                            </div>
                          )}
                          <span className='text-gray-700 leading-relaxed'>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {/* Good to Know Section */}
      {pack?.goodtoknow && (
        <div id='good-to-know' className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Good to Know</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: pack.goodtoknow,
            }}
            className='prose prose-gray max-w-none'></div>
        </div>
      )}

      {/* Map Section */}
      {pack?.map?.original && (
        <div id='map' className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Map</h2>
          <div className='rounded-lg overflow-hidden border shadow-sm'>
            <Image
              alt='map'
              width={1000}
              height={1000}
              className='w-full h-auto object-cover'
              src={pack.map.original}
            />
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {pack?.faqs && pack.faqs.length > 0 && (
        <div id='faq' className='space-y-4'>
          <h2 className='text-2xl font-semibold'>
            Frequently Asked Questions
          </h2>
          <div className='bg-white border rounded-lg shadow-sm'>
            <TravelAccordion data={pack.faqs} />
          </div>
        </div>
      )}
    </div>
  );
}
