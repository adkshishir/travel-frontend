'use client';
import { DynamicForm, FormConfig } from '@/components/admin-dynamics/form/form';
import { postAndPatch, uploadImage } from '@/utils/request-intregation';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImagePreview from '@/components/ui/image-preview';

const AuthorForm = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<File | null>(null);
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
        name: 'bio',
        label: 'Bio',
        type: 'textarea',
        placeholder: 'Enter bio',
        required: false,
        defaultValue: initialData?.bio || '',
      },
      {
        name: 'designation',
        label: 'Designation',
        type: 'text',
        placeholder: 'Enter designation',
        required: false,
        defaultValue: initialData?.designation || '',
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email',
        required: false,
        defaultValue: initialData?.email || '',
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter phone',
        required: false,
        defaultValue: initialData?.phone || '',
      },
      {
        name: 'website',
        label: 'Website',
        type: 'text',
        placeholder: 'Enter website',
        required: false,
        defaultValue: initialData?.website || '',
      },
      {
        name: 'facebook',
        label: 'Facebook',
        type: 'text',
        placeholder: 'Enter Facebook URL',
        required: false,
        defaultValue: initialData?.facebook || '',
      },
      {
        name: 'twitter',
        label: 'Twitter',
        type: 'text',
        placeholder: 'Enter Twitter URL',
        required: false,
        defaultValue: initialData?.twitter || '',
      },
      {
        name: 'instagram',
        label: 'Instagram',
        type: 'text',
        placeholder: 'Enter Instagram URL',
        required: false,
        defaultValue: initialData?.instagram || '',
      },
      {
        name: 'linkedin',
        label: 'LinkedIn',
        type: 'text',
        placeholder: 'Enter LinkedIn URL',
        required: false,
        defaultValue: initialData?.linkedin || '',
      },

    ],
    submitLabel: initialData ? 'Update Author' : 'Create Author',
  };

  // Profile Image Manager Component using the new ImagePreview component
  const ProfileImageManager = () => {
    return (
      <div className="mt-6 mb-6">
        <ImagePreview
          file={profileImage}
          existingImageUrl={initialData?.media?.url}
          alt="Profile image"
          onFileChange={setProfileImage}
          label="Profile Image"
          description="Select a profile image for the author (recommended: 400x400px, max 2MB)"
          disabled={isLoading}
          variant="circular"
        />
      </div>
    );
  };

  async function handleSubmit(data: any) {
    setIsLoading(true);
    try {
      const payload = { ...data };

      // Upload profile image if selected
      if (profileImage) {
        const response = await uploadImage({
          img: profileImage,
          folder: 'authors',
          alt: `Profile image for ${data.name}`,
          showSuccessMessage: false,
        });
        if (response) {
          payload.mediaId = response.id;
        }
      } else if (initialData?.mediaId) {
        // Keep existing image if no new image is selected
        payload.mediaId = initialData.mediaId;
      }

      const responseData = await postAndPatch(
        'authors',
        payload,
        initialData?.id
      );
      if (responseData) {
        router.push('/admin/authors');
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
            {initialData ? 'Edit Author' : 'Create New Author'}
          </h2>
          <p className="text-gray-600 mt-1">
            {initialData 
              ? 'Update the author information below.' 
              : 'Fill in the details to create a new author.'
            }
          </p>
        </div>
        
        <div className="p-6">
          <DynamicForm config={config} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Profile Image</h3>
          <p className="text-gray-600 mt-1">Upload a profile image for the author.</p>
        </div>
        <div className="p-6">
          <ProfileImageManager />
        </div>
      </div>
    </div>
  );
};

export default AuthorForm; 