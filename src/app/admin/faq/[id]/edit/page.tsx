import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import { Params } from 'next/dist/server/request/params';
import React from 'react';
import FaqForm from '../../_components/faq-form';

const EditPage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  const result = await fetchData(`${ENDPOINTS.FAQ}/${id}`);
  return (
    <div>
      <FaqForm initialData={result} />
    </div>
  );
};

export default EditPage;
