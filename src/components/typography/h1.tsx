import { cn } from '@/lib/utils';
import React from 'react';

const H1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={cn('text-[#012E41] text-[48px] leading-[50px] font-medium',className)}>{children}</h1>
  );
};

export default H1;
