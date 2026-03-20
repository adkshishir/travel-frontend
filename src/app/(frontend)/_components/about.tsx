import H2 from '@/components/typography/h2';
import PrimaryText from '@/components/typography/primary';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import React from 'react';

const stats = [
  { value: '500+', label: 'Treks Completed' },
  { value: '10K+', label: 'Happy Travelers' },
  { value: '15+', label: 'Years Experience' },
  { value: '4.9', label: 'Average Rating' },
];

const highlights = [
  'Certified & experienced local guides',
  'Customized itineraries for all fitness levels',
  'Safety-first approach with 24/7 support',
  'Sustainable & responsible trekking practices',
];

const AboutSection = () => {
  return (
    <section className='max-w-[1180px] max-lg:px-4 mt-24 max-lg:mt-16 mx-auto flex max-lg:flex-col gap-12 justify-between items-center'>
      {/* Image */}
      <div className='w-full relative'>
        <Image
          src={'/images/hero.jpg'}
          alt='Trekking in Nepal'
          priority={false}
          quality={80}
          width={600}
          height={500}
          className='rounded-2xl w-full object-cover h-[420px]'
        />
        {/* Floating stat badge */}
        <div className='absolute -bottom-5 -right-4 max-lg:right-4 bg-primary text-white rounded-2xl px-6 py-4 shadow-xl'>
          <p className='text-3xl font-bold'>15+</p>
          <p className='text-sm font-medium opacity-90'>Years of Excellence</p>
        </div>
      </div>

      {/* Content */}
      <div className='w-full'>
        <PrimaryText className='max-lg:text-center'>About Us</PrimaryText>
        <H2 className='mt-2 max-lg:text-center'>
          Your Trusted Partner for Himalayan Adventures
        </H2>
        <p className='text-gray-600 mt-4 leading-relaxed max-lg:text-center'>
          Based in the heart of Nepal, Poonhill Treks has been crafting
          unforgettable mountain experiences since 2009. We connect you with
          the raw beauty of the Himalayas — from the iconic Poon Hill sunrise
          to the serene trails of the Annapurna Circuit — with guides who know
          every stone on the path.
        </p>

        {/* Highlights */}
        <ul className='mt-6 space-y-3'>
          {highlights.map((item) => (
            <li key={item} className='flex items-start gap-3 text-gray-700'>
              <CheckCircle size={18} className='text-primary mt-0.5 shrink-0' />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Stats */}
        <div className='mt-8 grid grid-cols-4 max-sm:grid-cols-2 gap-4'>
          {stats.map(({ value, label }) => (
            <div key={label} className='text-center max-lg:text-left'>
              <p className='text-3xl font-bold text-primary'>{value}</p>
              <p className='text-sm text-gray-500 mt-1'>{label}</p>
            </div>
          ))}
        </div>

        <Link
          href='/about'
          className='mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-300'>
          Learn More About Us
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;
