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
    <h2 className={cn('text-[#012E41] text-[40px] max-lg:text-[30px] max-md:text-[20px] leading-[42px] max-lg:leading-[32px] max-md:leading-[22px] font-semibold',className)}>{children}</h2>
  );
};

export default H2; 