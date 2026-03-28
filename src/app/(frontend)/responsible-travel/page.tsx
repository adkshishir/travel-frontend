import Banner from '@/components/banner';
import { TreePine, Heart, Recycle, Users, Sun, Mountain } from 'lucide-react';
import Link from 'next/link';
import getCanonicalUrl from '@/utils/canonical';

export const metadata = {
  title: 'Responsible Travel | Sustainable Trekking in Nepal | Poonhill Treks',
  description: 'Learn how Poonhill Treks practices responsible and sustainable tourism. We protect Nepal\'s mountains, support local communities, and minimize environmental impact.',
  alternates: { canonical: getCanonicalUrl('/responsible-travel') },
  openGraph: {
    title: 'Responsible Travel | Poonhill Treks',
    description: 'Sustainable trekking that protects Nepal\'s mountains and supports local communities.',
    url: getCanonicalUrl('/responsible-travel'),
    type: 'website',
    siteName: 'Poonhill Treks',
  },
};

const commitments = [
  {
    icon: TreePine,
    title: 'Leave No Trace',
    color: 'bg-green-100 text-green-700',
    points: [
      'Carry-in, carry-out waste policy on all treks',
      'Biodegradable products only in remote areas',
      'No single-use plastics — reusable bottles provided',
      'Proper waste disposal at every campsite',
    ],
  },
  {
    icon: Users,
    title: 'Support Local Communities',
    color: 'bg-blue-100 text-blue-700',
    points: [
      '90%+ of staff hired from local mountain communities',
      'Accommodation at locally-owned teahouses only',
      'Fair wages exceeding government minimums for all porters',
      'Donations to village schools and infrastructure',
    ],
  },
  {
    icon: Heart,
    title: 'Respect Cultural Heritage',
    color: 'bg-red-100 text-red-700',
    points: [
      'Pre-trek cultural sensitivity briefings for all guests',
      'Permission requested before photographing locals',
      'Dress code guidance for monastery and temple visits',
      'Support for preservation of local traditions and festivals',
    ],
  },
  {
    icon: Recycle,
    title: 'Carbon Footprint Reduction',
    color: 'bg-amber-100 text-amber-700',
    points: [
      'Carbon offset contribution included in every booking',
      'Electric or hybrid vehicles used where available',
      'Digital documents — paperless booking process',
      'Solar-powered equipment on multi-day treks',
    ],
  },
  {
    icon: Mountain,
    title: 'Wildlife & Ecosystem Protection',
    color: 'bg-purple-100 text-purple-700',
    points: [
      'Strict no-disturbance policy in national parks',
      'Avoid fire usage in sensitive alpine zones',
      'Education on local flora, fauna, and conservation',
      'Contributions to snow leopard and red panda conservation funds',
    ],
  },
  {
    icon: Sun,
    title: 'Porter & Guide Welfare',
    color: 'bg-orange-100 text-orange-700',
    points: [
      'Maximum load limits enforced: 25kg per porter',
      'Proper gear and footwear provided to all porters',
      'Porters sleep in same quality accommodation as guests',
      'Medical insurance and emergency evacuation for all staff',
    ],
  },
];

export default function ResponsibleTravelPage() {
  return (
    <main>
      <Banner
        title='Responsible Travel'
        pageName='Responsible Travel'
        breadcrumb={[{ name: 'Home', href: '/' }]}
        image='/images/hero.jpg'
      />

      <section className='max-w-[1180px] mx-auto px-4 py-16'>
        {/* Intro */}
        <div className='text-center mb-16 max-w-3xl mx-auto'>
          <span className='inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-widest uppercase mb-3'>
            <TreePine size={16} /> Our Commitment
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
            Trekking That Gives Back More Than It Takes
          </h2>
          <p className='text-gray-600 text-lg leading-relaxed'>
            The Himalayas are one of Earth&apos;s most precious and fragile ecosystems. We believe adventure travel should leave destinations better than we found them. Every decision we make — from porter pay to waste management — reflects our commitment to people, planet, and sustainable tourism.
          </p>
        </div>

        {/* Commitments Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
          {commitments.map(({ icon: Icon, title, color, points }) => (
            <div key={title} className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow'>
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={22} />
              </div>
              <h3 className='text-lg font-bold text-gray-900 mb-4'>{title}</h3>
              <ul className='space-y-2'>
                {points.map((point) => (
                  <li key={point} className='flex items-start gap-2 text-sm text-gray-600'>
                    <span className='text-green-500 mt-0.5 shrink-0'>✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Porter Rights section */}
        <div className='bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 mb-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
            <div>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>Porter & Guide Rights Matter</h3>
              <p className='text-gray-700 leading-relaxed mb-4'>
                We are proud members of the International Porter Protection Group (IPPG) guidelines. Porters are the backbone of Himalayan trekking — without them, none of this would be possible.
              </p>
              <p className='text-gray-700 leading-relaxed'>
                Every porter we employ receives: appropriate clothing for altitude and weather, proper footwear, emergency evacuation insurance, fair pay above minimum wage, and the same quality of food and accommodation as trekking clients.
              </p>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              {[
                { value: '25 kg', label: 'Max porter load' },
                { value: '100%', label: 'Insured staff' },
                { value: '2x', label: 'Min. wage paid' },
                { value: '0', label: 'Child labor' },
              ].map(({ value, label }) => (
                <div key={label} className='bg-white rounded-2xl p-5 text-center shadow-sm'>
                  <div className='text-2xl font-bold text-primary'>{value}</div>
                  <div className='text-gray-600 text-sm mt-1'>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className='text-center mb-12'>
          <h3 className='text-2xl font-bold text-gray-900 mb-6'>Certifications & Memberships</h3>
          <div className='flex flex-wrap justify-center gap-6'>
            {[
              'Nepal Tourism Board',
              'Trekking Agencies Association of Nepal (TAAN)',
              'Nepal Mountaineering Association',
              'International Porter Protection Group',
            ].map((org) => (
              <div key={org} className='bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 text-sm font-medium text-gray-700'>
                🏅 {org}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className='text-center'>
          <p className='text-gray-600 mb-6 text-lg'>
            Trek with purpose. Every booking supports mountain communities and conservation.
          </p>
          <Link
            href='/search'
            className='inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-orange-700 transition-colors'
          >
            Book a Responsible Trek →
          </Link>
        </div>
      </section>
    </main>
  );
}
