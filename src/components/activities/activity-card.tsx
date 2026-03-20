import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type TProps = {
  title: string;
  description: string;
  image: string;
  alt: string;
  slug: string;
};

export default function ActivitiesCard({ title, description, image, alt, slug }: TProps) {
  return (
    <Link
      href={`/${slug}`}
      className='group relative overflow-hidden rounded-2xl h-64 w-full block flex-1'>
      <Image
        priority={false}
        quality={75}
        src={image || '/images/hero.jpg'}
        alt={alt || `${title} image`}
        fill
        className='object-cover transition-transform duration-500 group-hover:scale-110'
        sizes='(max-width: 768px) 50vw, 25vw'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent' />
      <div className='absolute bottom-0 left-0 p-5 text-white'>
        <h3 className='text-xl font-bold drop-shadow'>{title}</h3>
        <p className='text-sm text-white/75 mt-1 line-clamp-2 max-md:hidden'>{description}</p>
        <span className='mt-3 inline-flex items-center gap-1 text-sm font-semibold text-orange-400 group-hover:gap-2 transition-all duration-300'>
          Explore <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
