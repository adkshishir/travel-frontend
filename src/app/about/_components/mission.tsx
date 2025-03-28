export function AboutMission() {
  return (
    <div className='mb-20'>
      <div className='mx-auto max-w-3xl text-center'>
        <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Our Story
        </h2>
        <p className='mt-4 text-lg text-muted-foreground'>
          Founded with a passion for authentic travel experiences
        </p>
      </div>

      <div className='mt-12 grid gap-8 md:grid-cols-2'>
        <div className='space-y-4'>
          <p className='text-muted-foreground'>
            Wanderlust Expeditions was born from a simple idea: travel should
            transform, inspire, and connect. Our founder, Sarah Chen, spent
            years backpacking across 50+ countries before realizing that the
            most memorable experiences came from authentic connections with
            local cultures and people.
          </p>
          <p className='text-muted-foreground'>
            In 2010, she assembled a team of passionate travelers, local
            experts, and hospitality professionals to create travel experiences
            that go beyond the typical tourist attractions. Our mission is to
            craft journeys that immerse travelers in the heart and soul of each
            destination.
          </p>
          <p className='text-muted-foreground'>
            Today, we've helped over 50,000 travelers experience the world's
            most beautiful destinations through carefully curated packages that
            balance must-see attractions with off-the-beaten-path discoveries.
          </p>
        </div>

        <div className='relative h-[300px] overflow-hidden rounded-lg sm:h-[400px]'>
          <img
            src='/images/hero.jpg'
            alt='Our founder exploring ancient ruins'
            className='h-full w-full object-cover'
          />
        </div>
      </div>
    </div>
  );
}
