'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'includes', label: 'Includes' },
  { id: 'good-to-know', label: 'Good to know' },
  { id: 'map', label: 'Map' },
];

export function Navigation() {
  const [activeTab, setActiveTab] = useState('introduction');

  return (
    <div className='mt-6 sticky top-16 mb-2 bg-white self-start flex overflow-x-auto border-b'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            'flex min-w-[100px]  items-center justify-center border-b-2 px-4 py-4 text-sm font-medium transition-colors',
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
