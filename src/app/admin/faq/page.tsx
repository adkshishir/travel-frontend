import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import Link from 'next/link';
import React from 'react';

const Faq = async () => {
  const resultRes = await fetchData(ENDPOINTS.FAQ);
  const result = resultRes?.items || [];
  return (
    <div className='grid gap-4'>
      <Link
        className=' bg-primary text-white w-fit px-4 rounded-sm py-2'
        href={'/admin/faq/add'}>
        Add Faq
      </Link>
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.FAQ}
        data={result}
        excludeColumns={['id', '_count', 'createdAt', 'updatedAt']}
        title='Faq'
        EDIT_NAME={'admin/faq'}
      />
    </div>
  );
};

export default Faq;
