import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import { Params } from 'next/dist/server/request/params';
import React from 'react';
import BlogForm from '../../_components/blog-form';

const EditBlogPage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  const result = await fetchData(`${ENDPOINTS.BLOGS}/${id}`);
  return (
    <div>
      <BlogForm initialData={result} />
    </div>
  );
};

export default EditBlogPage; 