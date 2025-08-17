'use client';
import { DynamicForm, FormConfig } from '@/components/admin-dynamics/form/form';
import { postAndPatch, uploadImage } from '@/utils/request-intregation';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImagePreview from '@/components/ui/image-preview';

export type TCarousel = {
  id: number;
  title: string;
  description: string;
  subtitle: string;
  link: string;
  page: string;
  createdAt: string;
  updatedAt: string;
  mediaId: number;
  media: {
    id: number;
    url: string;
    alt: string;
    createdAt: string;
    updatedAt: string;
  };
};

const CarouselForm = ({
  initialData,
}: {
  initialData?: TCarousel | undefined;
}) => {
  const router = useRouter();
  const [carouselImage, setCarouselImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formConfig: FormConfig = {
    fields: [
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Enter title',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        defaultValue: initialData?.title || '',
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
        placeholder: 'Enter description',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        defaultValue: initialData?.description || '',
      },
      {
        name: 'subtitle',
        label: 'Subtitle',
        type: 'text',
        placeholder: 'Enter subtitle',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        defaultValue: initialData?.subtitle || '',
      },
      {
        name: 'link',
        label: 'Link',
        type: 'text',
        placeholder: 'Enter link',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        defaultValue: initialData?.link || '',
      },
      {
        name: 'page',
        label: 'Page',
        type: 'text',
        placeholder: 'Enter page',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        defaultValue: initialData?.page || '',
      },
      {
        name: 'alt',
        label: 'Image Alt Text',
        type: 'text',
        placeholder: 'Enter alt text',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        defaultValue: initialData?.media?.alt || '',
      },
    ],
    submitLabel: initialData ? 'Update' : 'Create',
  };

  // Image Manager Component
  const ImageManager = () => {
    return (
      <div className="mt-6 mb-6">
        <ImagePreview
          file={carouselImage}
          existingImageUrl={initialData?.media?.url}
          alt="Carousel image"
          onFileChange={setCarouselImage}
          label="Carousel Image"
          description="Select an image for the carousel (recommended: 1920x1080px, max 2MB)"
          disabled={isLoading}
          required={!initialData} // Required for new carousels, optional for updates
        />
      </div>
    );
  };

  async function handleSubmit(data: any) {
    setIsLoading(true);
    try {
      const payload = { ...data };

      // Upload image if selected
      if (carouselImage) {
        const response = await uploadImage({
          img: carouselImage,
          folder: 'carousels',
          alt: data.alt || initialData?.media?.alt || '',
          showSuccessMessage: false,
        });
        if (response) {
          payload.mediaId = response.id;
        }
      } else if (initialData?.mediaId) {
        // Keep existing image if no new image is selected
        payload.mediaId = initialData.mediaId;
      }

      // Remove alt from payload as it's handled in the image upload
      delete payload.alt;

      const res = await postAndPatch('carousels', payload, initialData?.id);
      if (res) {
        router.push('/admin/carousels');
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
            {initialData ? 'Edit Carousel' : 'Create New Carousel'}
          </h2>
          <p className="text-gray-600 mt-1">
            {initialData 
              ? 'Update the carousel information below.' 
              : 'Fill in the details to create a new carousel item.'
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
          <p className="text-gray-600 mt-1">Upload an image for the carousel.</p>
        </div>
        <div className="p-6">
          <ImageManager />
        </div>
      </div>
    </div>
  );
};

export default CarouselForm;
