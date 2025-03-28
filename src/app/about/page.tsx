import Banner from '@/components/banner';
import { AboutMission } from './_components/mission';
import { AboutValues } from './_components/values';
import { AboutTeam } from './_components/teams';
import { AboutPartners } from './_components/patners';
import { AboutContact } from './_components/contact';
import { TestimonialCarousel } from '@/components/testimonial/testimonial-carousel';

export default function AboutPage() {
  return (
    <div className='min-h-screen'>
      <Banner
        title='About Us'
        pageName='About Us'
        breadcrumb={[{ name: 'Home', href: '/' }]}
        image='/images/hero.jpg'
      />

      <div className='max-w-[1180px] mx-auto mg-lg:px-4 py-12'>
        <AboutMission />
        <AboutValues />
        <AboutTeam />
        <AboutPartners />
        <TestimonialCarousel />
        <AboutContact />
      </div>
    </div>
  );
}
