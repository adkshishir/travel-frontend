import Image from 'next/image';
import { Calendar, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BlogCardProps {
  blog: {
    id: number;
    title: string;
    image: string;
    excerpt: string;
    date: string;
    comments: number;
    shares: number;
    slug?: string; // Added slug for navigation
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className='mb-12'>
      <Image
        src={blog.image || '/images/hero.jpg'}
        alt={blog.title}
        width={800}
        height={400}
        className='w-full h-auto rounded-lg object-cover aspect-[16/9] mb-4'
      />
      <Link href={`/blogs/${blog.slug || blog.id}`}>
        <h2 className='text-2xl font-bold text-slate-800 mb-2 hover:text-orange-500 cursor-pointer transition-colors'>
          {blog.title}
        </h2>
      </Link>
      <p className='text-slate-600 mb-4'>{blog.excerpt}</p>

      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-4 text-sm text-slate-500'>
          <div className='flex items-center'>
            <Calendar className='h-4 w-4 mr-1' />
            <span>{blog.date}</span>
          </div>
          <div className='flex items-center'>
            <MessageSquare className='h-4 w-4 mr-1' />
            <span>
              {blog.comments} Comment{blog.comments !== 1 ? 's' : ''}
            </span>
          </div>
          <div className='flex items-center'>
            <Share2 className='h-4 w-4 mr-1' />
            <span>
              {blog.shares} Share{blog.shares !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      <Link href={`/blogs/${blog.slug || blog.id}`}>
        <Button variant='default' className='bg-orange-500 hover:bg-orange-600'>
          Read More
        </Button>
      </Link>
    </div>
  );
}
