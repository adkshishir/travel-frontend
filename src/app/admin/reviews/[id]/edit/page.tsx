import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import { Params } from 'next/dist/server/request/params';
import React from 'react';
import ReviewForm from '../../components/review-form';

const EditReview = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  const result = await fetchData(ENDPOINTS.REVIEWS + `/${id}`);
  return (
    <div>
      <ReviewForm initialData={result} />
    </div>
  );
};

export default EditReview;
