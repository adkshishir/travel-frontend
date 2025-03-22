import { cn } from '@/lib/utils';
import React from 'react';
type TProps = {
  className?: string;
  children?: React.ReactNode;
};
const P = ({ className, children }: TProps) => {
  return (
    <p className={cn(`text-[16px] text-[#345867]`, className)}>{children}</p>
  );
};

export default P;
