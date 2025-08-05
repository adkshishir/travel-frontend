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
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeActivity, setActiveActivity] = useState<number | null>(null);
  const [activeDestination, setActiveDestination] = useState<number | null>(
    null
  );
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
        setActiveDestination(null);
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
      setActiveDestination(null);
    } else {
      setActiveActivity(index);
      setActiveDestination(null);
    }
  };

  // Handle destination hover for desktop
  const handleDestinationHover = (index: number) => {
    setActiveDestination(index);
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
    setActiveDestination(null);
  };

  // Handle destination name click - navigate to destination page
  const handleDestinationNameClick = (e: React.MouseEvent, activitySlug: string, destinationSlug: string) => {
    e.stopPropagation();
    router.push(`/${activitySlug}/${destinationSlug}`);
    setActiveActivity(null);
    setActiveDestination(null);
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-50  bg-[#ffffffee] shadow-sm'>
      <div className='max-w-[1180px] mx-auto max-lg:px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/' className='text-xl font-bold flex items-center'>
            <span className='text-orange-500'>Poonhill</span>
            <span className='text-gray-800'>Treks</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            {/* Regular nav links */}

            {/* Activities in nav bar */}
            {navItems?.map((activity, actIndex) => (
              <div key={activity.name} className='relative' ref={dropdownRef}>
                {/* Activity Dropdown Trigger */}
                <div className='flex items-center'>
                  <button
                    className='text-gray-600 hover:text-orange-500 transition-colors duration-200 cursor-pointer'
                    onClick={(e) => handleActivityNameClick(e, activity.slug)}>
                    {activity.name}
                  </button>
                  <button
                    className='ml-1 text-gray-600 hover:text-orange-500 transition-colors duration-200'
                    onMouseEnter={() => handleActivityInteraction(actIndex)}
                    onClick={() => handleActivityInteraction(actIndex)}>
                    <ChevronDown className='h-4 w-4' />
                  </button>
                </div>

                {/* First Level Dropdown - Destinations */}
                <AnimatePresence>
                  {activeActivity === actIndex && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className='absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10'
                      onMouseLeave={() => {
                        if (activeDestination === null) {
                          setActiveActivity(null);
                        }
                      }}>
                      {activity.destinations.map((destination, destIndex) => (
                        <div
                          key={destination.name}
                          className='relative'
                          onMouseEnter={() =>
                            handleDestinationHover(destIndex)
                          }>
                          <div className='flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500'>
                            <button
                              className='flex-1 text-left cursor-pointer'
                              onClick={(e) => handleDestinationNameClick(e, activity.slug, destination.slug)}>
                              {destination.name}
                            </button>
                            <ChevronRight className='h-4 w-4' />
                          </div>

                          {/* Second Level Dropdown - Packages */}
                          {activeDestination === destIndex && (
                            <div className='absolute left-full top-0 w-56 bg-white rounded-md shadow-lg py-1'>
                              {destination.packages.map((pkg) => (
                                <Link
                                  key={pkg.slug}
                                  href={`/${activity.slug}/${destination.slug}/${pkg.slug
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')}`}
                                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500'
                                  onClick={() => {
                                    setActiveActivity(null);
                                    setActiveDestination(null);
                                  }}>
                                  {pkg.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-gray-600 hover:text-orange-500 transition-colors duration-200'>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Book Trip Button */}
          <Button
            onClick={() => router.push('/admin')}
            className='hidden cursor-pointer md:block bg-teal-500 hover:bg-teal-600 text-white'>
            Book Trip
          </Button>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-gray-800'
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='md:hidden bg-white border-t overflow-hidden'>
            <div className='container mx-auto px-4 py-4'>
              <nav className='flex flex-col space-y-1'>
                {/* Activities for mobile */}
                {navItems?.map((activity, actIndex) => (
                  <div key={activity.name}>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: (navLinks.length + actIndex) * 0.05,
                      }}
                      className='py-2'>
                      <div className='flex items-center justify-between'>
                        <button
                          className='text-gray-700 hover:text-orange-500 transition-colors cursor-pointer'
                          onClick={() => {
                            router.push(`/${activity.slug}`);
                            setIsOpen(false);
                          }}>
                          {activity.name}
                        </button>
                        <button
                          onClick={() => handleMobileActivityClick(actIndex)}>
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 text-gray-600 transition-transform duration-200',
                              mobileActiveActivity === actIndex
                                ? 'transform rotate-180'
                                : ''
                            )}
                          />
                        </button>
                      </div>
                    </motion.div>

                    {/* Mobile First Level - Destinations */}
                    <AnimatePresence>
                      {mobileActiveActivity === actIndex && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className='pl-4 border-l border-gray-200 ml-2'>
                          {activity.destinations.map(
                            (destination, destIndex) => (
                              <div key={destination.name}>
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: destIndex * 0.05 }}
                                  className='py-2'>
                                  <div className='flex items-center justify-between'>
                                    <button
                                      className='text-gray-600 hover:text-orange-500 transition-colors cursor-pointer'
                                      onClick={() => {
                                        router.push(`/${activity.slug}/${destination.slug}`);
                                        setIsOpen(false);
                                      }}>
                                      {destination.name}
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleMobileDestinationClick(destIndex)
                                      }>
                                      <ChevronDown
                                        className={cn(
                                          'h-4 w-4 text-gray-600 transition-transform duration-200',
                                          mobileActiveDestination === destIndex
                                            ? 'transform rotate-180'
                                            : ''
                                        )}
                                      />
                                    </button>
                                  </div>
                                </motion.div>

                                {/* Mobile Second Level - Packages */}
                                <AnimatePresence>
                                  {mobileActiveDestination === destIndex && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className='pl-4 border-l border-gray-200 ml-2'>
                                      {destination.packages.map(
                                        (pkg, pkgIndex) => (
                                          <motion.div
                                            key={pkg.slug}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                              delay: pkgIndex * 0.05,
                                            }}>
                                            <Link
                                              href={`/${activity.slug}/${destination.slug}/${pkg.slug
                                                .toLowerCase()
                                                .replace(/\s+/g, '-')}`}
                                              className='block py-2 text-sm text-gray-600 hover:text-orange-500'
                                              onClick={() => setIsOpen(false)}>
                                              {pkg.title}
                                            </Link>
                                          </motion.div>
                                        )
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                {/* Regular nav links for mobile */}
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className='py-2'>
                    <Link
                      href={link.href}
                      className='text-gray-700 hover:text-orange-500 transition-colors'
                      onClick={() => setIsOpen(false)}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay:
                      (navItems
                        ? navLinks.length + navItems.length
                        : navLinks.length) * 0.05,
                  }}
                  className='pt-4 cursor-pointer'
                  onClick={() => {
                    router.push('/booking');
                  }}>
                  <Button className='w-full bg-teal-500 hover:bg-teal-600 text-white'>
                    Book Trip
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
