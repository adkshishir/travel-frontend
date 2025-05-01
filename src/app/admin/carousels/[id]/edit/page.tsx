import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import { Params } from 'next/dist/server/request/params';
import React from 'react';
import CarouselForm from '../../_components/carousels-form';

const Edit = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
    const result = await fetchData(ENDPOINTS.CAROUSELS + '/getbyid/' + id);
    console.log(result);
  return (
    <div>
      <CarouselForm initialData={result} />
    </div>
  );
};

export default Edit;
