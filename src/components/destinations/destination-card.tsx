import Image from 'next/image';
import Link from 'next/link';

interface DestinationCardProps {
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
  alt: string;
  activitySlug: string;
}

export default function DestinationCard({
  name = 'Qatar',
  slug = 'qatar',
  description = '196 Place',
  alt = 'Qatar',
  activitySlug = 'qatar',
  imageUrl = '/placeholder.svg?height=60&width=60',
}: DestinationCardProps) {
  return (
    <Link href={`/${activitySlug}/${slug}`} className='flex items-center gap-3 p-3 border rounded-xl lg:max-w-xs w-full'>
      <div className='relative h-14 w-14 rounded-lg overflow-hidden flex-shrink-0'>
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={alt || name}
          fill
          className='object-cover'
        />
      </div>
      <div className='flex flex-col'>
        <h3 className='font-medium text-base'>{name}</h3>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
    </Link>
  );
}
