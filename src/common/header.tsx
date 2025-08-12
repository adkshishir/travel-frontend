'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

export type TActivity = {
  name: string;
  slug: string;
  destinations: {
    name: string;
    slug: string;
    packages: {
      title: string;
      slug: string;
    }[];
  }[];
}[];

// Main navigation links
const navLinks = [
  // { href: '/blogs', label: 'Blogs' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeActivity, setActiveActivity] = useState<number | null>(null);
  const [mobileActiveActivity, setMobileActiveActivity] = useState<
    number | null
  >(null);
  const [mobileActiveDestination, setMobileActiveDestination] = useState<
    number | null
  >(null);
  const router = useRouter();
  const [navItems, setNavItems] = useState<TActivity>();

  // Refs for detecting clicks outside dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveActivity(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const navs = await fetchData(ENDPOINTS.NAV_ITEMS);
      setNavItems(navs);
    })();
  }, []);

  // Handle activity hover/click for desktop
  const handleActivityInteraction = (index: number) => {
    if (activeActivity === index) {
      setActiveActivity(null);
    } else {
      setActiveActivity(index);
    }
  };

  // Handle mobile activity click
  const handleMobileActivityClick = (index: number) => {
    setMobileActiveActivity(mobileActiveActivity === index ? null : index);
    setMobileActiveDestination(null);
  };

  // Handle mobile destination click
  const handleMobileDestinationClick = (index: number) => {
    setMobileActiveDestination(
      mobileActiveDestination === index ? null : index
    );
  };

  // Handle activity name click - navigate to activity page
  const handleActivityNameClick = (e: React.MouseEvent, activitySlug: string) => {
    e.stopPropagation();
    router.push(`/${activitySlug}`);
    setActiveActivity(null);
  };

  // Handle destination name click - navigate to destination page
  const handleDestinationNameClick = (e: React.MouseEvent, activitySlug: string, destinationSlug: string) => {
    e.stopPropagation();
    router.push(`/${activitySlug}/${destinationSlug}`);
    setActiveActivity(null);
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center group'>
            <span className='text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-200'>
              Poonhill
            </span>
            <span className='text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200'>
              Treks
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex items-center space-x-8'>
            {/* Activities in nav bar */}
            {navItems?.map((activity, actIndex) => (
              <div 
                key={activity.name} 
                className='relative'
                onMouseEnter={() => handleActivityInteraction(actIndex)}
                onMouseLeave={() => setActiveActivity(null)}>
                
                {/* Activity Dropdown Trigger */}
                <button
                  className='flex items-center space-x-1 text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200'
                  onClick={(e) => handleActivityNameClick(e, activity.slug)}>
                  <span>{activity.name}</span>
                  <ChevronDown className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    activeActivity === actIndex ? 'rotate-180' : ''
                  )} />
                </button>

                {/* Mega Menu Dropdown */}
                {activeActivity === actIndex && (
                  <div className='fixed -translate-x-1/2 left-1/2 transform  mt-0 w-screen max-w-6xl'>
                    <div className='bg-white shadow-xl ring-1 ring-black ring-opacity-5 rounded-lg border border-gray-200'>
                      <div className='p-8'>
                        {/* Grid Layout for Destinations */}
                        <div className='flex flex-wrap justify-around'>
                          {activity.destinations.map((destination) => (
                            <div key={destination.slug} className='space-y-4'>
                              {/* Destination Header */}
                              <h3 className='text-sm font-semibold text-primary uppercase tracking-wide border-b border-orange-100 pb-2'>
                                <button
                                  onClick={(e) => handleDestinationNameClick(e, activity.slug, destination.slug)}
                                  className='hover:text-orange-800 transition-colors duration-200'>
                                  {destination.name}
                                </button>
                              </h3>
                              
                              {/* All Packages List */}
                              <ul className='space-y-2'>
                                {destination.packages.map((pkg) => (
                                  <li key={pkg.slug}>
                                    <Link
                                      href={`/${activity.slug}/${destination.slug}/${pkg.slug
                                        .toLowerCase()
                                        .replace(/\s+/g, '-')}`}
                                      className='text-gray-600 hover:text-primary text-sm block py-1 transition-colors hover:translate-x-1 transform duration-200'
                                      onClick={() => setActiveActivity(null)}>
                                      {pkg.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        
                        {/* Call to Action at bottom */}
                        {/* <div className='mt-8 pt-6 border-t border-gray-100'>
                          <div className='flex justify-between items-center'>
                            <p className='text-sm text-primary'>
                              Ready for your next adventure? Let our experts help you plan.
                            </p>
                            <div className='flex space-x-4'>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => router.push('/contact')}>
                                Contact Us
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-primary text-white hover:bg-primary/80"
                                onClick={() => {
                                  router.push(`/${activity.slug}`);
                                  setActiveActivity(null);
                                }}>
                                Explore {activity.name}
                              </Button>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Regular nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200'>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className='flex items-center space-x-4'>
           
            <Button
              size="sm"
              className='bg-primary text-white hover:bg-primary/80 hidden lg:flex'
              onClick={() => router.push('/booking')}>
              Book Now
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className='lg:hidden'
              onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className='lg:hidden bg-white border-t border-gray-200'>
          <div className='px-4 py-6 space-y-6 max-h-96 overflow-y-auto'>
            {navItems?.map((activity, actIndex) => (
              <div key={activity.name} className='space-y-4'>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: actIndex * 0.1 }}>
                  
                  {/* Activity Header */}
                  <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-semibold text-primary/80 border-b border-orange-100 pb-2 flex-1'>
                      <button
                        onClick={() => {
                          router.push(`/${activity.slug}`);
                          setIsOpen(false);
                        }}
                        className='hover:text-orange-800 transition-colors'>
                        {activity.name}
                      </button>
                    </h3>
                    <button
                      onClick={() => handleMobileActivityClick(actIndex)}
                      className='ml-4 p-1'>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-gray-600 transition-transform duration-200',
                          mobileActiveActivity === actIndex ? 'rotate-180' : ''
                        )}
                      />
                    </button>
                  </div>

                  {/* Mobile Destinations Grid */}
                  <AnimatePresence>
                    {mobileActiveActivity === actIndex && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
                        {activity.destinations.map((destination, destIndex) => (
                          <div key={destination.slug} className='space-y-3'>
                            {/* Destination Header */}
                            <div className='flex items-center justify-between'>
                              <h4 className='text-sm font-medium text-gray-700'>
                                <button
                                  onClick={() => {
                                    router.push(`/${activity.slug}/${destination.slug}`);
                                    setIsOpen(false);
                                  }}
                                  className='hover:text-primary transition-colors'>
                                  {destination.name}
                                </button>
                              </h4>
                              <button
                                onClick={() => handleMobileDestinationClick(destIndex)}
                                className='p-1'>
                                <ChevronDown
                                  className={cn(
                                    'h-3 w-3 text-gray-500 transition-transform duration-200',
                                    mobileActiveDestination === destIndex ? 'rotate-180' : ''
                                  )}
                                />
                              </button>
                            </div>

                            {/* Mobile Packages */}
                            <AnimatePresence>
                              {mobileActiveDestination === destIndex && (
                                <motion.ul
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className='space-y-1 pl-3'>
                                  {destination.packages.map((pkg) => (
                                    <li key={pkg.slug}>
                                      <Link
                                        href={`/${activity.slug}/${destination.slug}/${pkg.slug
                                          .toLowerCase()
                                          .replace(/\s+/g, '-')}`}
                                        className='text-sm text-gray-600 hover:text-primary block py-1 transition-colors'
                                        onClick={() => setIsOpen(false)}>
                                        • {pkg.title}
                                      </Link>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            ))}
            
            {/* Regular nav links for mobile */}
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navItems?.length || 0 + index) * 0.1 }}>
                <Link
                  href={link.href}
                  className='block text-gray-700 hover:text-primary font-medium py-2'
                  onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Actions */}
            <div className='pt-4 border-t border-gray-200 space-y-3'>
              
              <Button 
                className='w-full bg-primary text-white hover:bg-primary/80'
                onClick={() => {
                  router.push('/admin');
                  setIsOpen(false);
                }}>
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
