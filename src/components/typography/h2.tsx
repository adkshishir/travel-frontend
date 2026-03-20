import { cn } from '@/lib/utils';
import React from 'react';

const H2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn('text-[#1c2b1c] text-[40px] max-lg:text-[30px] max-md:text-[22px] leading-[44px] max-lg:leading-[34px] max-md:leading-[28px] font-bold',className)}>{children}</h2>
  );
};

export default H2; 