import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import { Button } from '@/components/ui/button';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import Link from 'next/link';
import React from 'react';

const Activities = async () => {
  const result = await fetchData(ENDPOINTS.ACTIVITIES);
  return (
    <div className='grid gap-4'>
      <Link
        className=' bg-primary text-white w-fit px-4 rounded-sm py-2'
        href={'/admin/activities/add'}>
        Add Activities
      </Link>
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.ACTIVITIES}
        data={result}
        excludeColumns={['id', '_count', 'createdAt', 'updatedAt']}
        title='Activities'
        EDIT_NAME={'admin/activities'}
      />
    </div>
  );
};

export default Activities;
