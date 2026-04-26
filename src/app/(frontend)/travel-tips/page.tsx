import Banner from '@/components/banner';
import {
  Plane,
  FileText,
  Shield,
  Backpack,
  CloudSun,
  Activity,
} from 'lucide-react';
import Link from 'next/link';
import getCanonicalUrl from '@/utils/canonical';

export const metadata = {
  title:
    'Nepal Travel Tips | Visa, Insurance, Gear & Packing Guide | Traveltreks',
  description:
    'Complete Nepal travel guide: visa requirements, trekking insurance, packing list, best seasons, altitude sickness prevention, and essential tips for your Himalayan adventure.',
  alternates: { canonical: getCanonicalUrl('/travel-tips') },
  openGraph: {
    title: 'Nepal Travel Tips | Traveltreks',
    description:
      'Visa, insurance, gear list, and everything you need to know before trekking in Nepal.',
    url: getCanonicalUrl('/travel-tips'),
    type: 'website',
    siteName: 'Traveltreks',
  },
};

const sections = [
  {
    id: 'visa',
    icon: FileText,
    title: 'Nepal Visa Requirements',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    content: [
      {
        subtitle: 'Visa on Arrival',
        text: 'Most nationalities can get a Nepal visa on arrival at Tribhuvan International Airport (Kathmandu). The process takes 15–30 minutes.',
      },
      {
        subtitle: 'Visa Fees',
        text: '15 days: USD $30 | 30 days: USD $50 | 90 days: USD $125. Bring exact USD cash or pay by card.',
      },
      {
        subtitle: 'Required Documents',
        text: 'Valid passport (6+ months validity), 2 passport photos, completed arrival form, payment. Some nationalities require a prior visa — check with your nearest Nepal embassy.',
      },
      {
        subtitle: 'TIMS Card',
        text: 'Trekkers Information Management System (TIMS) card is required for all treks. Cost: USD $10–20. We arrange this for you as part of your package.',
      },
    ],
  },
  {
    id: 'insurance',
    icon: Shield,
    title: 'Travel & Trekking Insurance',
    color: 'text-green-600',
    bg: 'bg-green-50',
    content: [
      {
        subtitle: 'Why You Need It',
        text: 'Altitude rescue by helicopter can cost USD $5,000–10,000. Without insurance, this is your personal cost. Never trek in the Himalayas without comprehensive coverage.',
      },
      {
        subtitle: 'What to Look For',
        text: 'Emergency evacuation (helicopter rescue), altitude up to 6,000m, medical treatment abroad, trip cancellation, gear loss. World Nomads and True Traveller are popular choices.',
      },
      {
        subtitle: 'Our Inclusion',
        text: 'All Traveltreks packages include emergency evacuation insurance for your guide and porter. However, you must have your own personal travel insurance.',
      },
    ],
  },
  {
    id: 'gear',
    icon: Backpack,
    title: 'Gear & Packing List',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    content: [
      {
        subtitle: 'Essential Clothing',
        text: 'Moisture-wicking base layers, fleece mid-layer, waterproof jacket, trekking trousers, warm hat, gloves, buff/neck gaiter. Layer system is key.',
      },
      {
        subtitle: 'Footwear',
        text: 'Broken-in waterproof trekking boots (most important!), lightweight camp shoes/sandals, merino wool trekking socks (3+ pairs).',
      },
      {
        subtitle: 'Equipment',
        text: 'Trekking poles (highly recommended), 30–40L daypack, 4–5 season sleeping bag (we provide for camping treks), headlamp with extra batteries, sun protection.',
      },
      {
        subtitle: 'What to Leave Behind',
        text: 'Expensive jewelry, excessive cash, heavy items. You can rent/buy gear in Kathmandu and Pokhara at very reasonable prices.',
      },
    ],
  },
  {
    id: 'seasons',
    icon: CloudSun,
    title: 'Best Time to Trek',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    content: [
      {
        subtitle: 'Spring (March–May) ⭐ Best',
        text: 'Clear skies, blooming rhododendrons, comfortable temperatures (5–20°C at altitude). The most popular season for Travel and Annapurna treks.',
      },
      {
        subtitle: 'Autumn (Sep–Nov) ⭐ Best',
        text: 'Crystal clear mountain views after monsoon, stable weather, ideal temperatures. Slightly busier on popular trails but for good reason.',
      },
      {
        subtitle: 'Winter (Dec–Feb)',
        text: 'Cold but stunning — snow-capped peaks, fewer crowds, and lower prices. Travel is accessible but higher routes may be closed. Best for lower altitude treks.',
      },
      {
        subtitle: 'Monsoon (Jun–Aug)',
        text: 'Heavy rain and leeches on lower trails. Not recommended for most treks, but the Mustang and Dolpo regions (rain shadow) are excellent during monsoon.',
      },
    ],
  },
  {
    id: 'altitude',
    icon: Activity,
    title: 'Altitude Sickness Prevention',
    color: 'text-red-600',
    bg: 'bg-red-50',
    content: [
      {
        subtitle: 'Acclimatization',
        text: '"Trek high, sleep low" is the golden rule. Never ascend more than 500m per day above 3,000m. Always include rest days in your itinerary.',
      },
      {
        subtitle: 'Symptoms to Know',
        text: 'Headache, nausea, fatigue, and shortness of breath are early symptoms of AMS (Acute Mountain Sickness). Tell your guide immediately — never tough it out.',
      },
      {
        subtitle: 'Medications',
        text: 'Diamox (Acetazolamide) is effective for prevention. Consult your doctor before travel. Ibuprofen for headaches. Avoid alcohol and sleeping pills at altitude.',
      },
      {
        subtitle: 'Emergency Protocol',
        text: 'If severe symptoms (confusion, chest tightness, inability to walk straight), immediate descent is mandatory. Our guides are trained in altitude first aid and will arrange evacuation.',
      },
    ],
  },
  {
    id: 'flights',
    icon: Plane,
    title: 'Getting to Nepal',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    content: [
      {
        subtitle: 'Main Airport',
        text: 'Tribhuvan International Airport (KTM) in Kathmandu is the main entry point. Airlines include Qatar Airways, Emirates, Etihad, Turkish Airlines, and Air India.',
      },
      {
        subtitle: 'Domestic Flights',
        text: 'Pokhara (for Annapurna treks) is 25 min by domestic flight from Kathmandu or 7 hrs by bus. We arrange airport transfers and domestic flights.',
      },
      {
        subtitle: 'Arrive Early',
        text: 'Plan at least 1–2 days in Kathmandu before your trek for gear checks, acclimatization, permits, and exploring this incredible city.',
      },
    ],
  },
];

export default function TravelTipsPage() {
  return (
    <main>
      <Banner
        title='Nepal Travel Tips'
        pageName='Travel Tips'
        breadcrumb={[{ name: 'Home', href: '/' }]}
        image='/images/hero.jpg'
      />

      <section className='max-w-[1180px] mx-auto px-4 py-16'>
        {/* Intro */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Everything You Need to Know Before You Go
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            From visa applications to altitude sickness prevention — your
            comprehensive guide to trekking in Nepal.
          </p>
        </div>

        {/* Quick Nav */}
        <div className='flex flex-wrap gap-3 justify-center mb-12'>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className='flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 rounded-full text-sm font-medium transition-colors'>
              <s.icon size={14} />
              {s.title.split('|')[0].trim()}
            </a>
          ))}
        </div>

        {/* Sections */}
        <div className='space-y-12'>
          {sections.map(({ id, icon: Icon, title, color, bg, content }) => (
            <div key={id} id={id} className='scroll-mt-24'>
              <div
                className={`flex items-center gap-3 mb-6 p-4 ${bg} rounded-2xl`}>
                <Icon className={color} size={28} />
                <h3 className={`text-xl font-bold ${color}`}>{title}</h3>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {content.map(({ subtitle, text }) => (
                  <div key={subtitle} className='bg-gray-50 rounded-xl p-5'>
                    <h4 className='font-semibold text-gray-900 mb-2'>
                      {subtitle}
                    </h4>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className='mt-16 text-center bg-gradient-to-br from-primary to-orange-700 rounded-3xl p-12 text-white'>
          <h3 className='text-2xl font-bold mb-4'>Still Have Questions?</h3>
          <p className='text-white/80 mb-8'>
            Our trek experts are available 7 days a week to help you plan the
            perfect Nepal adventure.
          </p>
          <div className='flex flex-wrap gap-4 justify-center'>
            <Link
              href='/contact'
              className='bg-white text-primary font-semibold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors'>
              Ask an Expert
            </Link>
            <Link
              href='/search'
              className='border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors'>
              Browse Packages
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
