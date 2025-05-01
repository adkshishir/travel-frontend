import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import Link from 'next/link';
import React from 'react';

const Destinations = async () => {
  const result = await fetchData(ENDPOINTS.DESTINATIONS);
  return (
    <div className='grid gap-4'>
      <Link
        className=' bg-primary text-white w-fit px-4 rounded-sm py-2'
        href={'/admin/destinations/add'}>
        Add Destination
      </Link>
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.DESTINATIONS}
        data={result}
        excludeColumns={['id', '_count', 'createdAt', 'seo','activity']}
        title='Destinations'
        EDIT_NAME={'admin/destinations'}
      />
    </div>
  );
};

export default Destinations;
