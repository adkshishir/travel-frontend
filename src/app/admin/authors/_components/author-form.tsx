'use client';
import { DynamicForm, FormConfig } from '@/components/admin-dynamics/form/form';
import { postAndPatch, uploadImage } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthorForm = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>(
    initialData?.media?.url || ''
  );

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const config: FormConfig = {
    fields: [
      {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter author full name',
        defaultValue: initialData?.name || '',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
      },
      {
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter unique username',
        defaultValue: initialData?.username || '',
        required: true,
        validation: {
          minLength: 3,
          maxLength: 50,
          pattern: '^[a-zA-Z0-9_]+$',
        },
        description: 'Username must contain only letters, numbers, and underscores',
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter email address',
        defaultValue: initialData?.email || '',
        required: true,
        validation: {
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        },
      },
      {
        name: 'bio',
        label: 'Biography',
        type: 'textarea',
        placeholder: 'Enter author biography',
        defaultValue: initialData?.bio || '',
        required: false,
        validation: {
          maxLength: 500,
        },
        description: 'Brief description about the author (max 500 characters)',
      },
      {
        name: 'website',
        label: 'Website URL',
        type: 'text',
        placeholder: 'https://author-website.com',
        defaultValue: initialData?.website || '',
        required: false,
        validation: {
          pattern: '^https?:\\/\\/.+\\..+',
        },
        description: 'Author\'s personal website or portfolio URL',
      },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: [
          { label: 'Author', value: 'author' },
          { label: 'Editor', value: 'editor' },
          { label: 'Contributor', value: 'contributor' },
          { label: 'Guest Writer', value: 'guest' },
        ],
        defaultValue: initialData?.role || 'author',
        required: false,
      },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'Suspended', value: 'suspended' },
        ],
        defaultValue: initialData?.status || 'active',
        required: false,
      },
    ],
    submitLabel: initialData ? 'Update Author' : 'Add Author',
  };

  // Profile Image Manager Component
  const ProfileImageManager = () => {
    return (
      <div className="mt-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Profile Image</h3>
        {profileImagePreview && (
          <div className="relative w-32 h-32 mb-4">
            <img
              src={profileImagePreview}
              alt="Profile image preview"
              className="w-full h-full object-cover rounded-full border-4 border-gray-200"
            />
            <button
              type="button"
              onClick={() => {
                setProfileImage(null);
                setProfileImagePreview('');
              }}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
            >
              ×
            </button>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        <p className="text-sm text-gray-500 mt-2">
          Select a profile image for the author (recommended: 400x400px)
        </p>
      </div>
    );
  };

  async function handleSubmit(data: any) {
    // Process the form data
    const authorData = {
      ...data,
    };

    // Handle profile image upload
    if (profileImage) {
      const response = await uploadImage({
        img: profileImage,
        folder: 'authors',
        alt: `Profile image for ${data.name}`,
      });
      if (response && response.id) {
        authorData.mediaId = response.id;
      }
    } else if (initialData?.mediaId) {
      authorData.mediaId = initialData.mediaId;
    }

    // Handle social links (convert from JSON string if needed)
    if (data.socialLinks && typeof data.socialLinks === 'string') {
      try {
        authorData.socialLinks = JSON.parse(data.socialLinks);
      } catch (error) {
        // If parsing fails, keep as string
        authorData.socialLinks = data.socialLinks;
      }
    }

    const res = await postAndPatch(ENDPOINTS.AUTHORS, authorData, initialData?.id);
    if (res) {
      router.push('/admin/authors');
    }
  }

  return (
    <div className="max-w-4xl">
      <DynamicForm config={config} onSubmit={handleSubmit} />
      <ProfileImageManager />
    </div>
  );
};

export default AuthorForm; 