import * as React from 'react';

interface BookingSidebarProps {
  children: React.ReactNode;
}

export function BookingSidebar({ children }: BookingSidebarProps) {
  return (
    <div className='lg:sticky lg:top-24 h-fit'>
      {children}
    </div>
  );
}
