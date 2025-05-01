import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import Link from 'next/link';
import React from 'react';

const Packages = async () => {
  const result = await fetchData(ENDPOINTS.PACKAGES);
  return (
    <div className='grid gap-4'>
      <Link
        className=' bg-primary text-white w-fit px-4 rounded-sm py-2'
        href={'/admin/packages/add'}>
        Add Package
      </Link>
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.PACKAGES}
        data={result}
        excludeColumns={['id', '_count', 'createdAt', 'seo', 'destination','media']}
        title='Packages'
        EDIT_NAME={'admin/packages'}
      />
    </div>
  );
};

export default Packages;
