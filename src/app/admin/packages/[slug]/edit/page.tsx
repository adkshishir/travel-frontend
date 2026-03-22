import PackageForm from '@/components/package-form';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';

export default async function EditPackagePage({ params }: any) {
  const {slug} =await params
  const packageData = (await fetchData(ENDPOINTS.PACKAGES+'/' + slug))?.package;
  const destinationsRes = await fetchData(ENDPOINTS.DESTINATIONS);
  const destinations = destinationsRes?.items || [];
  const formatedDestinations = destinations?.map((destination: any) => ({
    id: destination.id,
    name: destination.name,
  }));
  return (
    <div className='container '>
      <h1 className='text-2xl font-semibold mb-2'>Edit Package</h1>
      <PackageForm
        initialData={packageData}
        destinations={formatedDestinations}
      />
    </div>
  );
}
