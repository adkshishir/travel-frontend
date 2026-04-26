import Banner from '@/components/banner';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import Image from 'next/image';
import { Linkedin, Twitter, Facebook, Users } from 'lucide-react';
import getCanonicalUrl from '@/utils/canonical';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = {
  title: 'Meet Our Team | Traveltreks',
  description: 'Meet the expert guides and passionate team behind Traveltreks. Our experienced local team ensures safe, memorable Himalayan adventures.',
  alternates: { canonical: getCanonicalUrl('/team') },
  openGraph: {
    title: 'Meet Our Team | Traveltreks',
    description: 'Meet the expert guides and passionate team behind Traveltreks.',
    url: getCanonicalUrl('/team'),
    type: 'website',
    siteName: 'Traveltreks',
  },
};

export default async function TeamPage() {
  const res = await fetchData(ENDPOINTS.TEAM);
  const team: any[] = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];

  const teamSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Traveltreks',
    member: team.map((m: any) => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.position,
    })),
  };

  return (
    <main>
      <JsonLd schema={teamSchema} />
      <Banner
        title='Meet Our Team'
        pageName='Our Team'
        breadcrumb={[{ name: 'Home', href: '/' }]}
        image='/images/hero.jpg'
      />

      <section className='max-w-[1180px] mx-auto px-4 py-16'>
        {/* Header */}
        <div className='text-center mb-14'>
          <span className='inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-widest uppercase mb-3'>
            <Users size={16} /> The People Behind Your Adventure
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Expert Guides, Passionate Hearts
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            Our team of certified guides and travel experts brings decades of combined experience
            in the Himalayas. Every trek is led by locals who know every trail, village, and secret viewpoint.
          </p>
        </div>

        {/* Team Grid */}
        {team.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {team.map((member: any) => (
              <div
                key={member.id}
                className='bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group'
              >
                <div className='relative h-64 overflow-hidden bg-gray-100'>
                  {member.Media?.original || member.Media?.thumbnail ? (
                    <Image
                      src={member.Media.original || member.Media.thumbnail}
                      alt={member.name}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200'>
                      <span className='text-6xl font-bold text-primary/40'>
                        {member.name?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className='p-5'>
                  <h3 className='text-lg font-bold text-gray-900'>{member.name}</h3>
                  {member.position && (
                    <p className='text-primary text-sm font-medium mt-1'>{member.position}</p>
                  )}
                  {/* Social Links */}
                  <div className='flex gap-3 mt-4'>
                    {member.linkedin && (
                      <a href={member.linkedin} target='_blank' rel='noopener noreferrer'
                        className='text-gray-400 hover:text-blue-600 transition-colors'>
                        <Linkedin size={18} />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target='_blank' rel='noopener noreferrer'
                        className='text-gray-400 hover:text-sky-500 transition-colors'>
                        <Twitter size={18} />
                      </a>
                    )}
                    {member.facebook && (
                      <a href={member.facebook} target='_blank' rel='noopener noreferrer'
                        className='text-gray-400 hover:text-blue-700 transition-colors'>
                        <Facebook size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Placeholder cards when no team data */
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {['Head Guide', 'Trek Leader', 'Operations Manager', 'Customer Relations'].map((role) => (
              <div key={role} className='bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 text-center p-8'>
                <div className='w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <Users size={32} className='text-primary/60' />
                </div>
                <p className='text-gray-400 text-sm'>{role}</p>
                <p className='text-gray-300 text-xs mt-1'>Profile coming soon</p>
              </div>
            ))}
          </div>
        )}

        {/* Values section */}
        <div className='mt-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-10'>
          <h3 className='text-2xl font-bold text-gray-900 mb-8 text-center'>Why Trek With Our Team?</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              { icon: '🏔️', title: 'Local Expertise', desc: 'Born and raised in Nepal, our guides know every trail, village, and weather pattern in the Himalayas.' },
              { icon: '🎓', title: 'Certified & Trained', desc: 'All guides hold government-issued licenses, wilderness first aid certifications, and years of field experience.' },
              { icon: '❤️', title: 'Community First', desc: 'We are committed to supporting local communities, employing local staff, and giving back to mountain villages.' },
            ].map((item) => (
              <div key={item.title} className='text-center'>
                <div className='text-4xl mb-3'>{item.icon}</div>
                <h4 className='font-bold text-gray-900 mb-2'>{item.title}</h4>
                <p className='text-gray-600 text-sm leading-relaxed'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
