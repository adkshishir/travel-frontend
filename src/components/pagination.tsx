import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = '/blogs',
}: PaginationProps) {
  const getPageHref = (page: number) => `${basePath}?page=${page}`;

  return (
    <div className='flex items-center justify-center space-x-2 my-8'>
      {currentPage > 1 ? (
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8'
          asChild>
          <Link href={getPageHref(currentPage - 1)}>
            <ChevronLeft className='h-4 w-4' />
            <span className='sr-only'>Previous page</span>
          </Link>
        </Button>
      ) : (
        <Button
          variant='outline'
          size='icon'
          disabled
          className='h-8 w-8'>
          <ChevronLeft className='h-4 w-4' />
          <span className='sr-only'>Previous page</span>
        </Button>
      )}

      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        const isActive = currentPage === page;

        return (
          <Button
            key={page}
            variant={isActive ? 'default' : 'outline'}
            size='sm'
            className={
              isActive
                ? 'bg-orange-500 hover:bg-primary h-8 w-8 p-0'
                : 'h-8 w-8 p-0'
            }
            asChild={!isActive}>
            {isActive ? (
              <span>{page}</span>
            ) : (
              <Link href={getPageHref(page)}>{page}</Link>
            )}
          </Button>
        );
      })}

      {currentPage < totalPages ? (
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8'
          asChild>
          <Link href={getPageHref(currentPage + 1)}>
            <ChevronRight className='h-4 w-4' />
            <span className='sr-only'>Next page</span>
          </Link>
        </Button>
      ) : (
        <Button
          variant='outline'
          size='icon'
          disabled
          className='h-8 w-8'>
          <ChevronRight className='h-4 w-4' />
          <span className='sr-only'>Next page</span>
        </Button>
      )}
    </div>
  );
}
