'use client';

import * as React from 'react';
import { ChevronLeft, Map, Phone } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BookingSidebarProps {
  children: React.ReactNode;
}

export function BookingSidebar({ children }: BookingSidebarProps) {
  const [activeSection, setActiveSection] = React.useState('booking');

  return (
    <div className='lg:sticky lg:top-20 h-fit' style={{ position: '-webkit-sticky' }}>
      <div className='mb-4 rounded-lg border bg-card shadow-sm'>
        <div className='flex items-center justify-between p-4'>
          <Button variant='outline' size='sm'>
            <ChevronLeft className='mr-1 h-4 w-4' />
            Back
          </Button>
          <div className='flex space-x-2'>
            <Button variant='outline' size='sm'>
              <Map className='mr-1 h-4 w-4' />
              Map
            </Button>
            <Button variant='outline' size='sm'>
              <Phone className='mr-1 h-4 w-4' />
              Contact
            </Button>
          </div>
        </div>
        <div className='flex border-t'>
          <button
            onClick={() => setActiveSection('booking')}
            className={cn(
              'flex-1 border-b-2 py-2 text-sm font-medium',
              activeSection === 'booking'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}>
            Booking
          </button>
          <button
            onClick={() => setActiveSection('details')}
            className={cn(
              'flex-1 border-b-2 py-2 text-sm font-medium',
              activeSection === 'details'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}>
            Details
          </button>
          <button
            onClick={() => setActiveSection('reviews')}
            className={cn(
              'flex-1 border-b-2 py-2 text-sm font-medium',
              activeSection === 'reviews'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}>
            Reviews
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
