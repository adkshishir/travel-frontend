'use client';

import { useState } from 'react';
import { Share2, Facebook, Twitter, Link, MessageCircle, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback */
    }
  };

  return (
    <div className='flex items-center gap-2 flex-wrap'>
      <span className='flex items-center gap-1.5 text-sm text-gray-500 font-medium'>
        <Share2 size={14} /> Share:
      </span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target='_blank'
        rel='noopener noreferrer'
        className='w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors'
        aria-label='Share on Facebook'
      >
        <Facebook size={14} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target='_blank'
        rel='noopener noreferrer'
        className='w-8 h-8 bg-sky-500 hover:bg-sky-600 text-white rounded-lg flex items-center justify-center transition-colors'
        aria-label='Share on Twitter'
      >
        <Twitter size={14} />
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target='_blank'
        rel='noopener noreferrer'
        className='w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition-colors'
        aria-label='Share on WhatsApp'
      >
        <MessageCircle size={14} />
      </a>
      <button
        onClick={copyLink}
        className='w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center transition-colors'
        aria-label='Copy link'
      >
        {copied ? <Check size={14} className='text-green-600' /> : <Link size={14} />}
      </button>
    </div>
  );
}
