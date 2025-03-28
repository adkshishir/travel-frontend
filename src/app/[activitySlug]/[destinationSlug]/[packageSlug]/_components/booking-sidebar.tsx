
import * as React from 'react';


interface BookingSidebarProps {
  children: React.ReactNode;
}

export function BookingSidebar({ children }: BookingSidebarProps) {

  return (
    <div
      className='lg:sticky lg:top-20 h-fit'
      style={{ position: '-webkit-sticky' }}>
      {children}
    </div>
  );
}
