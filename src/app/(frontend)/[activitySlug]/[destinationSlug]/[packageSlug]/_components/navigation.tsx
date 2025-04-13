'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'inclusions', label: 'Inclusions' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'map', label: 'Map' },
  { id: 'faq', label: 'FAQ' },
];

export function Navigation() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className='mt-6 sticky top-16 mb-4 gap-8 bg-white self-start flex overflow-x-auto border-b'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            'flex    items-center  border-b-2  py-4 text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:border-muted hover:text-foreground'
          )}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
