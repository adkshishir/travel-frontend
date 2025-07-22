import React from 'react';
import AuthorForm from '../_components/author-form';

const AddAuthorPage = () => {
  return (
    <div>
      <h1 className='text-2xl font-semibold mb-4'>Add New Author</h1>
      <AuthorForm />
    </div>
  );
};

export default AddAuthorPage; 