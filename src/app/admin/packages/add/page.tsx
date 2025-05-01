import PackageForm from '@/components/package-form';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';

export default async function NewPackagePage() {
  const destinations = await fetchData(ENDPOINTS.DESTINATIONS);
  const formatedDestinations = destinations?.map((destination: any) => ({
    id: destination.id,
    name: destination.name,
  }));
  return (
    <div className='container '>
      <h1 className='text-2xl font-semibold mb-2'>Create New Package</h1>
      <PackageForm destinations={formatedDestinations} />
    </div>
  );
}
