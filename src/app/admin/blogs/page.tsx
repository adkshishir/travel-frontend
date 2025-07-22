import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import Link from 'next/link';
import React from 'react';

const Blogs = async () => {
  const result = await fetchData(ENDPOINTS.BLOGS);
  return (
    <div className='grid gap-4'>
      <Link
        className='bg-primary text-white w-fit px-4 rounded-sm py-2'
        href={'/admin/blogs/add'}>
        Add Blog
      </Link>
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