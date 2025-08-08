
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, Mountain, Users, Shield, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-0' style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0l15 15H0l15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className='relative max-w-[1200px] mx-auto px-4 py-12'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          
          {/* Brand Section */}
          <div className='lg:col-span-1 space-y-6'>
            <Link href='/' className='inline-block group'>
              <div className='flex items-center space-x-2'>
                <Mountain className='text-primary w-8 h-8 group-hover:text-orange-400 transition-colors' />
                <span className='text-2xl font-bold'>
                  <span className='text-primary'>Poonhill</span>Treks
                </span>
              </div>
            </Link>
            <p className='text-gray-300 text-sm leading-relaxed max-w-xs'>
              Your trusted companion for unforgettable trekking adventures. We turn your mountain dreams into reality with expert guidance and unmatched experience.
            </p>
            
            {/* Social Media */}
            <div className='flex space-x-4'>
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' }
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className='w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110'>
                  <Icon size={18} />
                  <span className='sr-only'>{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold mb-6 text-orange-400'>Quick Links</h3>
            <ul className='space-y-3'>
              {[
                { label: ' Packages', href: '/#activities' },
                { label: 'Popular Destinations', href: '/#popular-destinations' },
                { label: 'About Us', href: '/about' },
                // { label: 'Booking Guide', href: '/guide' },
                // { label: 'Safety Guidelines', href: '/safety' },
                { label: 'FAQ', href: '/faq' }
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className='text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center group'>
                    <span className='w-2 h-2 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold mb-6 text-orange-400'>Our Services</h3>
            <ul className='space-y-3'>
              {[
                { label: 'Guided Trekking', icon: Users },
                { label: 'Equipment Rental', icon: Mountain },
                { label: 'Safety Training', icon: Shield },
                { label: 'Photography Tours', icon: Award }
              ].map(({ label, icon: Icon }) => (
                <li key={label} className='flex items-center space-x-3 text-gray-300 text-sm'>
                  <Icon size={16} className='text-primary' />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            
            {/* CTA Button */}
            <div className='pt-4'>
              <Link
                href='/contact'
                className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-orange-600 text-white text-sm font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg'>
                Plan Your Trek
                <Mountain size={16} className='ml-2' />
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold mb-6 text-orange-400'>Get In Touch</h3>
            <div className='space-y-4'>
              {[
                { icon: MapPin, text: 'Thamel, Kathmandu, Nepal', href: '#' },
                { icon: Phone, text: '+977-1-4123456', href: 'tel:+97714123456' },
                { icon: Mail, text: 'info@triptopia.com', href: 'mailto:info@triptopia.com' }
              ].map(({ icon: Icon, text, href }) => (
                <Link
                  key={text}
                  href={href}
                  className='flex items-start space-x-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 group'>
                  <Icon size={18} className='text-primary mt-0.5 group-hover:scale-110 transition-transform duration-300' />
                  <span className='text-sm'>{text}</span>
                </Link>
              ))}
            </div>
            
            {/* Newsletter */}
            <div className='pt-4'>
              <h4 className='text-sm font-medium text-white mb-3'>Stay Updated</h4>
              <div className='flex'>
                <input
                  type='email'
                  placeholder='Your email'
                  className='flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-l-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors'
                />
                <button className='px-4 py-2 bg-primary hover:bg-orange-600 rounded-r-lg transition-colors duration-300'>
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-slate-700 mb-8'></div>

        {/* Bottom Section */}
        <div className='flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0'>
          <div className='text-sm text-gray-400'>
            © {new Date().getFullYear()} Poonhill Treks. All rights reserved. | 
            <Link href='/privacy' className='hover:text-orange-400 transition-colors ml-1'>Privacy Policy</Link> | 
            <Link href='/terms' className='hover:text-orange-400 transition-colors ml-1'>Terms of Service</Link>
          </div>
          
          <div className='flex items-center space-x-4 text-sm text-gray-400'>
            <span className='flex items-center space-x-2'>
              <Shield size={14} className='text-primary' />
              <span>Licensed & Insured</span>
            </span>
            <span className='flex items-center space-x-2'>
              <Award size={14} className='text-primary' />
              <span>5+ Years Experience</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
