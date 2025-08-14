'use client';
import {
  Clock,
  MapPin,
  Users,
  Mountain,
  Calendar,
  Play,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Download,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import TravelAccordion from '@/components/travel/accordion';
import { extractDataFromHTML } from './extract-data';
import Image from 'next/image';
import React, { useState, useCallback, useEffect } from 'react';

export function PackageDetails({ pack }: { pack: any | undefined }) {
  // const { itinerary, includes } = pack;
  const itinerary = pack?.itinerary || '';
  const includes = pack?.includes || '';
  const extractData = extractDataFromHTML(itinerary);
  const extractIncludes = extractDataFromHTML(includes);

  // Gallery state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Get all available images
  const galleryImages = pack?.media || [];
  const hasGallery = galleryImages && galleryImages.length > 0;

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = useCallback(() => {
    setIsGalleryOpen(false);
    setIsZoomed(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  const toggleZoom = useCallback(() => {
    setIsZoomed(!isZoomed);
  }, [isZoomed]);

  const downloadImage = () => {
    const currentImage = galleryImages[currentImageIndex];
    if (currentImage?.original) {
      const link = document.createElement('a');
      link.href = currentImage.original;
      link.download = `${pack?.title || 'image'}-${currentImageIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGalleryOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeGallery();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextImage();
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          toggleZoom();
          break;
      }
    };

    if (isGalleryOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isGalleryOpen, nextImage, prevImage, toggleZoom, closeGallery]);

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
                  <Users className='h-5 w-5 text-primary' />
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

   

      {/* Itinerary Section */}
      {itinerary && extractData?.sections?.length > 0 && (
        <div id='itinerary' className='space-y-6'>
          <h2 className='text-2xl font-semibold'>{extractData?.title}</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {extractData?.sections?.map((data, index) => (
              <AccordionItem 
                key={index} 
                value={`itinerary-${index}`}
                className="rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 text-left">
                  <h3 className='font-semibold text-lg'>{data?.subtitle}</h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <ul className='space-y-2 text-sm text-muted-foreground'>
                    {data?.items?.map((item, itemIndex) => (
                      <li key={itemIndex} className='flex items-start gap-2'>
                        <div className='w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                        <span className='leading-relaxed'>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
         {/* Image Gallery Section */}
      {hasGallery && (
        <div className='space-y-6' id='gallery'>
          <h2 className='text-2xl font-semibold'>Photo Gallery</h2>
          
          {/* Main Image Display */}
          <div className='relative group'>
            <div className='aspect-[16/10] rounded-xl overflow-hidden bg-gray-100'>
              <Image
                src={galleryImages[0]?.original || '/images/hero.jpg'}
                alt={galleryImages[0]?.alt || 'Gallery image'}
                width={1200}
                height={750}
                className='w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105'
                onClick={() => openGallery(0)}
              />
            </div>
            <button
              onClick={() => openGallery(0)}
              className='absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100'
            >
              <div className='bg-white/90 backdrop-blur-sm rounded-full p-3 transform transition-transform duration-200 hover:scale-110'>
                <ZoomIn className='w-6 h-6 text-gray-800' />
              </div>
            </button>
          </div>

          {/* Thumbnail Grid */}
          {galleryImages.length > 1 && (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
              {galleryImages.slice(1, 9).map((image: any, index: number) => (
                <div
                  key={index + 1}
                  className='aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer group relative'
                  onClick={() => openGallery(index + 1)}
                >
                  <Image
                    src={image?.thumbnail || image?.original || '/images/hero.jpg'}
                    alt={image?.alt || `Gallery image ${index + 2}`}
                    width={200}
                    height={200}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center'>
                    <ZoomIn className='w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  </div>
                  {/* Show count on last image if there are more */}
                  {index === 7 && galleryImages.length > 9 && (
                    <div className='absolute inset-0 bg-black/60 flex items-center justify-center'>
                      <span className='text-white font-semibold text-lg'>
                        +{galleryImages.length - 9}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* View All Button */}
          {galleryImages.length > 1 && (
            <div className='text-center'>
              <button
                onClick={() => openGallery(0)}
                className='inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium'
              >
                View All {galleryImages.length} Photos
              </button>
            </div>
          )}
        </div>
      )}

      {/* Full-Screen Gallery Modal */}
      {isGalleryOpen && (
        <div className='fixed inset-0 z-[100] bg-black/95 flex items-center justify-center'>
          {/* Header */}
          <div className='absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-6'>
            <div className='flex items-center justify-between text-white'>
              <div className='flex items-center gap-4'>
                <h3 className='text-lg font-medium'>{pack?.title}</h3>
                <span className='text-sm opacity-75'>
                  {currentImageIndex + 1} of {galleryImages.length}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={toggleZoom}
                  className='p-2 hover:bg-white/20 rounded-full transition-colors duration-200'
                  title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                >
                  <ZoomIn className='w-5 h-5' />
                </button>
                <button
                  onClick={downloadImage}
                  className='p-2 hover:bg-white/20 rounded-full transition-colors duration-200'
                  title='Download Image'
                >
                  <Download className='w-5 h-5' />
                </button>
                <button
                  onClick={closeGallery}
                  className='p-2 hover:bg-white/20 rounded-full transition-colors duration-200'
                  title='Close Gallery'
                >
                  <X className='w-6 h-6' />
                </button>
              </div>
            </div>
          </div>

          {/* Main Image */}
          <div className={`relative max-w-7xl max-h-[80vh] mx-auto transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-move' : 'cursor-zoom-in'}`}>
            <Image
              src={galleryImages[currentImageIndex]?.original || '/images/hero.jpg'}
              alt={galleryImages[currentImageIndex]?.alt || 'Gallery image'}
              width={1200}
              height={800}
              className='max-w-full max-h-[80vh] object-contain'
              onClick={toggleZoom}
            />
          </div>

          {/* Navigation Arrows */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className='absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200 text-white'
                title='Previous Image'
              >
                <ChevronLeft className='w-6 h-6' />
              </button>
              <button
                onClick={nextImage}
                className='absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200 text-white'
                title='Next Image'
              >
                <ChevronRight className='w-6 h-6' />
              </button>
            </>
          )}

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div className='absolute bottom-6 left-1/2 -translate-x-1/2 max-w-4xl w-full px-6'>
              <div className='flex items-center justify-center gap-2 overflow-x-auto pb-2'>
                {galleryImages.map((image: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'border-white scale-110' 
                        : 'border-transparent hover:border-white/50'
                    }`}
                  >
                    <Image
                      src={image?.thumbnail || image?.original || '/images/hero.jpg'}
                      alt={image?.alt || `Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className='w-full h-full object-cover'
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Keyboard Navigation Hint */}
          <div className='absolute bottom-20 left-6 text-white/70 text-sm'>
            <p>Use ← → arrow keys to navigate • Press Esc to close • Space/Enter to zoom</p>
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
