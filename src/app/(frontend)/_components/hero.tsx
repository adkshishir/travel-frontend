import PrimaryText from '@/components/typography/primary';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import Link from 'next/link';
import { VideoModal } from '@/components/video-modal';
import './hero.css';

const HeroSection = async () => {
  const carousels = await fetchData(ENDPOINTS.CAROUSELS + '/home');
  const siteInfo = await fetchData(ENDPOINTS.SITE_INFO);
  
  return (
    <section className='relative h-screen w-full overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <Image
          priority={true}
          quality={100}
          src={carousels?.[0]?.media?.original || '/images/hero.jpg'}
          alt={carousels?.[0]?.media?.alt || 'hero'}
          width={1920}
          height={1080}
          className='w-full h-full object-cover transition-transform duration-[20s] ease-out hover:scale-105'
        />
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

      {/* Main Content */}
      <div className='relative z-40 flex items-center justify-center h-full'>
        <div className='text-center px-4 max-w-5xl mx-auto'>
          {/* Animated Badge */}
          <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2 mb-8 animate-fade-in-up'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span className='text-white text-sm font-medium'>✨ Now Live - Special Offers</span>
          </div>
          
          {/* Primary Text with Gradient */}
          <div className='animate-fade-in-up [animation-delay:0.2s]  [animation-fill-mode:forwards]'>
            <PrimaryText>
              <span className='bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]'>
                {carousels?.[0]?.title || 'Start Travelling with us'}
              </span>
            </PrimaryText>
          </div>
          
          {/* Main Heading */}
          <h1 className='text-[64px] font-bold mt-6 leading-[70px] max-lg:text-[52px] max-md:text-[40px] max-lg:leading-[50px] text-white drop-shadow-2xl animate-fade-in-up [animation-delay:0.4s]  [animation-fill-mode:forwards]'>
            <span className='bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent'>
              {carousels?.[0]?.subtitle ||
                'Let\'s enjoy your desired trip with Tourice'}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className='text-white text-lg mt-6 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:0.6s] [animation-fill-mode:forwards] drop-shadow-lg'>
            Discover breathtaking destinations and create unforgettable memories with our expertly crafted travel experiences.
          </p>
          
          {/* CTA Buttons */}
          <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [animation-delay:0.8s] [animation-fill-mode:forwards]'>
            <Link
              href={'/booking'}
              className='group relative bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-[position:100%_0] hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 transform active:scale-95'>
              <span className='relative z-10'>Book Your Adventure</span>
              <div className='absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </Link>
            
            <VideoModal
              videoContent={siteInfo?.embedVideo}
              triggerText="Watch Video"
              triggerClassName="group bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/30 hover:scale-105 transform active:scale-95"
            />
          </div>
          
          {/* Stats */}
          <div className='mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in-up [animation-delay:1s]  [animation-fill-mode:forwards]'>
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
