import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import Link from 'next/link';
import React from 'react';

const ReviewsPage = async () => {
    const reviews = await fetchData(ENDPOINTS.REVIEWS);
    console.log(reviews);
  return (
    <div className='grid gap-4'>
      <Link
        className=' bg-primary text-white w-fit px-4 rounded-sm py-2'
        href={'/admin/reviews/add'}>
        Add Review
      </Link>
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.REVIEWS}
        data={reviews}
        excludeColumns={['id', '_count', 'createdAt', 'package', 'media']}
        title='Reviews'
        EDIT_NAME={'admin/reviews'}
      />
    </div>
  );
};

export default ReviewsPage;
