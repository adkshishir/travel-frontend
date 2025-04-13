export function AboutPartners() {
  return (
    <div className='mb-20'>
      <div className='mx-auto max-w-3xl text-center'>
        <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Our Partners
        </h2>
        <p className='mt-4 text-lg text-muted-foreground'>
          We collaborate with the best in the travel industry
        </p>
      </div>

      <div className='mt-12'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          {[1, 2, 3, 4].map((partner) => (
            <div
              key={partner}
              className='flex items-center justify-center py-4'>
              <div className='h-16 w-32 rounded-lg bg-muted/30 p-4'>
                <div className='h-full w-full rounded bg-muted/50'></div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-8 rounded-lg border bg-card p-6 shadow-sm'>
          <h3 className='text-lg font-medium'>Certified Excellence</h3>
          <div className='mt-4 grid gap-4 sm:grid-cols-3'>
            <div className='flex items-center gap-3'>
              <div className='h-12 w-12 rounded-full bg-muted/30'></div>
              <div>
                <p className='font-medium'>Sustainable Tourism</p>
                <p className='text-sm text-muted-foreground'>Gold Certified</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='h-12 w-12 rounded-full bg-muted/30'></div>
              <div>
                <p className='font-medium'>Travel Safety</p>
                <p className='text-sm text-muted-foreground'>A+ Rated</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='h-12 w-12 rounded-full bg-muted/30'></div>
              <div>
                <p className='font-medium'>Customer Satisfaction</p>
                <p className='text-sm text-muted-foreground'>4.9/5 Stars</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
