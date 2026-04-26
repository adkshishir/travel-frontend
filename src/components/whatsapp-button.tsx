'use client';

import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
}

export default function WhatsAppButton({
  phone = '977000000000',
  message = 'Hello! I am interested in trekking with Traveltreks. Can you help me plan my adventure?',
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const href = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Chat with us on WhatsApp'
      className='fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group'
    >
      <MessageCircle size={26} fill='white' />
      <span className='absolute right-16 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'>
        Chat with us
      </span>
    </a>
  );
}
