'use client';
import {
  DynamicForm,
  type FormConfig,
} from '@/components/admin-dynamics/form/form';
import ENDPOINTS from '@/utils/endpoints';
import { postAndPatch, uploadImage } from '@/utils/request-intregation';
import React from 'react';
import { useRouter } from 'next/navigation';

const DestinationForm = ({
  initialData,
  activities,
}: {
  initialData?: any;
  activities?: any;
}) => {
  const router = useRouter();
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
        name: 'media',
        label: 'Media',
        type: 'file',
        required: false,
      },
      {
        name: 'alt',
        label: 'Alt',
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
        name: 'seomedia',
        label: 'Og Image',
        type: 'file',
        required: false,
      },
      {
        name: 'seomediaAlt',
        label: 'Og Image Alt',
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

  async function handleSubmit(data: any) {
    const { media, seomedia, ...rest } = data;
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
        mediaId: undefined,
      },
    };

    if (media) {
      const response = await uploadImage({
        img: data.media,
        folder: 'destinations',
        alt: data.alt || initialData?.media?.alt,
      });
      if (response) {
        payload.mediaId = response.id || initialData?.mediaId || undefined;
      }
    }
    if (seomedia) {
      const response = await uploadImage({
        img: data.seomedia,
        folder: 'destinations',
        alt: data.seomediaAlt || initialData?.seo?.media?.alt,
      });
      if (response) {
        payload.seo.mediaId =
          response.id || initialData?.seo?.mediaId || undefined;
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
  }
  return (
    <div >
      <h1 className='text-2xl font-semibold mb-2'>{initialData ? 'Edit Destination' : 'Add Destination'}</h1>
      <DynamicForm config={config} onSubmit={handleSubmit} />
    </div>
  );
};

export default DestinationForm;
