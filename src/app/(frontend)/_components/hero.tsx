'use client';

import PrimaryText from '@/components/typography/primary';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { VideoModal } from '@/components/video-modal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './hero.css';

interface HeroSectionProps {
  carousels: any[];
  siteInfo: any;
}

const HeroSection = ({ carousels, siteInfo }: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !carousels?.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carousels.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, carousels?.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + carousels.length) % carousels.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carousels.length);
  };

  // If no carousels, show default content
  if (!carousels || carousels.length === 0) {
    carousels = [{
      media: { original: '/images/hero.jpg', alt: 'hero' },
      title: 'Start Travelling with us',
      subtitle: "Let's enjoy your desired trip with Tourice"
    }];
  }

  const currentCarousel = carousels[currentSlide];

  return (
    <section 
      className='relative h-screen w-full overflow-hidden'
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Images with Smooth Transitions */}
      <div className='absolute inset-0 z-0'>
        {carousels.map((carousel, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              priority={index === 0}
              quality={100}
              src={carousel?.media?.original || '/images/hero.jpg'}
              alt={carousel?.media?.alt || `hero-${index}`}
              width={1920}
              height={1080}
              className='w-full h-full object-cover transition-transform duration-[20s] ease-out hover:scale-105'
            />
          </div>
        ))}
      </div>
      
      {/* Dark Overlay for better text contrast */}
      <div className='absolute inset-0 z-10 bg-black/40'></div>
      
      {/* Animated Gradient Overlay */}
      <div className='absolute inset-0 z-20 bg-gradient-to-br from-black/30 via-transparent to-blue-900/20'></div>
      
      {/* Floating Elements */}
      <div className='absolute inset-0 z-30'>
        <div className='absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce [animation-delay:0s] [animation-duration:3s]'></div>
        <div className='absolute top-3/4 right-1/4 w-24 h-24 bg-primary/20 rounded-full blur-lg animate-bounce [animation-delay:1s] [animation-duration:4s]'></div>
        <div className='absolute top-1/2 left-3/4 w-20 h-20 bg-white/15 rounded-full blur-lg animate-bounce [animation-delay:2s] [animation-duration:5s]'></div>
      </div>

      {/* Navigation Arrows */}
      {carousels.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className='absolute left-6 top-1/2 -translate-y-1/2 z-50 bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 group'
            aria-label="Previous slide"
          >
            <ChevronLeft className='w-6 h-6 group-hover:scale-110 transition-transform duration-200' />
          </button>
          <button
            onClick={goToNext}
            className='absolute right-6 top-1/2 -translate-y-1/2 z-50 bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 group'
            aria-label="Next slide"
          >
            <ChevronRight className='w-6 h-6 group-hover:scale-110 transition-transform duration-200' />
          </button>
        </>
      )}

      {/* Main Content */}
      <div className='relative z-40 flex items-center justify-center h-full'>
        <div className='text-center px-4 max-w-5xl mx-auto'>
          {/* Animated Badge */}
          <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2 mb-8 animate-fade-in-up'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span className='text-white text-sm font-medium'>✨ Now Live - Special Offers</span>
          </div>
          
          {/* Primary Text with Gradient */}
          <div className='animate-fade-in-up [animation-delay:0.2s] [animation-fill-mode:forwards]'>
            <PrimaryText>
              <span className='bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]'>
                {currentCarousel?.title || 'Start Travelling with us'}
              </span>
            </PrimaryText>
          </div>
          
          {/* Main Heading */}
          <h1 className='text-[64px] font-bold mt-6 leading-[70px] max-lg:text-[52px] max-md:text-[40px] max-lg:leading-[50px] text-white drop-shadow-2xl animate-fade-in-up [animation-delay:0.4s] [animation-fill-mode:forwards]'>
            <span className='bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent'>
              {currentCarousel?.subtitle ||
                'Let\'s enjoy your desired trip with Tourice'}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className='text-white text-lg mt-6 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:0.6s] [animation-fill-mode:forwards] drop-shadow-lg'>
            {currentCarousel?.description || 'Discover breathtaking destinations and create unforgettable memories with our expertly crafted travel experiences.'}
          </p>
          
          {/* CTA Buttons */}
          <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [animation-delay:0.8s] [animation-fill-mode:forwards]'>
            <Link
              href={'/booking'}
              className='group relative bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-[position:100%_0] hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 transform active:scale-95'>
              <span className='relative z-10'>Book Your Adventure</span>
              <div className='absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </Link>
            
            <VideoModal
              videoContent={siteInfo?.embedVideo}
              triggerText="Watch Video"
              triggerClassName="group bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/30 hover:scale-105 transform active:scale-95"
            />
          </div>
          
          {/* Stats */}
          <div className='mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in-up [animation-delay:1s] [animation-fill-mode:forwards]'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-white drop-shadow-lg'>500+</div>
              <div className='text-white/80 text-sm'>Destinations</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-white drop-shadow-lg'>50K+</div>
              <div className='text-white/80 text-sm'>Happy Travelers</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-white drop-shadow-lg'>4.9★</div>
              <div className='text-white/80 text-sm'>Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Dots Indicator */}
      {carousels.length > 1 && (
        <div className='absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3'>
          {carousels.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide
                  ? 'bg-white shadow-lg shadow-white/50'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Scroll Indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-40'>
        <div className='w-6 h-10 border-2 border-white/70 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-white/90 rounded-full mt-2 animate-pulse'></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
