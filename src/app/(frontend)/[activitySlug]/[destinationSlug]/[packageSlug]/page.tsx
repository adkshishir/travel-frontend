import Banner from '@/components/banner';
import { Navigation } from './_components/navigation';
import { PackageDetails } from './_components/package-details';
import { PackageBooking } from './_components/booking';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

export default async function Page({ params }: { params: Promise<Params> }) {
  const { activitySlug, destinationSlug, packageSlug } = await params;
  const result = (await fetchData(ENDPOINTS.PACKAGES + '/' + packageSlug))
    ?.package;
  console.log('resutl', result);
  return (
    <div className='min-h-screen  relative'>
      <Banner
        title={result?.title}
        pageName={result?.title}
        breadcrumb={[
          { name: 'Home', href: '/' },
          {
            name: result?.destination?.activity?.name,
            href: `/${activitySlug}`,
          },
          {
            name: result?.destination?.name,
            href: `/${activitySlug}/${destinationSlug}`,
          },
        ]}
        image={
          result?.media?.length > 0
            ? result?.media[0]?.thumbnail
            : '/images/hero.jpg'
        }
      />

      <div className='max-w-[1180px] h-full relative mx-auto max-lg:px-4 py-6'>
        <div className='mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <div className='flex items-center'>
              <div className='mr-auto'>
                <h1 className='text-2xl font-bold text-foreground sm:text-3xl'>
                  {result?.title}
                </h1>
              </div>
              <div className='flex'>
                {[...Array(result?.rating || 4)].map((star, index) => (
                  <svg
                    key={index}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-5 w-5 text-yellow-400'>
                    <path
                      fillRule='evenodd'
                      d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                      clipRule='evenodd'
                    />
                  </svg>
                ))}
              </div>
            </div>

            <Navigation />

            <PackageDetails pack={result} />
          </div>
          {/* Fixed the sticky sidebar by adding proper height constraints and adjusting top position */}
          <div className='lg:col-span-1 '>
            <PackageBooking />
          </div>
        </div>
      </div>
    </div>
  );
}
