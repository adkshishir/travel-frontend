'use client';
import { DynamicForm, FormConfig } from '@/components/admin-dynamics/form/form';
import ENDPOINTS from '@/utils/endpoints';
import { postAndPatch } from '@/utils/request-intregation';
import React from 'react';
import { useRouter } from 'next/navigation';

const CategoryForm = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  
  const config: FormConfig = {
    fields: [
      {
        name: 'endpoint',
        label: 'Endpoint',
        type: 'text',
        placeholder: 'e.g., about-us, privacy-policy, terms-of-service',
        required: true,
        validation: {
          pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
        },
        defaultValue: initialData?.endpoint || '',
        description: 'URL-friendly identifier for the page (e.g., about-us)',
      },
      {
        name: 'title',
        label: 'Page Title',
        type: 'text',
        placeholder: 'Enter page title',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 200,
        },
        defaultValue: initialData?.title || '',
        description: 'Display title for the page',
      },
      {
        name: 'slug',
        label: 'Slug (Optional)',
        type: 'text',
        placeholder: 'Leave empty to use endpoint as slug',
        required: false,
        validation: {
          pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
        },
        defaultValue: initialData?.slug || '',
        description: 'Alternative URL slug (defaults to endpoint if empty)',
      },
      {
        name: 'content',
        label: 'Page Content',
        type: 'richtext',
        placeholder: 'Enter the page content...',
        required: true,
        defaultValue: initialData?.content || '',
        description: 'Main content of the page (supports HTML)',
      },
      {
        name: 'isActive',
        label: 'Page Status',
        type: 'select',
        options: [
          { value: 'true', label: 'Active (Visible to public)' },
          { value: 'false', label: 'Inactive (Hidden from public)' },
        ],
        required: true,
        defaultValue: initialData?.isActive ? 'true' : 'false',
        description: 'Whether the page is publicly visible',
      },
      // SEO Section
      {
        name: 'seo.metaTitle',
        label: 'Meta Title',
        type: 'text',
        placeholder: 'SEO meta title',
        required: false,
        validation: {
          maxLength: 60,
        },
        defaultValue: initialData?.seo?.metaTitle || '',
        description: 'Title shown in search engines (recommended: 50-60 characters)',
      },
      {
        name: 'seo.metaDescription',
        label: 'Meta Description',
        type: 'textarea',
        placeholder: 'SEO meta description',
        required: false,
        validation: {
          maxLength: 160,
        },
        defaultValue: initialData?.seo?.metaDescription || '',
        description: 'Description shown in search engines (recommended: 150-160 characters)',
      },
      {
        name: 'seo.metaKeywords',
        label: 'Meta Keywords',
        type: 'text',
        placeholder: 'keyword1, keyword2, keyword3',
        required: false,
        defaultValue: initialData?.seo?.metaKeywords || '',
        description: 'Comma-separated keywords for SEO',
      },
    ],
    submitLabel: initialData ? 'Update Category' : 'Create Category',
  };

  const handleSubmit = async (data: any) => {
    try {
      // Handle boolean conversion for isActive
      const processedData = {
        ...data,
        isActive: data.isActive === 'true',
        seo: {
          metaTitle: data['seo.metaTitle'] || '',
          metaDescription: data['seo.metaDescription'] || '',
          metaKeywords: data['seo.metaKeywords'] || '',
        },
      };

      // Remove nested field names
      delete processedData['seo.metaTitle'];
      delete processedData['seo.metaDescription'];
      delete processedData['seo.metaKeywords'];

      const res = await postAndPatch(
        ENDPOINTS.CATEGORIES,
        processedData,
        initialData?.id
      );

      if (res) {
        router.push('/admin/categories');
      }
    } catch (error) {
      console.error('Error submitting category:', error);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">
            {initialData ? 'Edit Category' : 'Create New Category'}
          </h2>
          <p className="text-gray-600 mt-1">
            {initialData 
              ? 'Update the category information below.' 
              : 'Fill in the details to create a new static page category.'
            }
          </p>
        </div>
        
        <div className="p-6">
          <DynamicForm config={config} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CategoryForm; 