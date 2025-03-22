import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import P from '../typography/P';
type TProps = {
  title: string;
  description: string;
  image: string;
};

export default function ActivitiesCard({ title, description, image }: TProps) {
  return (
    <Card className='w-full  border border-blue-100 bg-white shadow-sm'>
      <CardContent className='flex flex-col items-center p-6 text-center'>
        <div className='mb-4 flex  items-center justify-center rounded-full bg-blue-50'>
          <div className='relative'>
            {/* <Cloud className='h-6 w-6 text-blue-400' /> */}
            <Image
              priority={false}
              quality={50}
              src={image || '/images/hero.jpg'}
              alt={title}
              width={100}
              height={100}
            />
          </div>
        </div>
        <CardTitle className='mb-2 text-[24px] font-semibold  text-[#012E41]'>
          {title}
        </CardTitle>
        {/* <CardDescription className='text-[18px] text-[#012E41] font-normal line-clamp-2'>
          {description}
        </CardDescription> */}
        <P>{description}</P>
      </CardContent>
    </Card>
  );
}
