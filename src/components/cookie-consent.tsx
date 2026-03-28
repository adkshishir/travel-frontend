'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Check } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'poonhill_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Delay slightly so it doesn't flash immediately on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 p-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md'>
      <div className='bg-gray-900 text-white rounded-2xl shadow-2xl p-5 border border-white/10'>
        <div className='flex items-start gap-3 mb-4'>
          <div className='w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5'>
            <Cookie size={18} className='text-primary' />
          </div>
          <div>
            <h3 className='font-semibold text-base mb-1'>We use cookies</h3>
            <p className='text-white/70 text-sm leading-relaxed'>
              We use cookies to enhance your browsing experience, serve personalized content, and analyze site traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.{' '}
              <Link href='/privacy' className='text-primary hover:underline'>
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
        <div className='flex gap-3'>
          <button
            onClick={accept}
            className='flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors'
          >
            <Check size={14} /> Accept All
          </button>
          <button
            onClick={decline}
            className='flex items-center justify-center gap-1 text-white/60 hover:text-white text-sm py-2.5 px-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors'
          >
            <X size={14} /> Decline
          </button>
        </div>
      </div>
    </div>
  );
}
