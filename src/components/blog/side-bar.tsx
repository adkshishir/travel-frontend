import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Sample data for sidebar
const categories = [
  'Destination Guides',
  'Travel Tips & Hacks',
  'Cultural Immersion',
  'Responsible Travel',
  'Business',
  'Entertainment',
];

const recentNews = [
  {
    id: 1,
    title: 'Unveiling the Best Beach Destinations for Relaxation',
    image: '/images/hero.jpg',
    date: '22 Jan 2024',
  },
  {
    id: 2,
    title: 'Indulge in Opulence at These Lavish Destinations',
    image: '/images/hero.jpg',
    date: '07 Jan 2024',
  },
  {
    id: 3,
    title: 'The Best Destinations for Vacations with Kids',
    image: '/images/hero.jpg',
    date: '03 Jan 2024',
  },
];

export default function Sidebar() {
  return (
    <div className='space-y-8'>
      {/* Search */}
      <div className='relative'>
        <Input type='text' placeholder='Search' className='pr-10' />
        <Button
          size='icon'
          variant='default'
          className='absolute right-0 top-0 h-full bg-orange-500 hover:bg-primary rounded-l-none'>
          <Search className='h-4 w-4' />
        </Button>
      </div>

      {/* Categories */}
      <div>
        <h3 className='text-xl font-bold mb-3'>Category</h3>
        <ul className='space-y-2'>
          {categories.map((category) => (
            <li key={category}>
              <a href='#' className='text-slate-700 hover:text-orange-500'>
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent News */}
      <div>
        <h3 className='text-xl font-bold mb-3'>Recent News</h3>
        <div className='space-y-4'>
          {recentNews.map((news) => (
            <div key={news.id} className='flex gap-3'>
              <Image
                src={news.image || '/placeholder.svg'}
                alt={news.title}
                width={80}
                height={60}
                className='w-20 h-16 object-cover rounded'
              />
              <div>
                <h4 className='font-medium text-sm hover:text-orange-500'>
                  <a href='#'>{news.title}</a>
                </h4>
                <p className='text-xs text-slate-500 mt-1'>{news.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
