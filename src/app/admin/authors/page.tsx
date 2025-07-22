import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import Link from 'next/link';
import React from 'react';

const Authors = async () => {
  const response = await fetchData(ENDPOINTS.AUTHORS);
  const result = response?.data || [];
  
  return (
    <div className='grid gap-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Authors Management</h1>
        <Link
          className='bg-primary text-white w-fit px-4 rounded-sm py-2 hover:bg-primary/90 transition-colors'
          href={'/admin/authors/add'}>
          Add Author
        </Link>
      </div>
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.AUTHORS}
        data={result}
        excludeColumns={['id', '_count', 'createdAt', 'updatedAt', 'socialLinks', 'media', 'seo']}
        title='Authors'
        EDIT_NAME={'admin/authors'}
      />
    </div>
  );
};

export default Authors; 