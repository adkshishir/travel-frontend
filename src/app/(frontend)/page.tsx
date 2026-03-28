export const revalidate = 3600; // Revalidate every 1 hour

import HeroSection from './_components/hero';
import TrustBar from './_components/trust-bar';
import Activities from './_components/activities';
import AboutSection from './_components/about';
import TopDestination from './_components/top-destination';
import TopPackages from './_components/top-packages';
import Testimonial from './_components/testimonial';
import Destinations from './_components/destinations';
import Faq from './_components/faq';
import Blogs from './_components/blogs';
import NewsletterSection from './_components/newsletter-section';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = {
  title: 'Poon Hill Trekking & Tours | Best Nepal Trekking Packages',
  description: 'Discover the best trekking and tour packages in Nepal, including the famous Poon Hill trek. Book your adventure with local experts and enjoy breathtaking Himalayan views, cultural experiences, and more.',
  keywords: 'poon hill, trekking, nepal, tours, hiking, ghorepani, annapurna, adventure, himalayas',
  alternates: { canonical: 'https://poonhill.com/' },
  openGraph: {
    title: 'Poon Hill Trekking & Tours | Best Nepal Trekking Packages',
    description: 'Discover the best trekking and tour packages in Nepal, including the famous Poon Hill trek. Book your adventure with local experts and enjoy breathtaking Himalayan views, cultural experiences, and more.',
    url: 'https://poonhill.com/',
    type: 'website',
    images: ['/images/hero.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poon Hill Trekking & Tours | Best Nepal Trekking Packages',
    description: 'Discover the best trekking and tour packages in Nepal, including the famous Poon Hill trek. Book your adventure with local experts and enjoy breathtaking Himalayan views, cultural experiences, and more.',
    images: ['/images/hero.jpg'],
  },
  // Optionally add schema here
};

export default async function Home() {
  const carouselsRes = await fetchData(ENDPOINTS.CAROUSELS + '/home');
  const carousels = Array.isArray(carouselsRes) ? carouselsRes : carouselsRes?.items || [];
  const siteInfo = await fetchData(ENDPOINTS.SITE_INFO);

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Poon Hill Trekking & Tours | Best Nepal Trekking Packages',
    description: 'Discover the best trekking and tour packages in Nepal. Expert-led Poon Hill, Annapurna, and Himalayan treks.',
    url: 'https://poonhill.com',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://poonhill.com' }],
    },
  };

  return (
    <main>
      <JsonLd schema={homeSchema} />
      <HeroSection carousels={carousels} siteInfo={siteInfo} />
      <TrustBar />
      <Activities />
      <AboutSection />
      <TopDestination />
      <TopPackages />
      <Testimonial />
      <Destinations />
      <Faq />
      <NewsletterSection />
      <Blogs />
    </main>
  );
}
