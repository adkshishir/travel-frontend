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
    <h1 className={cn('text-[#012E41] text-[48px] max-lg:text-[36px] max-md:text-[24px]  leading-[50px] max-lg:leading-[40px] max-md:leading-[26px] font-semibold',className)}>{children}</h1>
  );
};

export default H1;
