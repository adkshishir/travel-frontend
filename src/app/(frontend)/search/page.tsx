import Banner from '@/components/banner';
import SearchResults from './_components/search-results';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import getCanonicalUrl from '@/utils/canonical';

export const metadata = {
  title: 'Search Trekking Packages | Nepal Treks & Tours | Traveltreks',
  description: 'Search and filter Nepal trekking packages by activity, duration, budget, and difficulty. Find the perfect Himalayan adventure for your group.',
  alternates: { canonical: getCanonicalUrl('/search') },
  openGraph: {
    title: 'Search Nepal Trekking Packages | Traveltreks',
    description: 'Filter by activity, duration, budget and difficulty to find your perfect Nepal trek.',
    url: getCanonicalUrl('/search'),
    type: 'website',
    siteName: 'Traveltreks',
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const activitiesRes = await fetchData(ENDPOINTS.ACTIVITIES);
  const activities = Array.isArray(activitiesRes?.items)
    ? activitiesRes.items
    : Array.isArray(activitiesRes)
    ? activitiesRes
    : [];

  return (
    <main>
      <Banner
        title='Find Your Perfect Trek'
        pageName='Search Packages'
        breadcrumb={[{ name: 'Home', href: '/' }]}
        image='/images/hero.jpg'
      />
      <SearchResults activities={activities} initialParams={params} />
    </main>
  );
}
