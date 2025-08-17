'use client';
import { DynamicForm, FormConfig } from '@/components/admin-dynamics/form/form';
import ENDPOINTS from '@/utils/endpoints';
import { postAndPatch, uploadImage } from '@/utils/request-intregation';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImagePreview from '@/components/ui/image-preview';

const ActivityForm = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [seoImage, setSeoImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const config: FormConfig = {
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter name',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        defaultValue: initialData?.name || '',
      },
      {
        name: 'slug',
        label: 'Slug',
        type: 'text',
        placeholder: 'Enter slug',
        required: true,
        validation: {
          pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
        },
        defaultValue: initialData?.slug || '',
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter description',
        required: false,
        defaultValue: initialData?.description || '',
      },
      {
        name: 'alt',
        label: 'Main Image Alt Text',
        type: 'text',
        required: false,
        defaultValue: initialData?.media?.alt || '',
      },
      {
        name: 'metaTitle',
        label: 'Meta Title',
        type: 'text',
        placeholder: 'Enter meta title',
        required: false,
        defaultValue: initialData?.seo?.metaTitle || '',
      },
      {
        name: 'metaKeywords',
        label: 'Meta Keywords',
        type: 'text',
        placeholder: 'Enter meta keywords',
        required: false,
        defaultValue: initialData?.seo?.metaKeywords || '',
      },
      {
        name: 'seomediaAlt',
        label: 'SEO Image Alt Text',
        type: 'text',
        required: false,
        defaultValue: initialData?.seo?.media?.alt || '',
      },
      {
        name: 'metaCanonical',
        label: 'Canonical URL',
        type: 'text',
        placeholder: 'https://example.com/page',
        required: false,
        defaultValue: initialData?.seo?.metaCanonical || '',
      },
      {
        name: 'metaDescription',
        label: 'Meta Description',
        type: 'textarea',
        placeholder: 'Enter meta description',
        required: false,
        defaultValue: initialData?.seo?.metaDescription || '',
      },
      {
        name: 'schema',
        label: 'Schema Markup',
        type: 'textarea',
        placeholder: 'Enter schema JSON-LD',
        required: false,
        defaultValue: initialData?.seo?.schema || '',
      },
    ],
    submitLabel: initialData ? 'Update Activity' : 'Add Activity',
  };

  // Image Manager Components
  const ImageManager = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 mb-6">
        {/* Main Image */}
        <ImagePreview
          file={mainImage}
          existingImageUrl={initialData?.media?.url}
          alt="Main activity image"
          onFileChange={setMainImage}
          label="Main Image"
          description="Select an image for the activity (recommended: 1200x800px, max 2MB)"
          disabled={isLoading}
        />

        {/* SEO Image */}
        <ImagePreview
          file={seoImage}
          existingImageUrl={initialData?.seo?.media?.url}
          alt="SEO activity image"
          onFileChange={setSeoImage}
          label="SEO Image (Open Graph)"
          description="Select an image for social media sharing (recommended: 1200x630px, max 2MB)"
          disabled={isLoading}
        />
      </div>
    );
  };

  async function handleSubmit(data: any) {
    setIsLoading(true);
    try {
      let payload: any = {
        name: data.name || initialData?.name || '',
        slug: data.slug || initialData?.slug || '',
        description: data.description || initialData?.description || '',
        seo: {
          metaTitle: data.metaTitle || initialData?.seo?.metaTitle || '',
          metaKeywords: data.metaKeywords || initialData?.seo?.metaKeywords || '',
          metaCanonical:
            data.metaCanonical || initialData?.seo?.metaCanonical || '',
          metaDescription:
            data.metaDescription || initialData?.seo?.metaDescription || '',
          schema: data.schema || initialData?.seo?.schema || '',
          mediaId: initialData?.seo?.mediaId || undefined,
        },
        mediaId: initialData?.mediaId || undefined,
      };

      // Upload main image if selected
      if (mainImage) {
        const response = await uploadImage({
          img: mainImage,
          folder: 'activities',
          alt: data.alt || initialData?.media?.alt || '',
          showSuccessMessage: false,
        });
        if (response) {
          payload.mediaId = response.id;
        }
      }

      // Upload SEO image if selected
      if (seoImage) {
        const response = await uploadImage({
          img: seoImage,
          folder: 'activities/seo',
          alt: data.seomediaAlt || initialData?.seo?.media?.alt || '',
          showSuccessMessage: false,
        });
        if (response) {
          payload.seo.mediaId = response.id;
        }
      }

      const responseData = await postAndPatch(
        ENDPOINTS.ACTIVITIES,
        payload,
        initialData?.id
      );
      if (responseData) {
        router.push('/admin/activities');
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
            {initialData ? 'Edit Activity' : 'Create New Activity'}
          </h2>
          <p className="text-gray-600 mt-1">
            {initialData 
              ? 'Update the activity information below.' 
              : 'Fill in the details to create a new activity.'
            }
          </p>
        </div>
        
        <div className="p-6">
          <DynamicForm config={config} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Images</h3>
          <p className="text-gray-600 mt-1">Upload images for the activity.</p>
        </div>
        <div className="p-6">
          <ImageManager />
        </div>
      </div>
    </div>
  );
};

export default ActivityForm;
