'use client';
import { DynamicForm, FormConfig } from '@/components/admin-dynamics/form/form';
import { postAndPatch, uploadImage } from '@/utils/request-intregation';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImagePreview from '@/components/ui/image-preview';

const ReviewForm = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  // Image Manager Component
  const ImageManager = () => {
    return (
      <div className="mt-6 mb-6">
        <ImagePreview
          file={reviewImage}
          existingImageUrl={initialData?.media?.url}
          alt="Review image"
          onFileChange={setReviewImage}
          label="Review Image"
          description="Select an image for the review (optional, max 2MB)"
          disabled={isLoading}
        />
      </div>
    );
  };

  async function handleSubmit(data: any) {
    setIsLoading(true);
    try {
      const payload = { ...data };

      // Upload image if selected
      if (reviewImage) {
        const response = await uploadImage({
          img: reviewImage,
          folder: 'reviews',
          alt: data.alt || initialData?.media?.alt || `Review image for ${data.title}`,
          showSuccessMessage: false,
        });
        if (response) {
          payload.mediaId = response.id;
        }
      } else if (initialData?.mediaId) {
        // Keep existing image if no new image is selected
        payload.mediaId = initialData.mediaId;
      }

      const res = await postAndPatch('reviews', payload, initialData?.id);
      if (res) {
        router.push('/admin/reviews');
      }
    } finally {
      setIsLoading(false);
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
          <DynamicForm config={formConfig} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Image</h3>
          <p className="text-gray-600 mt-1">Upload an optional image for the review.</p>
        </div>
        <div className="p-6">
          <ImageManager />
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
