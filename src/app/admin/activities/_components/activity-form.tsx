'use client';
import { DynamicForm, FormConfig } from '@/components/admin-dynamics/form/form';
import ENDPOINTS from '@/utils/endpoints';
import { postAndPatch, uploadImage } from '@/utils/request-intregation';
import React from 'react';
import { useRouter } from 'next/navigation';

const ActivityForm = ({ initialData }: { initialData?: any }) => {
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
        name: 'media',
        label: 'Media',
        type: 'file',
        required: false,
      },
      {
        name: 'alt',
        label: 'Alt ',
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
    submitLabel: initialData ? 'Update Activity' : 'Add Activity',
  };
  async function handleSubmit(data: any) {
    const { media, seomedia, ...rest } = data;
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
        mediaId: undefined,
      },
    };

    if (media) {
      const response = await uploadImage({
        img: data.media,
        folder: 'activities',
        alt: data.alt || initialData?.media?.alt,
        showSuccessMessage: false,
      });
      if (response) {
        payload.mediaId = response.id || initialData?.mediaId || undefined;
      }
    }
    if (seomedia) {
      const response = await uploadImage({
        img: data.seomedia,
        folder: 'activities',
        alt: data.seomediaAlt || initialData?.seo?.media?.alt,
        showSuccessMessage: false,
      });
      if (response) {
        payload.seo.mediaId =
          response.id || initialData?.seo?.mediaId || undefined;
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
  }
  return (
    <div>
      <DynamicForm config={config} onSubmit={handleSubmit} />
    </div>
  );
};

export default ActivityForm;
