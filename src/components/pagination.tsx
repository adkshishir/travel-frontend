import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className='flex items-center justify-center space-x-2 my-8'>
      <Button
        variant='outline'
        size='icon'
        disabled={currentPage === 1}
        className='h-8 w-8'>
        <ChevronLeft className='h-4 w-4' />
        <span className='sr-only'>Previous page</span>
      </Button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <Button
          key={i}
          variant={currentPage === i + 1 ? 'default' : 'outline'}
          size='sm'
          className={
            currentPage === i + 1
              ? 'bg-orange-500 hover:bg-orange-600 h-8 w-8 p-0'
              : 'h-8 w-8 p-0'
          }>
          {i + 1}
        </Button>
      ))}

      <Button
        variant='outline'
        size='icon'
        disabled={currentPage === totalPages}
        className='h-8 w-8'>
        <ChevronRight className='h-4 w-4' />
        <span className='sr-only'>Next page</span>
      </Button>
    </div>
  );
}
