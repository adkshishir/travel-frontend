import { cn } from '@/lib/utils';
import React from 'react';
type TProps = {
  className?: string;
  children?: React.ReactNode;
};
const PrimaryText = ({ className, children }: TProps) => {
  return (
    <div className={cn('text-primary  text-[24px] max-lg:text-[18px] max-md:text-[14px] font-medium ', className)}>
      {children}
    </div>
  );
};

export default PrimaryText;
