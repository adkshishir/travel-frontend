'use client';
import { DynamicForm, FormConfig } from '@/components/admin-dynamics/form/form';
import { postAndPatch, uploadImage } from '@/utils/request-intregation';
import React from 'react';
import { useRouter } from 'next/navigation';

const ReviewForm = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  const formConfig: FormConfig = {
    fields: [
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        defaultValue: initialData?.title || '',
        placeholder: 'Enter title',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
      },

      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter name',
        required: true,
        defaultValue: initialData?.name || '',
        validation: {
          minLength: 2,
          maxLength: 100,
        },
      },
      {
        name: 'rating',
        label: 'Rating',
        type: 'number',
        placeholder: 'Enter rating',
        required: true,
        defaultValue: initialData?.rating || '',
        validation: {
          min: 1,
          max: 5,
        },
      },
      //   {
      //     name: 'packageId',
      //     label: 'Package ID',
      //       type: 'number',
      //     defaultValue: initialData?.packageId || '',
      //     placeholder: 'Enter package ID',
      //     required: true,
      //     validation: {
      //       min: 1,
      //     },
      //   },
      {
        name: 'media',
        label: 'Image',
        type: 'file',
        placeholder: 'Upload image',
        required: false,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        defaultValue: initialData?.description || '',
        placeholder: 'Enter description',
        required: false,
        validation: {
          minLength: 2,
          maxLength: 400,
        },
      },
    ],
    submitLabel: initialData ? 'Update' : 'Create',
  };

  async function handleSubmit(data: any) {
    const { media, ...rest } = data;
    if (data.media) {
      const response = await uploadImage({
        img: data.media,
        folder: 'reviews',
        alt: data.alt || initialData?.media?.alt,
        showSuccessMessage: false,
      });
      if (response) {
        rest.mediaId = response.id || initialData?.mediaId || undefined;
      }
    }
    const res = await postAndPatch('reviews', rest, initialData?.id);
    if (res) {
      router.push('/admin/reviews');
    }
  }
  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">
            {initialData ? 'Edit Review' : 'Create New Review'}
          </h2>
          <p className="text-gray-600 mt-1">
            {initialData 
              ? 'Update the review information below.' 
              : 'Fill in the details to create a new review.'
            }
          </p>
        </div>
        
        <div className="p-6">
          <DynamicForm config={formConfig} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
