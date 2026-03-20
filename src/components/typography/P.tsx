import { cn } from '@/lib/utils';
import React from 'react';
type TProps = {
  className?: string;
  children?: React.ReactNode;
};
const P = ({ className, children }: TProps) => {
  return (
    <p className={cn(`text-[16px] leading-relaxed text-[#4b5e4c]`, className)}>{children}</p>
  );
};

export default P;
