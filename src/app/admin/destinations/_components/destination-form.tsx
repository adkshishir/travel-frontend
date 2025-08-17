'use client';
import {
  DynamicForm,
  type FormConfig,
} from '@/components/admin-dynamics/form/form';
import ENDPOINTS from '@/utils/endpoints';
import { postAndPatch, uploadImage } from '@/utils/request-intregation';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImagePreview from '@/components/ui/image-preview';

const DestinationForm = ({
  initialData,
  activities,
}: {
  initialData?: any;
  activities?: any;
}) => {
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
        name: 'activityId',
        label: 'Activity',
        type: 'select',
        placeholder: 'Select activity',
        required: true,
        defaultValue: initialData?.activityId || undefined,
        options: activities, // This would need to be populated with activities from an API call
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
    submitLabel: initialData ? 'Update Destination' : 'Add Destination',
  };

  // You might want to fetch activities to populate the select options
  React.useEffect(() => {
    const fetchActivities = async () => {
      try {
        // This is a placeholder - implement actual API call
        const response = await fetch(ENDPOINTS.ACTIVITIES);
        const activities = await response.json();

        // Update the config with activities options
        const updatedFields = config.fields.map((field) => {
          if (field.name === 'activityId') {
            return {
              ...field,
              options: activities.map((activity: any) => ({
                value: activity.id,
                label: activity.name,
              })),
            };
          }
          return field;
        });

        // Update the config
        config.fields = updatedFields;
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };

    fetchActivities();
  }, []);

  // Image Manager Components
  const ImageManager = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 mb-6">
        {/* Main Image */}
        <ImagePreview
          file={mainImage}
          existingImageUrl={initialData?.media?.url}
          alt="Main destination image"
          onFileChange={setMainImage}
          label="Main Image"
          description="Select an image for the destination (recommended: 1200x800px, max 2MB)"
          disabled={isLoading}
        />

        {/* SEO Image */}
        <ImagePreview
          file={seoImage}
          existingImageUrl={initialData?.seo?.media?.url}
          alt="SEO destination image"
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
      const payload: any = {
        name: data.name || initialData?.name || '',
        slug: data.slug || initialData?.slug || '',
        description: data.description || initialData?.description || '',
        activityId: Number(data.activityId) || initialData?.activityId || 0,
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
          folder: 'destinations',
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
          folder: 'destinations/seo',
          alt: data.seomediaAlt || initialData?.seo?.media?.alt || '',
          showSuccessMessage: false,
        });
        if (response) {
          payload.seo.mediaId = response.id;
        }
      }

      const responseData = await postAndPatch(
        ENDPOINTS.DESTINATIONS,
        payload,
        initialData?.id
      );
      if (responseData) {
        router.push('/admin/destinations');
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
            {initialData ? 'Edit Destination' : 'Create New Destination'}
          </h2>
          <p className="text-gray-600 mt-1">
            {initialData 
              ? 'Update the destination information below.' 
              : 'Fill in the details to create a new destination.'
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
          <p className="text-gray-600 mt-1">Upload images for the destination.</p>
        </div>
        <div className="p-6">
          <ImageManager />
        </div>
      </div>
    </div>
  );
};

export default DestinationForm;
