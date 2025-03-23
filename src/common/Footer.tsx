
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-[#003344] text-white'>
      <div className='container mx-auto px-4 py-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Logo and Description */}
          <div className='space-y-4'>
            <Link href='/' className='inline-block'>
              <span className='text-xl font-bold'>
                <span className='text-orange-500'>T</span>riptopia
              </span>
            </Link>
            <p className='text-sm text-gray-300 max-w-xs'>
              Hello, we are Lift Media. Our goal is to translate the positive
              effects from revolutionizing
            </p>
            <div className='flex space-x-4 pt-2'>
              <Link
                href='#'
                className='text-gray-300 hover:text-white transition-colors'>
                <Facebook size={18} />
                <span className='sr-only'>Facebook</span>
              </Link>
              <Link
                href='#'
                className='text-gray-300 hover:text-white transition-colors'>
                <Instagram size={18} />
                <span className='sr-only'>Instagram</span>
              </Link>
              <Link
                href='#'
                className='text-gray-300 hover:text-white transition-colors'>
                <Linkedin size={18} />
                <span className='sr-only'>LinkedIn</span>
              </Link>
              <Link
                href='#'
                className='text-gray-300 hover:text-white transition-colors'>
                <Twitter size={18} />
                <span className='sr-only'>Twitter</span>
              </Link>
            </div>
          </div>

          {/* About Links */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium mb-4'>About</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='#'
                  className='text-sm text-gray-300 hover:text-white transition-colors'>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm text-gray-300 hover:text-white transition-colors'>
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm text-gray-300 hover:text-white transition-colors'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm text-gray-300 hover:text-white transition-colors'>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium mb-4'>Contact</h3>
            <ul className='space-y-2'>
              <li className='flex items-start space-x-2 text-sm text-gray-300'>
                <span>📞</span>
                <span>+012 345 67890</span>
              </li>
              <li className='flex items-start space-x-2 text-sm text-gray-300'>
                <span>✉️</span>
                <span>contact@example.com</span>
              </li>
              <li className='flex items-start space-x-2 text-sm text-gray-300'>
                <span>📍</span>
                <span>123 Street, New York, USA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Gallery */}
        {/* <div className='mt-12'>
          <h3 className='text-lg font-medium mb-4'>Gallery</h3>
          <div className='grid grid-cols-3 md:grid-cols-6 gap-2'>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className='relative h-16 md:h-20 overflow-hidden rounded'>
                <Image
                  src={`/images/hero.jpg?height=80&width=80`}
                  alt={`Gallery image ${item}`}
                  fill
                  className='object-cover'
                />
              </div>
            ))}
          </div>
        </div> */}

        {/* Copyright */}
        <div className='mt-12 pt-6 border-t border-gray-700 text-center text-sm text-gray-400'>
          © 2024 Triptopia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
