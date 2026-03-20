'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { VideoModal } from '@/components/video-modal';
import { ChevronLeft, ChevronRight, Mountain, Clock, Users, Star } from 'lucide-react';

interface HeroSectionProps {
  carousels: any[];
  siteInfo: any;
}

const stats = [
  { icon: Mountain, value: '100+', label: 'Trek Routes' },
  { icon: Users,    value: '10K+', label: 'Happy Trekkers' },
  { icon: Star,     value: '4.9',  label: 'Avg Rating' },
  { icon: Clock,    value: '15+',  label: 'Years Experience' },
];

const HeroSection = ({ carousels, siteInfo }: HeroSectionProps) => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [animKey, setAnimKey] = useState(0);

  if (!carousels?.length) {
    carousels = [{
      media: { original: '/images/hero.jpg', alt: 'Poon Hill Trek Nepal' },
      title: "Nepal's Premier Trek Company",
      subtitle: 'Discover the Himalayas with Expert Local Guides',
      description: 'From the iconic Poon Hill sunrise to the high passes of Annapurna — we bring the mountains to life.',
    }];
  }

  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(() => {
      setCurrent(p => (p + 1) % carousels.length);
      setAnimKey(k => k + 1);
    }, 6000);
    return () => clearInterval(t);
  }, [autoPlay, carousels.length]);

  const goTo = (i: number) => { setCurrent(i); setAnimKey(k => k + 1); };
  const prev = () => goTo((current - 1 + carousels.length) % carousels.length);
  const next = () => goTo((current + 1) % carousels.length);

  const slide = carousels[current];

  return (
    <section
      className='relative h-screen min-h-[600px] w-full overflow-hidden'
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}>

      {/* ── Background images ─────────────────── */}
      {carousels.map((c, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            priority={i === 0}
            quality={90}
            src={c?.media?.original || '/images/hero.jpg'}
            alt={c?.media?.alt || `Trek Nepal ${i + 1}`}
            fill
            className={`object-cover ${i === current ? 'hero-ken-burns' : ''}`}
            sizes='100vw'
          />
        </div>
      ))}

      {/* ── Overlays ──────────────────────────── */}
      {/* Primary: dark vignette from bottom + left */}
      <div className='absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-black/20' />
      {/* Left panel: deeper dark for text legibility */}
      <div className='absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/20 to-transparent' />

      {/* ── Carousel arrows ───────────────────── */}
      {carousels.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label='Previous'
            className='absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors'>
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label='Next'
            className='absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors'>
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* ── Main content ──────────────────────── */}
      <div className='relative z-20 h-full flex flex-col justify-center'>
        <div className='max-w-[1180px] mx-auto px-4 w-full pt-20 pb-32'>

          {/* Badge */}
          <div
            key={`badge-${animKey}`}
            className='hero-fade-up inline-flex items-center gap-2 mb-6'
            style={{ animationDelay: '0ms' }}>
            <span className='flex items-center gap-2 bg-primary/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide uppercase'>
              <Mountain size={13} /> Nepal&apos;s Premier Trek Company
            </span>
          </div>

          {/* Headline */}
          <h1
            key={`h1-${animKey}`}
            className='hero-fade-up text-white font-bold leading-tight max-w-3xl'
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 1.15,
              animationDelay: '100ms',
            }}>
            {slide?.subtitle || slide?.title || 'Discover the Himalayas'}
          </h1>

          {/* Subtitle */}
          <p
            key={`sub-${animKey}`}
            className='hero-fade-up mt-5 text-white/80 text-base sm:text-lg max-w-xl leading-relaxed'
            style={{ animationDelay: '200ms' }}>
            {slide?.description || 'Expert-led treks through Nepal\'s most breathtaking trails. Poon Hill, Annapurna, Everest Base Camp and beyond.'}
          </p>

          {/* CTAs */}
          <div
            key={`cta-${animKey}`}
            className='hero-fade-up mt-8 flex flex-wrap gap-3'
            style={{ animationDelay: '300ms' }}>
            <Link
              href='/booking'
              className='inline-flex items-center gap-2 bg-primary hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 text-sm'>
              Book a Trek
            </Link>
            <VideoModal
              videoContent={siteInfo?.embedVideo}
              triggerText='Watch Video'
              triggerClassName='inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 text-sm'
            />
          </div>
        </div>
      </div>

      {/* ── Bottom stats bar ─────────────────── */}
      <div className='absolute bottom-0 left-0 right-0 z-20'>
        {/* Dot indicators row */}
        {carousels.length > 1 && (
          <div className='flex justify-center gap-2 pb-5'>
            {carousels.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-7 h-2 bg-primary'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

        {/* Stats strip */}
        <div className='bg-black/50 backdrop-blur-md border-t border-white/10'>
          <div className='max-w-[1180px] mx-auto px-4'>
            <div className='grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10'>
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className='flex items-center gap-3 py-4 px-4 sm:px-6'>
                  <div className='w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0'>
                    <Icon size={16} className='text-primary' />
                  </div>
                  <div>
                    <p className='text-white font-bold text-lg leading-none'>{value}</p>
                    <p className='text-white/60 text-xs mt-0.5'>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
