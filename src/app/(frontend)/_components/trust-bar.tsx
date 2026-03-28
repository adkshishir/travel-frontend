import { Shield, Award, Star, Users, ThumbsUp } from 'lucide-react';

const trustItems = [
  { icon: Users, value: '10,000+', label: 'Happy Trekkers' },
  { icon: Star, value: '4.9★', label: 'Average Rating' },
  { icon: Award, value: '15+ Years', label: 'Experience' },
  { icon: Shield, value: 'Licensed', label: 'Nepal Tourism Board' },
  { icon: ThumbsUp, value: '98%', label: 'Recommend Us' },
];

export default function TrustBar() {
  return (
    <div className='bg-white border-b border-gray-100 shadow-sm'>
      <div className='max-w-[1180px] mx-auto px-4'>
        <div className='flex flex-wrap items-center justify-center md:justify-between divide-y md:divide-y-0 md:divide-x divide-gray-100'>
          {trustItems.map(({ icon: Icon, value, label }) => (
            <div key={label} className='flex items-center gap-3 py-3 px-4 md:px-6'>
              <div className='w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center shrink-0'>
                <Icon size={18} className='text-primary' />
              </div>
              <div>
                <div className='text-base font-bold text-gray-900 leading-none'>{value}</div>
                <div className='text-xs text-gray-500 mt-0.5'>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
