import React from 'react';
import CategoryForm from '../../_components/category-form';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { Params } from 'next/dist/server/request/params';

const EditCategory = async ({ params }: { params: Promise<Params> }) => {
  const { slug } = await params;
  const result = await fetchData(ENDPOINTS.CATEGORIES + '/' + slug);

  if (!result) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-semibold mb-2 text-red-600">Category Not Found</h1>
        <p className="text-gray-600">The category you're trying to edit could not be found.</p>
      </div>
    );
  }

  return (
    <div className=''>
      <h1 className='text-2xl font-semibold mb-2'>Edit Category</h1>
      <p className="text-muted-foreground mb-6">
        Editing: <span className="font-medium">{result.title || result.endpoint}</span>
      </p>
      <CategoryForm initialData={result} />
    </div>
  );
};

export default EditCategory; 