import Image from 'next/image';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatarUrl: string;
}

export default function TestimonialCard({
  quote = "As a seasoned traveler, I can confidently say that Tourica is one of the best travel agencies I've had the pleasure of working.",
  name = 'John Snow',
  role = 'Customer',
  rating = 5,
  avatarUrl = '/placeholder.svg?height=40&width=40',
}: TestimonialCardProps) {
  return (
    <div className='max-w-md bg-white rounded-xl p-6 shadow-sm'>
      {/* Quote */}
      <p className='text-gray-700 mb-3'>
        {quote.includes('pleasure') ? (
          <>
            {quote.split('pleasure')[0]}
            pleasure
            <span className='inline-block ml-1 text-pink-500'>❤</span>
            {quote.split('pleasure')[1]}
          </>
        ) : (
          quote
        )}
      </p>

      {/* Star Rating */}
      <div className='flex mb-4'>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }
          />
        ))}
      </div>

      {/* Author Info */}
      <div className='flex items-center'>
        <div className='relative h-10 w-10 rounded-full overflow-hidden mr-3'>
          <Image
            src={avatarUrl || '/placeholder.svg'}
            alt={name}
            fill
            className='object-cover'
          />
        </div>
        <div>
          <h4 className='font-medium text-gray-900'>{name}</h4>
          <p className='text-sm text-gray-500'>{role}</p>
        </div>
      </div>
    </div>
  );
}
