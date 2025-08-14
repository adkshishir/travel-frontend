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
      {
        name: 'seo.metaCanonical',
        label: 'Canonical URL',
        type: 'text',
        placeholder: 'https://example.com/canonical-url',
        required: false,
        defaultValue: initialData?.seo?.metaCanonical || '',
        description: 'Canonical URL for this page (optional)',
      },
    ],
    submitLabel: initialData ? 'Update Category' : 'Create Category',
  };

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        endpoint: data.endpoint,
        title: data.title,
        slug: data.slug || data.endpoint, // Use endpoint as slug if slug is empty
        content: data.content,
        isActive: data.isActive === 'true',
        seo: {
          metaTitle: data.seo?.metaTitle || '',
          metaDescription: data.seo?.metaDescription || '',
          metaKeywords: data.seo?.metaKeywords || '',
          metaCanonical: data.seo?.metaCanonical || '',
        },
      };

      const result = await postAndPatch(
        ENDPOINTS.CATEGORIES,
        payload,
        initialData?.id
      );

      if (result) {
        router.push('/admin/categories');
        router.refresh();
      }
    } catch (error) {
      console.error('Error submitting category:', error);
    }
  };

  return (
    <div className=" mx-auto">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">📄 Category Page Guidelines</h3>
        <div className="text-blue-800 text-sm grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-1">Endpoint Examples:</h4>
            <ul className="space-y-1">
              <li>• <code>about-us</code> → /about-us</li>
              <li>• <code>privacy-policy</code> → /privacy-policy</li>
              <li>• <code>terms-of-service</code> → /terms-of-service</li>
              <li>• <code>contact-us</code> → /contact-us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-1">Best Practices:</h4>
            <ul className="space-y-1">
              <li>• Use descriptive, clear titles</li>
              <li>• Keep endpoints URL-friendly (lowercase, hyphens)</li>
              <li>• Add proper SEO metadata</li>
              <li>• Use rich content formatting for better readability</li>
            </ul>
          </div>
        </div>
      </div>
      
      <DynamicForm config={config} onSubmit={onSubmit} />
    </div>
  );
};

export default CategoryForm; 