'use client';
import { DynamicForm, FormConfig } from '@/components/admin-dynamics/form/form';
import { postAndPatch, uploadImage } from '@/utils/request-intregation';
import React from 'react';
import { useRouter } from 'next/navigation';

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
        name: 'media',
        label: 'Media',
        type: 'file',
        placeholder: 'Enter media',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
        defaultValue: initialData?.mediaId || '',
      },
      {
        name: 'alt',
        label: 'Alt',
        type: 'text',
        placeholder: 'Enter alt',
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
  async function handleSubmit(data: any) {
    const { media, alt, ...rest } = data;
    if (data.media) {
      const response = await uploadImage({
        img: data.media,
        folder: 'carousels',
        alt: data.alt || initialData?.media?.alt,
      });
      if (response) {
        rest.mediaId = response.id || initialData?.mediaId || undefined;
      }
      const res = await postAndPatch('carousels', rest, initialData?.id);
      if (res) {
        router.push('/admin/carousels');
      }
    }
  }
  return (
    <div>
      <DynamicForm config={formConfig} onSubmit={handleSubmit} />
    </div>
  );
};

export default CarouselForm;
