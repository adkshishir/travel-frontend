import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import P from '../typography/P';
import Link from 'next/link';
type TProps = {
  title: string;
  description: string;
  image: string;
  alt: string;
  slug: string;
};

export default function ActivitiesCard({
  title,
  description,
  image,
  alt,
  slug,
}: TProps) {
  return (
    <Link className='w-full' href={`/${slug}`}>
      <Card className='w-full border border-blue-100 bg-white shadow-sm'>
        <CardContent className='grid  text-center'>
          <Image
            priority={false}
            quality={50}
            src={image || '/images/hero.jpg'}
            alt={alt || `${title} image`}
            width={400}
            height={400}
            className='rounded-xl w-full object-cover'
          />
          <CardTitle className='my-2 text-[24px] font-semibold  text-[#012E41]'>
            {title}
          </CardTitle>
          <P className='max-md:hidden line-clamp-2'>{description}</P>
        </CardContent>
      </Card>
    </Link>
  );
}
