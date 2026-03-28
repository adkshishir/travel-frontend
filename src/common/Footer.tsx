import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Mountain, Shield, Award, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-[#0d1117] text-white'>
      {/* Top CTA strip */}
      <div className='bg-primary'>
        <div className='max-w-[1200px] mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div>
            <p className='font-bold text-white text-lg'>Ready for your next adventure?</p>
            <p className='text-white/80 text-sm'>Talk to our trekking experts — free consultation</p>
          </div>
          <Link
            href='/contact'
            className='shrink-0 inline-flex items-center gap-2 bg-white text-primary font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-colors text-sm'>
            Plan My Trek <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className='max-w-[1200px] mx-auto px-4 pt-14 pb-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>

          {/* Brand */}
          <div className='lg:col-span-1 space-y-5'>
            <Link href='/' className='inline-flex items-center gap-2'>
              <Mountain className='text-primary w-7 h-7' />
              <span className='text-xl font-bold'>
                <span className='text-primary'>Poonhill</span>Treks
              </span>
            </Link>
            <p className='text-gray-400 text-sm leading-relaxed'>
              Your trusted guide for Himalayan adventures since 2009. Expert-led treks with safety, sustainability, and unforgettable memories at the core.
            </p>
            <div className='flex gap-3'>
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className='w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300'>
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-widest text-gray-400 mb-5'>Explore</h3>
            <ul className='space-y-3'>
              {[
                { label: 'Search All Packages', href: '/search' },
                { label: 'Popular Destinations', href: '/#popular-destinations' },
                { label: 'About Us', href: '/about' },
                { label: 'Our Team', href: '/team' },
                { label: 'Photo Gallery', href: '/gallery' },
                { label: 'Blogs & Stories', href: '/blogs' },
                { label: 'Trekker Reviews', href: '/testimonials' },
                { label: 'Why Choose Us', href: '/why-us' },
                { label: 'Responsible Travel', href: '/responsible-travel' },
                { label: 'Travel Tips', href: '/travel-tips' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className='text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group'>
                    <span className='w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity' />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-widest text-gray-400 mb-5'>Our Services</h3>
            <ul className='space-y-3'>
              {[
                'Guided Trekking',
                'Group & Private Tours',
                'Equipment Rental',
                'Helicopter Tours',
                'Photography Tours',
                'Safety & First Aid',
              ].map((label) => (
                <li key={label} className='text-gray-400 text-sm flex items-center gap-2'>
                  <span className='w-1 h-1 rounded-full bg-primary shrink-0' />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-widest text-gray-400 mb-5'>Get in Touch</h3>
            <div className='space-y-3 mb-6'>
              {[
                { icon: MapPin, text: 'Thamel, Kathmandu, Nepal', href: '#' },
                { icon: Phone, text: '+977-1-4123456', href: 'tel:+97714123456' },
                { icon: Mail, text: 'info@poonhilltreks.com', href: 'mailto:info@poonhilltreks.com' },
              ].map(({ icon: Icon, text, href }) => (
                <Link
                  key={text}
                  href={href}
                  className='flex items-start gap-3 text-gray-400 hover:text-white transition-colors group'>
                  <Icon size={15} className='text-primary mt-0.5 shrink-0' />
                  <span className='text-sm'>{text}</span>
                </Link>
              ))}
            </div>

            <h4 className='text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3'>Newsletter</h4>
            <div className='flex rounded-lg overflow-hidden border border-white/10'>
              <input
                type='email'
                placeholder='Your email'
                className='flex-1 px-3 py-2.5 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 transition-colors'
              />
              <button className='px-4 bg-primary hover:bg-orange-600 transition-colors'>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className='border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500'>
          <p>© {new Date().getFullYear()} Poonhill Treks. All rights reserved.</p>
          <div className='flex items-center gap-4'>
            <Link href='/privacy' className='hover:text-white transition-colors'>Privacy Policy</Link>
            <Link href='/terms' className='hover:text-white transition-colors'>Terms of Service</Link>
          </div>
          <div className='flex items-center gap-4'>
            <span className='flex items-center gap-1.5'>
              <Shield size={12} className='text-primary' /> Licensed & Insured
            </span>
            <span className='flex items-center gap-1.5'>
              <Award size={12} className='text-primary' /> 15+ Years Experience
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
