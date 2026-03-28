'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${ENDPOINTS.NEWSLETTER_SUBSCRIBE}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg(data.message || 'Successfully subscribed!');
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setMsg(data.message || 'Already subscribed or an error occurred.');
      }
    } catch {
      setStatus('error');
      setMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <section className='bg-gradient-to-br from-[#1a0a00] to-[#3d1f00] text-white'>
      <div className='max-w-[1180px] mx-auto px-4 py-16'>
        <div className='max-w-2xl mx-auto text-center'>
          <div className='w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-5'>
            <Mail className='text-primary' size={28} />
          </div>
          <h2 className='text-3xl font-bold mb-3'>Get Trek Inspiration in Your Inbox</h2>
          <p className='text-white/70 text-lg mb-8'>
            Early bird deals, seasonal trek guides, packing tips, and Nepal travel stories — delivered monthly. No spam, unsubscribe anytime.
          </p>

          {status === 'success' ? (
            <div className='flex flex-col items-center gap-3'>
              <CheckCircle size={48} className='text-green-400' />
              <p className='text-green-300 font-semibold text-lg'>{msg}</p>
              <p className='text-white/60 text-sm'>Welcome to the Poonhill Treks community!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-3'>
              <input
                type='text'
                placeholder='Your name (optional)'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-primary'
              />
              <input
                type='email'
                placeholder='Your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-primary'
              />
              <button
                type='submit'
                disabled={status === 'loading'}
                className='shrink-0 bg-primary hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors disabled:opacity-60'
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className='text-red-400 text-sm mt-3'>{msg}</p>
          )}

          <p className='text-white/40 text-xs mt-4'>
            By subscribing, you agree to receive marketing emails. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
