export function AboutTeam() {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former backpacker turned entrepreneur with a passion for authentic travel experiences. Has visited 50+ countries across 6 continents.',
      image: '/images/hero.jpg'
    },
    {
      name: 'Miguel Rodriguez',
      role: 'Head of Destinations',
      bio: 'With 15 years in luxury travel planning, Miguel curates our exclusive destination experiences and manages our local guide network.',
      image: '/images/hero.jpg'
    },
    {
      name: 'Aisha Patel',
      role: 'Customer Experience Director',
      bio: 'Former 5-star hotel concierge who ensures every traveler receives personalized attention from booking to return.',
      image: '/images/hero.jpg'
    },
    {
      name: 'David Okafor',
      role: 'Sustainability Officer',
      bio: 'Environmental scientist who ensures our tours maintain ecological integrity while supporting local communities.',
      image: '/images/hero.jpg'
    },
  ];

  return (
    <div className='mb-20'>
      <div className='mx-auto  text-center'>
        <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Meet Our Team
        </h2>
        <p className='mt-4 text-lg text-muted-foreground'>
          Passionate travel experts dedicated to creating your perfect journey
        </p>
      </div>

      <div className='mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {team.map((member, index) => (
          <div
            key={index}
            className='group overflow-hidden rounded-lg border bg-card shadow-sm'>
            <div className='aspect-square overflow-hidden'>
              <img
                src={member.image || '/placeholder.svg'}
                alt={member.name}
                className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <div className='p-4'>
              <h3 className='font-medium'>{member.name}</h3>
              <p className='text-sm text-primary'>{member.role}</p>
              <p className='mt-2 text-sm text-muted-foreground'>{member.bio}</p>
                </div>
                
          </div>
        ))}
      </div>
    </div>
  );
}
