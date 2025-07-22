'use client';
import { DynamicForm, FormConfig } from '@/components/admin-dynamics/form/form';
import { postAndPatch, fetchData, uploadImage } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const BlogForm = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  const [authors, setAuthors] = useState<any[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [seoImage, setSeoImage] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>(
    initialData?.media?.url || ''
  );
  const [seoImagePreview, setSeoImagePreview] = useState<string>(
    initialData?.seo?.media?.url || ''
  );

  useEffect(() => {
    // Fetch authors for dropdown
    fetchData('authors').then((res) => {
      if (res && Array.isArray(res)) setAuthors(res);
      else if (res && res.data) setAuthors(res.data);
    });
  }, []);

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFeaturedImage(file);
      setFeaturedImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSeoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSeoImage(file);
      setSeoImagePreview(URL.createObjectURL(file));
    }
  };

  const config: FormConfig = {
    fields: [
      {
        name: 'title',
        label: 'Blog Title',
        type: 'text',
        placeholder: 'Enter blog title',
        defaultValue: initialData?.title || '',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
      },
      {
        name: 'slug',
        label: 'Slug',
        type: 'text',
        placeholder: 'Enter URL slug (e.g., my-blog-post)',
        defaultValue: initialData?.slug || '',
        required: true,
        validation: {
          pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
        },
        description: 'URL-friendly version of the title (lowercase with hyphens)',
      },
      {
        name: 'description',
        label: 'Short Description',
        type: 'textarea',
        placeholder: 'Enter a brief description',
        defaultValue: initialData?.description || '',
        required: false,
      },
      {
        name: 'subtitle',
        label: 'Subtitle',
        type: 'text',
        placeholder: 'Enter subtitle (optional)',
        defaultValue: initialData?.subtitle || '',
        required: false,
      },
      {
        name: 'authorId',
        label: 'Author',
        type: 'select',
        options: authors.map((author) => ({
          label: author.name,
          value: author.id,
        })),
        defaultValue: initialData?.authorId || undefined,
        required: false,
      },
      {
        name: 'publisher',
        label: 'Publisher',
        type: 'text',
        placeholder: 'Enter publisher name',
        defaultValue: initialData?.publisher || '',
        required: false,
      },
      {
        name: 'isPublished',
        label: 'Published',
        type: 'checkbox',
        defaultValue: Boolean(initialData?.isPublished),
        required: false,
      },
      {
        name: 'content',
        label: 'Blog Content',
        type: 'richtext',
        placeholder: 'Enter blog content',
        defaultValue: initialData?.content || '',
        required: false,
      },
      // SEO Fields
      {
        name: 'seo.metaTitle',
        label: 'SEO Meta Title',
        type: 'text',
        placeholder: 'Enter SEO title',
        defaultValue: initialData?.seo?.metaTitle || '',
        required: false,
      },
      {
        name: 'seo.metaDescription',
        label: 'SEO Meta Description',
        type: 'textarea',
        placeholder: 'Enter SEO description',
        defaultValue: initialData?.seo?.metaDescription || '',
        required: false,
      },
      {
        name: 'seo.metaKeywords',
        label: 'SEO Keywords',
        type: 'text',
        placeholder: 'Enter keywords separated by commas',
        defaultValue: initialData?.seo?.metaKeywords || '',
        required: false,
      },
      {
        name: 'seo.metaCanonical',
        label: 'Canonical URL',
        type: 'text',
        placeholder: 'Enter canonical URL',
        defaultValue: initialData?.seo?.metaCanonical || '',
        required: false,
      },
      {
        name: 'seo.schema',
        label: 'JSON-LD Schema',
        type: 'textarea',
        placeholder: 'Enter JSON-LD schema markup',
        defaultValue: initialData?.seo?.schema || '',
        required: false,
      },
    ],
    submitLabel: initialData ? 'Update Blog' : 'Add Blog',
  };

  // Custom component for media uploads
  const MediaManager = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 mb-6">
        {/* Featured Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Featured Image</h3>
          {featuredImagePreview && (
            <div className="relative w-full h-48">
              <img
                src={featuredImagePreview}
                alt="Featured image preview"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  setFeaturedImage(null);
                  setFeaturedImagePreview('');
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFeaturedImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <p className="text-sm text-gray-500">
            Select an image for the blog featured image
          </p>
        </div>

        {/* SEO Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">SEO Image</h3>
          {seoImagePreview && (
            <div className="relative w-full h-48">
              <img
                src={seoImagePreview}
                alt="SEO image preview"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  setSeoImage(null);
                  setSeoImagePreview('');
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleSeoImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <p className="text-sm text-gray-500">
            Select an image for SEO/social sharing
          </p>
        </div>
      </div>
    );
  };

  async function handleSubmit(data: any) {
    // Process the form data
    const blogData = {
      ...data,
      // Ensure isPublished is a boolean
      isPublished: Boolean(data.isPublished),
      // Handle nested seo object
      seo: {
        metaTitle: data['seo.metaTitle'],
        metaDescription: data['seo.metaDescription'],
        metaKeywords: data['seo.metaKeywords'],
        metaCanonical: data['seo.metaCanonical'],
        schema: data['seo.schema'],
      }
    };

    // Remove the flattened seo fields
    delete blogData['seo.metaTitle'];
    delete blogData['seo.metaDescription'];
    delete blogData['seo.metaKeywords'];
    delete blogData['seo.metaCanonical'];
    delete blogData['seo.schema'];

    // Handle featured image upload
    if (featuredImage) {
      const response = await uploadImage({
        img: featuredImage,
        folder: 'blogs',
        alt: `Featured image for ${data.title}`,
      });
      if (response && response.id) {
        blogData.mediaId = response.id;
      }
    } else if (initialData?.mediaId) {
      blogData.mediaId = initialData.mediaId;
    }

    // Handle SEO image upload
    if (seoImage) {
      const response = await uploadImage({
        img: seoImage,
        folder: 'blogs/seo',
        alt: `SEO image for ${data.title}`,
      });
      if (response && response.id) {
        blogData.seo.mediaId = response.id;
      }
    } else if (initialData?.seo?.mediaId) {
      blogData.seo.mediaId = initialData.seo.mediaId;
    }

    const res = await postAndPatch('blogs', blogData, initialData?.id);
    if (res) {
      router.push('/admin/blogs');
    }
  }

  return (
    <div>
      <DynamicForm config={config} onSubmit={handleSubmit} />
      <MediaManager />
    </div>
  );
};

export default BlogForm; 