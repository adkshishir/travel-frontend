'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Mountain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

export type TActivity = {
  name: string;
  slug: string;
  destinations: {
    name: string;
    slug: string;
    packages: { title: string; slug: string }[];
  }[];
}[];

const navLinks = [
  { href: '/search', label: 'All Packages' },
  // { href: '/blogs', label: 'Blogs' },
  {
    href: '#', label: 'Company', children: [
      { href: '/about', label: 'About Us' },
      { href: '/team', label: 'Our Team' },
      { href: '/why-us', label: 'Why Choose Us' },
      { href: '/responsible-travel', label: 'Responsible Travel' },
    ]
  },
  // {
  //   href: '#', label: 'Resources', children: [
  //     { href: '/travel-tips', label: 'Travel Tips & Guides' },
  //     { href: '/gallery', label: 'Photo Gallery' },
  //     { href: '/testimonials', label: 'Reviews' },
  //   ]
  // },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen]             = useState(false);
  const [activeActivity, setActiveActivity] = useState<number | null>(null);
  const [mobileActiveActivity, setMobileActiveActivity] = useState<number | null>(null);
  const [scrolled, setScrolled]         = useState(false);
  const [navItems, setNavItems]         = useState<TActivity>();
  const router   = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine if we're on the homepage (hero covers viewport → start transparent)
  const isHome = pathname === '/';

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mega menu on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveActivity(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // Fetch nav items
  useEffect(() => {
    (async () => {
      const data = await fetchData(ENDPOINTS.NAV_ITEMS);
      setNavItems(data);
    })();
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); setActiveActivity(null); }, [pathname]);

  const transparent = isHome && !scrolled && !isOpen;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-[#e8e0d4] shadow-sm'
      )}>
      <div className='max-w-[1180px] mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>

          {/* ── Logo ──────────────────────────── */}
          <Link href='/' className='flex items-center gap-2 shrink-0'>
            <Mountain
              size={24}
              className={cn(
                'transition-colors duration-300',
                transparent ? 'text-white' : 'text-primary'
              )}
            />
            <span className={cn(
              'text-xl font-bold transition-colors duration-300',
              transparent ? 'text-white' : 'text-[#1c2b1c]'
            )}>
              Travel<span className={transparent ? 'text-orange-300' : 'text-primary'}>treks</span>
            </span>
          </Link>

          {/* ── Desktop nav ───────────────────── */}
          <nav className='hidden lg:flex items-center gap-1' ref={dropdownRef}>
            {navItems?.map((activity, i) => (
              <div
                key={activity.slug}
                className='relative'
                onMouseEnter={() => setActiveActivity(i)}
                onMouseLeave={() => setActiveActivity(null)}>
                <button
                  onClick={() => { router.push(`/${activity.slug}`); setActiveActivity(null); }}
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                    transparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-[#2d4a2d] hover:text-primary hover:bg-orange-50'
                  )}>
                  {activity.name}
                  <ChevronDown
                    size={14}
                    className={cn('transition-transform duration-200', activeActivity === i && 'rotate-180')}
                  />
                </button>

                {/* Mega dropdown */}
                <AnimatePresence>
                  {activeActivity === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className='absolute left-1/2 -translate-x-1/2 mt-1 w-max min-w-[480px] max-w-3xl'>
                      <div className='bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden'>
                        {/* Header strip */}
                        <div className='bg-gradient-to-r from-[#1c2b1c] to-[#2d4a2d] px-6 py-3 flex items-center justify-between'>
                          <div>
                            <p className='text-white font-semibold text-sm'>{activity.name}</p>
                            <p className='text-white/60 text-xs'>{activity.destinations.length} destinations</p>
                          </div>
                          <button
                            onClick={() => { router.push(`/${activity.slug}`); setActiveActivity(null); }}
                            className='text-xs text-orange-300 hover:text-orange-200 font-medium'>
                            View All →
                          </button>
                        </div>
                        {/* Destinations grid */}
                        <div className='p-5 grid grid-cols-2 gap-x-8 gap-y-1 max-h-72 overflow-y-auto'>
                          {activity.destinations.map((dest) => (
                            <div key={dest.slug} className='min-w-0'>
                              <button
                                onClick={() => { router.push(`/${activity.slug}/${dest.slug}`); setActiveActivity(null); }}
                                className='text-xs font-semibold text-primary hover:text-orange-600 uppercase tracking-wide py-1.5 flex items-center gap-1 transition-colors'>
                                {dest.name}
                              </button>
                              <ul className='mb-3 space-y-0.5'>
                                {dest.packages.slice(0, 5).map((pkg) => (
                                  <li key={pkg.slug}>
                                    <Link
                                      href={`/${activity.slug}/${dest.slug}/${pkg.slug}`}
                                      onClick={() => setActiveActivity(null)}
                                      className='text-xs text-gray-500 hover:text-primary block py-0.5 transition-colors hover:translate-x-1 transform duration-150 truncate'>
                                      {pkg.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className='relative group'>
                  <button className={cn(
                    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                    transparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-[#2d4a2d] hover:text-primary hover:bg-orange-50'
                  )}>
                    {link.label}
                    <ChevronDown size={14} className='group-hover:rotate-180 transition-transform duration-200' />
                  </button>
                  <div className='absolute left-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className='block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-primary transition-colors'>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                    transparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-[#2d4a2d] hover:text-primary hover:bg-orange-50'
                  )}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* ── Right actions ─────────────────── */}
          <div className='flex items-center gap-3'>
            <button
              onClick={() => router.push('/booking')}
              className={cn(
                'hidden lg:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-300 hover:-translate-y-0.5',
                transparent
                  ? 'bg-primary text-white hover:bg-orange-600 shadow-lg shadow-primary/30'
                  : 'bg-primary text-white hover:bg-orange-600'
              )}>
              Book a Trek
            </button>

            {/* Mobile hamburger */}
            <button
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                transparent ? 'text-white hover:bg-white/10' : 'text-[#1c2b1c] hover:bg-gray-100'
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label='Toggle menu'>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className='lg:hidden bg-white border-t border-[#e8e0d4] overflow-hidden'>
            <div className='px-4 py-5 space-y-1 max-h-[75vh] overflow-y-auto'>
              {/* Activities */}
              {navItems?.map((activity, i) => (
                <div key={activity.slug}>
                  <div className='flex items-center justify-between'>
                    <button
                      onClick={() => { router.push(`/${activity.slug}`); setIsOpen(false); }}
                      className='flex-1 text-left text-sm font-semibold text-[#1c2b1c] py-2.5 hover:text-primary transition-colors'>
                      {activity.name}
                    </button>
                    <button
                      onClick={() => setMobileActiveActivity(mobileActiveActivity === i ? null : i)}
                      className='p-2 text-gray-400 hover:text-primary transition-colors'>
                      <ChevronDown
                        size={16}
                        className={cn('transition-transform duration-200', mobileActiveActivity === i && 'rotate-180')}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {mobileActiveActivity === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className='pl-3 pb-3 border-l-2 border-orange-100 ml-2 space-y-2'>
                        {activity.destinations.map((dest) => (
                          <div key={dest.slug}>
                            <button
                              onClick={() => { router.push(`/${activity.slug}/${dest.slug}`); setIsOpen(false); }}
                              className='text-xs font-semibold text-primary uppercase tracking-wide py-1 block hover:text-orange-600'>
                              {dest.name}
                            </button>
                            {dest.packages.slice(0, 4).map((pkg) => (
                              <Link
                                key={pkg.slug}
                                href={`/${activity.slug}/${dest.slug}/${pkg.slug}`}
                                onClick={() => setIsOpen(false)}
                                className='text-xs text-gray-500 hover:text-primary block py-0.5 pl-2 transition-colors'>
                                › {pkg.title}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Regular links */}
              <div className='pt-2 border-t border-gray-100 space-y-1'>
                {navLinks.map((link) =>
                  link.children ? (
                    <div key={link.label}>
                      <p className='text-xs font-semibold text-gray-400 uppercase tracking-wide pt-2 pb-1 px-1'>{link.label}</p>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className='block text-sm text-gray-600 hover:text-primary py-2 pl-3 transition-colors'>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className='block text-sm font-medium text-[#2d4a2d] hover:text-primary py-2.5 transition-colors'>
                      {link.label}
                    </Link>
                  )
                )}
              </div>

              {/* CTA */}
              <div className='pt-3 border-t border-gray-100'>
                <button
                  onClick={() => { router.push('/booking'); setIsOpen(false); }}
                  className='w-full bg-primary text-white font-semibold py-3 rounded-xl text-sm hover:bg-orange-600 transition-colors'>
                  Book a Trek
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
