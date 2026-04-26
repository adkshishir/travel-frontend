import Banner from '@/components/banner';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { Star, Quote, Users } from 'lucide-react';
import Image from 'next/image';
import getCanonicalUrl from '@/utils/canonical';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = {
  title: 'Trekker Reviews & Testimonials | Traveltreks',
  description:
    'Read genuine reviews from 10,000+ trekkers who explored Nepal with Traveltreks. 4.9★ average rating across Travel, Annapurna, and Himalayan adventures.',
  alternates: { canonical: getCanonicalUrl('/testimonials') },
  openGraph: {
    title: 'Trekker Reviews | Traveltreks',
    description:
      '4.9★ average rating from 10,000+ verified trekkers. Read real Nepal trekking reviews.',
    url: getCanonicalUrl('/testimonials'),
    type: 'website',
    siteName: 'Traveltreks',
  },
};

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className='flex gap-0.5'>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating
              ? 'text-amber-400 fill-amber-400'
              : 'text-gray-200 fill-gray-200'
          }
        />
      ))}
    </div>
  );
}

export default async function TestimonialsPage() {
  const res = await fetchData(ENDPOINTS.REVIEWS + '?limit=50');
  const reviews: any[] = Array.isArray(res?.items)
    ? res.items
    : Array.isArray(res)
      ? res
      : [];

  const avgRating = reviews.length
    ? (
        reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length
      ).toFixed(1)
    : '4.9';

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Traveltreks',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating,
      reviewCount: reviews.length || 1000,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.slice(0, 10).map((r: any) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewBody: r.description,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating || 5,
        bestRating: 5,
      },
    })),
  };

  return (
    <main>
      <JsonLd schema={reviewSchema} />
      <Banner
        title='Trekker Reviews'
        pageName='Testimonials'
        breadcrumb={[{ name: 'Home', href: '/' }]}
        image='/images/hero.jpg'
      />

      <section className='max-w-[1180px] mx-auto px-4 py-16'>
        {/* Summary bar */}
        <div className='bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 mb-16'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            <div>
              <div className='text-5xl font-bold text-primary mb-2'>
                {avgRating}★
              </div>
              <StarRating rating={5} />
              <p className='text-gray-600 text-sm mt-2'>Average Rating</p>
            </div>
            <div>
              <div className='text-5xl font-bold text-gray-900 mb-2'>
                {reviews.length > 100 ? `${reviews.length}+` : '10,000+'}
              </div>
              <div className='flex justify-center'>
                <Users size={20} className='text-primary' />
              </div>
              <p className='text-gray-600 text-sm mt-2'>Happy Trekkers</p>
            </div>
            <div>
              <div className='text-5xl font-bold text-gray-900 mb-2'>98%</div>
              <p className='text-gray-500 text-lg'>🤝</p>
              <p className='text-gray-600 text-sm mt-2'>Would Recommend Us</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {reviews.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {reviews.map((review: any) => (
              <div
                key={review.id}
                className='bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col'>
                <Quote size={24} className='text-primary/20 mb-3' />
                <p className='text-gray-700 text-sm leading-relaxed flex-grow line-clamp-5'>
                  {review.description || 'Amazing experience!'}
                </p>
                <div className='mt-5 pt-4 border-t border-gray-100 flex items-center gap-3'>
                  {review.media?.thumbnail ? (
                    <Image
                      src={review.media.thumbnail}
                      alt={review.name || 'Trekker'}
                      width={44}
                      height={44}
                      className='rounded-full object-cover'
                    />
                  ) : (
                    <div className='w-11 h-11 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center text-primary font-bold shrink-0'>
                      {review.name?.charAt(0) || 'T'}
                    </div>
                  )}
                  <div className='min-w-0'>
                    <div className='font-semibold text-gray-900 text-sm truncate'>
                      {review.name || 'Anonymous Trekker'}
                    </div>
                    {review.title && (
                      <div className='text-xs text-gray-500 truncate'>
                        {review.title}
                      </div>
                    )}
                    <StarRating rating={review.rating || 5} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-12 text-gray-500'>
            <Star size={48} className='mx-auto mb-4 text-amber-300' />
            <p className='text-lg font-medium'>Reviews loading...</p>
            <p className='text-sm'>
              We have 10,000+ happy trekkers — check back soon for their stories
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
