import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import Link from 'next/link';
import React from 'react';

const CarouselsPage = async () => {
  const resultRes = await fetchData(ENDPOINTS.CAROUSELS);
  const result = resultRes?.items || [];
  return (
    <div className='grid gap-4'>
      <Link
        className=' bg-primary text-white w-fit px-4 rounded-sm py-2'
        href={'/admin/carousels/add'}>
        Add Carousel
      </Link>
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.CAROUSELS}
        data={result}
        title='Carousels'
        excludeColumns={['id', '_count', 'createdAt', 'updatedAt']}
        EDIT_NAME={'admin/carousels'}
      />
    </div>
  );
};

export default CarouselsPage;
