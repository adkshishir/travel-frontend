import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import Link from 'next/link';
import React from 'react';

const Blogs = async () => {
  const response = await fetchData(ENDPOINTS.BLOGS);
  const result = response?.data || [];
  
  return (
    <div className='grid gap-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Blogs Management</h1>
        <Link
          className='bg-primary text-white w-fit px-4 rounded-sm py-2 hover:bg-primary/90 transition-colors'
          href={'/admin/blogs/add'}>
          Add Blog
        </Link>
      </div>
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.BLOGS}
        data={result}
        excludeColumns={['id', '_count', 'createdAt', 'updatedAt', 'content', 'seo']}
        title='Blogs'
        EDIT_NAME={'admin/blogs'}
      />
    </div>
  );
};

export default Blogs; 