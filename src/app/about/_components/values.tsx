import { Compass, Heart, Shield, Users } from 'lucide-react';

export function AboutValues() {
  const values = [
    {
      icon: Compass,
      title: 'Authentic Experiences',
      description:
        'We believe travel should be transformative. Our packages focus on authentic cultural immersion and meaningful connections with local communities.',
    },
    {
      icon: Shield,
      title: 'Responsible Tourism',
      description:
        "We're committed to sustainable travel practices that respect local environments and benefit local communities through ethical partnerships.",
    },
    {
      icon: Users,
      title: 'Personal Touch',
      description:
        'Every itinerary is crafted with care by our expert team. We limit group sizes and customize experiences to ensure personalized service.',
    },
    {
      icon: Heart,
      title: 'Passion for Excellence',
      description:
        "Our team's passion for travel excellence shows in every detail, from handpicked accommodations to unique cultural experiences.",
    },
  ];

  return (
    <div className='mb-20'>
      <div className='mx-auto max-w-3xl text-center'>
        <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Our Values
        </h2>
        <p className='mt-4 text-lg text-muted-foreground'>
          The principles that guide every journey we create
        </p>
      </div>

      <div className='mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {values.map((value, index) => (
          <div key={index} className='rounded-lg border bg-card p-6 shadow-sm'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
              <value.icon className='h-6 w-6' />
            </div>
            <h3 className='mt-4 text-lg font-medium'>{value.title}</h3>
            <p className='mt-2 text-sm text-muted-foreground'>
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
