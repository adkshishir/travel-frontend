import Banner from '@/components/banner';
import { Navigation } from './_components/navigation';
import { PackageDetails } from './_components/package-details';
import { PackageBooking } from './_components/booking';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { activitySlug, destinationSlug, packageSlug } = await params;
  
  try {
    const response = await fetchData(ENDPOINTS.PACKAGES + '/' + packageSlug);
    const result = response?.package;
    
    // Validate URL structure matches backend data
    if (!result || 
        result.destination?.slug !== destinationSlug || 
        result.destination?.activity?.slug !== activitySlug) {
      return {
        title: 'Package Not Found',
        description: 'The requested package could not be found.',
      };
    }

    const seo = result?.seo || {};
    const title = seo.metaTitle || result?.title || 'Package Details';
    const description = seo.metaDescription || result?.description || 'Explore this amazing package.';
    const keywords = seo.metaKeywords || '';
    const canonical = seo.metaCanonical || '';
    const image = result?.media?.[0]?.thumbnail || result?.seo?.media?.thumbnail || '/images/hero.jpg';
    const url = typeof window !== 'undefined' ? window.location.href : '';
    
    return {
      title,
      description,
      keywords,
      alternates: canonical ? { canonical } : undefined,
      openGraph: {
        title,
        description,
        url: canonical || url,
        type: 'article',
        images: [image],
        siteName: 'Your Site Name',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
      robots: {
        index: true,
        follow: true,
      },
      ...(seo.schema && { other: { 'application/ld+json': seo.schema } }),
    };
  } catch (error) {
    return {
      title: 'Package Not Found',
      description: 'The requested package could not be found.',
    };
  }
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { activitySlug, destinationSlug, packageSlug } = await params;
  
  try {
    const response = await fetchData(ENDPOINTS.PACKAGES + '/' + packageSlug);
    const result = response?.package;

    // Handle case where package is not found
    if (!result) {
      return (
        <main>
          <Banner
            title="Package Not Found"
            image="/images/hero.jpg"
            breadcrumb={[
              { name: 'Home', href: '/' },
              { name: 'Activities', href: '/' },
            ]}
            pageName="Package Not Found"
          />
          <div className='max-w-4xl mx-auto my-16 px-4'>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold mb-4'>Package Not Found</h2>
              <p className='text-gray-600 mb-6'>
                Sorry, we couldn't find the package you're looking for. It may have been moved or deleted.
              </p>
              <a 
                href="/" 
                className='bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors'
              >
                Back to Home
              </a>
            </div>
          </div>
        </main>
      );
    }

    // Validate URL structure matches backend data (soft 404)
    if (result.destination?.slug !== destinationSlug || 
        result.destination?.activity?.slug !== activitySlug) {
      return (
        <main>
          <Banner
            title="Invalid Package URL"
            image="/images/hero.jpg"
            breadcrumb={[
              { name: 'Home', href: '/' },
              { name: 'Activities', href: '/' },
            ]}
            pageName="Invalid URL"
          />
          <div className='max-w-4xl mx-auto my-16 px-4'>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold mb-4'>Invalid Package URL</h2>
              <p className='text-gray-600 mb-6'>
                The URL structure doesn't match the package location. Please check the correct URL.
              </p>
              <div className='space-y-2 mb-6'>
                <p className='text-sm text-gray-500'>
                  Correct URL should be: /{result.destination?.activity?.slug}/{result.destination?.slug}/{result.slug}
                </p>
              </div>
              <div className='flex gap-4 justify-center'>
                <a 
                  href={`/${result.destination?.activity?.slug}/${result.destination?.slug}/${result.slug}`}
                  className='bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors'
                >
                  Go to Correct URL
                </a>
                <a 
                  href="/" 
                  className='bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors'
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </main>
      );
    }

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
              <PackageBooking packageData={result} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Handle network errors or other issues
    return (
      <main>
        <Banner
          title="Error Loading Package"
          image="/images/hero.jpg"
          breadcrumb={[
            { name: 'Home', href: '/' },
            { name: 'Activities', href: '/' },
          ]}
          pageName="Error"
        />
        <div className='max-w-4xl mx-auto my-16 px-4'>
          <div className='text-center'>
            <h2 className='text-2xl font-semibold mb-4'>Error Loading Package</h2>
            <p className='text-gray-600 mb-6'>
              There was an error loading the package. Please try again later.
            </p>
            <a 
              href="/" 
              className='bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors'
            >
              Back to Home
            </a>
          </div>
        </div>
      </main>
    );
  }
}
