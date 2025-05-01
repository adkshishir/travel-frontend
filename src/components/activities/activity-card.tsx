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
      <Card className='w-full  border border-blue-100 bg-white shadow-sm'>
        <CardContent className='flex flex-col items-center p-2 text-center'>
          <div className='mb-4 flex  items-center justify-center rounded-full bg-blue-50'>
            <div className='relative'>
              {/* <Cloud className='h-6 w-6 text-blue-400' /> */}
              <Image
                priority={false}
                quality={50}
                src={image || '/images/hero.jpg'}
                alt={alt || `${title} image`}
                width={80}
                height={80}
                className='rounded-xl h-20 w-20 object-cover'
              />
            </div>
          </div>
          <CardTitle className='mb-2 text-[24px] font-semibold  text-[#012E41]'>
            {title}
          </CardTitle>
          {/* <CardDescription className='text-[18px] text-[#012E41] font-normal line-clamp-2'>
          {description}
        </CardDescription> */}
          <P className='max-md:hidden'>{description}</P>
        </CardContent>
      </Card>
    </Link>
  );
}
