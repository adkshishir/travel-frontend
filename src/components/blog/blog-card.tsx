import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  image: string;
  category: string;
  date: string;
  title: string;
  href: string;
}

export default function BlogCard({
  image = '/images/hero.jpg',
  category = 'Solo Travel',
  date = 'Sep 19, 2024',
  title = 'The Best Destinations for Memorable Vacations.',
  href = '#',
}: Partial<BlogCardProps>) {
  return (
    <Link
      href={href}
      className='block max-w-sm overflow-hidden transition-all duration-300 rounded-xl hover:shadow-md'>
      <div className='relative aspect-[4/3] w-full overflow-hidden rounded-xl'>
        <Image
          src={image || '/placeholder.svg'}
          alt={title}
          fill
          className='object-cover transition-transform duration-500 hover:scale-105'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='p-4'>
        <div className='flex items-center gap-1 mb-2 text-sm text-gray-600'>
          <span>{category}</span>
          <span className='text-gray-400'>•</span>
          <span>{date}</span>
        </div>
        <h3 className='text-xl font-semibold text-gray-900 leading-tight'>
          {title}
        </h3>
      </div>
    </Link>
  );
}

