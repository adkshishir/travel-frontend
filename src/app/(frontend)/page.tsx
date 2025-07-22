import HeroSection from './_components/hero';
import Activities from './_components/activities';
import AboutSection from './_components/about';
import TopDestination from './_components/top-destination';
import TopPackages from './_components/top-packages';
import Testimonial from './_components/testimonial';
import Destinations from './_components/destinations';
import Faq from './_components/faq';
import Blogs from './_components/blogs';

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

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Activities />
      <AboutSection />
      <TopDestination />
      <TopPackages />
      <Testimonial />
      <Destinations />
      <Faq />
      <Blogs />
    </main>
  );
}
