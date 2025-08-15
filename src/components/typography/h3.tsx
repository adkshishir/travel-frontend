import { cn } from '@/lib/utils';
import React from 'react';

const H3 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn('text-[#012E41] text-[32px] max-lg:text-[24px] max-md:text-[18px] leading-[34px] max-lg:leading-[26px] max-md:leading-[20px] font-semibold',className)}>{children}</h3>
  );
};

export default H3; 