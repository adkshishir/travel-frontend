import Banner from '@/components/banner';
import { Shield, Award, Users, Star, MapPin, Clock, HeartHandshake, TreePine } from 'lucide-react';
import Link from 'next/link';
import getCanonicalUrl from '@/utils/canonical';
import JsonLd, { breadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata = {
  title: 'Why Choose Poonhill Treks | Nepal\'s Most Trusted Trekking Company',
  description: 'Discover why 10,000+ trekkers choose Poonhill Treks. Licensed, insured, and locally owned. Expert guides, fair prices, and 15+ years of Himalayan experience.',
  alternates: { canonical: getCanonicalUrl('/why-us') },
  openGraph: {
    title: 'Why Choose Poonhill Treks',
    description: 'Licensed, insured, and locally owned Nepal trekking company with 15+ years of experience.',
    url: getCanonicalUrl('/why-us'),
    type: 'website',
    siteName: 'Poonhill Treks',
  },
};

const stats = [
  { value: '10,000+', label: 'Happy Trekkers', icon: Users },
  { value: '15+', label: 'Years Experience', icon: Clock },
  { value: '4.9★', label: 'Average Rating', icon: Star },
  { value: '50+', label: 'Trek Routes', icon: MapPin },
];

const reasons = [
  {
    icon: Shield,
    title: 'Licensed & Insured',
    desc: 'Officially registered with Nepal Tourism Board (Reg. No. XXXX). All treks include comprehensive travel insurance and emergency evacuation coverage.',
    badge: 'Gov. Certified',
  },
  {
    icon: Award,
    title: 'Expert Local Guides',
    desc: 'Government-licensed trekking guides with 10+ years of field experience, wilderness first aid, and deep knowledge of local culture and terrain.',
    badge: 'Certified Guides',
  },
  {
    icon: Star,
    title: 'Proven Track Record',
    desc: 'Over 10,000 trekkers have trusted us with their Himalayan adventure. Our 4.9★ average rating speaks for itself — verified reviews, no filters.',
    badge: '4.9★ Rating',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Service',
    desc: 'No cookie-cutter tours. Every itinerary is tailored to your fitness level, pace, and interests. Private, small group, and family treks available.',
    badge: 'Custom Treks',
  },
  {
    icon: TreePine,
    title: 'Responsible Tourism',
    desc: 'We follow Leave No Trace principles, pay fair wages to local staff, support teahouse owners, and donate to mountain conservation efforts.',
    badge: 'Eco Certified',
  },
  {
    icon: Users,
    title: 'Local Community Impact',
    desc: '90% of our staff are from trekking communities. Every booking directly supports schools, infrastructure, and livelihoods in mountain villages.',
    badge: 'Community First',
  },
];

const comparisons = [
  { feature: 'Licensed by Nepal Tourism Board', us: true, other: false },
  { feature: 'Local Nepali guides (not sub-contracted)', us: true, other: false },
  { feature: 'No hidden fees or forced shopping stops', us: true, other: false },
  { feature: 'Emergency evacuation insurance included', us: true, other: false },
  { feature: '24/7 WhatsApp support during trek', us: true, other: false },
  { feature: 'Free itinerary customization', us: true, other: false },
  { feature: 'Carbon offset contribution per booking', us: true, other: false },
];

export default function WhyUsPage() {
  return (
    <main>
      <JsonLd schema={breadcrumbSchema([
        { name: 'Home', href: '/' },
        { name: 'Why Choose Us', href: '/why-us' },
      ])} />
      <Banner
        title='Why Choose Us'
        pageName='Why Choose Poonhill Treks'
        breadcrumb={[{ name: 'Home', href: '/' }]}
        image='/images/hero.jpg'
      />

      {/* Stats Bar */}
      <div className='bg-primary'>
        <div className='max-w-[1180px] mx-auto px-4 py-10'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className='text-center text-white'>
                <Icon className='mx-auto mb-2 opacity-80' size={28} />
                <div className='text-3xl font-bold'>{value}</div>
                <div className='text-white/80 text-sm mt-1'>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className='max-w-[1180px] mx-auto px-4 py-16'>
        {/* Reasons Grid */}
        <div className='text-center mb-14'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            6 Reasons to Trek With Us
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            There are hundreds of trekking companies in Nepal. Here is why over 10,000 adventurers have chosen Poonhill Treks for their once-in-a-lifetime experience.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
          {reasons.map(({ icon: Icon, title, desc, badge }) => (
            <div key={title} className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group'>
              <div className='flex items-start justify-between mb-4'>
                <div className='w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors'>
                  <Icon size={22} className='text-primary group-hover:text-white transition-colors' />
                </div>
                <span className='text-xs font-semibold text-primary bg-orange-50 px-3 py-1 rounded-full'>
                  {badge}
                </span>
              </div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>{title}</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className='bg-gray-50 rounded-3xl p-8 md:p-12 mb-16'>
          <h3 className='text-2xl font-bold text-gray-900 mb-8 text-center'>
            Poonhill Treks vs. The Rest
          </h3>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b-2 border-gray-200'>
                  <th className='text-left py-3 text-gray-600 font-medium'>Feature</th>
                  <th className='text-center py-3 text-primary font-bold text-lg'>Poonhill Treks</th>
                  <th className='text-center py-3 text-gray-400 font-medium'>Others</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map(({ feature, us, other }) => (
                  <tr key={feature} className='border-b border-gray-100 hover:bg-white transition-colors'>
                    <td className='py-4 text-gray-700 text-sm'>{feature}</td>
                    <td className='py-4 text-center'>
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${us ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                        {us ? '✓' : '✕'}
                      </span>
                    </td>
                    <td className='py-4 text-center'>
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${other ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                        {other ? '✓' : '✕'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className='text-center bg-gradient-to-br from-primary to-orange-700 rounded-3xl p-12 text-white'>
          <h3 className='text-3xl font-bold mb-4'>Ready to Experience the Difference?</h3>
          <p className='text-white/80 max-w-xl mx-auto mb-8 text-lg'>
            Join thousands of happy trekkers. Browse our packages or speak directly with an expert guide.
          </p>
          <div className='flex flex-wrap gap-4 justify-center'>
            <Link
              href='/search'
              className='bg-white text-primary font-semibold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors'
            >
              Browse All Packages
            </Link>
            <Link
              href='/contact'
              className='border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors'
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
