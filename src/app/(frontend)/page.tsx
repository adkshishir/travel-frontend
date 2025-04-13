import HeroSection from './_components/hero';
import Activities from './_components/activities';
import AboutSection from './_components/about';
import TopDestination from './_components/top-destination';
import TopPackages from './_components/top-packages';
import Testimonial from './_components/testimonial';
import Destinations from './_components/destinations';
import Faq from './_components/faq';
import Blogs from './_components/blogs';

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
