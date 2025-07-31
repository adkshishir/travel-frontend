import React from 'react';
import AuthorForm from '../../_components/author-form';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

const EditAuthorPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const author = await fetchData(ENDPOINTS.AUTHORS + '/' + id);

  if (!author) {
    return (
      <div>
        <h1 className='text-2xl font-semibold mb-4 text-red-600'>Author Not Found</h1>
        <p>The author you are trying to edit does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-4'>Edit Author: {author.name}</h1>
      <AuthorForm initialData={author} />
    </div>
  );
};

export default EditAuthorPage; 