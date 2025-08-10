'use client';
import {
  DynamicForm,
  type FormConfig,
} from '@/components/admin-dynamics/form/form';
import { postAndPatch, uploadImage } from '@/utils/request-intregation';
import { ErrorHandler } from '@/utils/error-handler';
import { ADMIN_CONFIG } from '@/constants/admin';
import ENDPOINTS from '@/utils/endpoints';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthorForm = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>(
    initialData?.media?.url || ''
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
        description: 'Full name of the author (2-100 characters)',
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
          pattern: ADMIN_CONFIG.VALIDATION_PATTERNS.USERNAME,
        },
        description: ADMIN_CONFIG.COMMON_FIELDS.USERNAME.description,
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter email address',
        defaultValue: initialData?.email || '',
        required: true,
        validation: {
          pattern: ADMIN_CONFIG.VALIDATION_PATTERNS.EMAIL,
        },
        description: ADMIN_CONFIG.COMMON_FIELDS.EMAIL.description,
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
        description: ADMIN_CONFIG.COMMON_FIELDS.DESCRIPTION.description,
      },
      {
        name: 'website',
        label: 'Website URL',
        type: 'text',
        placeholder: 'https://author-website.com',
        defaultValue: initialData?.website || '',
        required: false,
        validation: {
          pattern: ADMIN_CONFIG.VALIDATION_PATTERNS.URL,
        },
        description: ADMIN_CONFIG.COMMON_FIELDS.WEBSITE.description,
      },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        defaultValue: initialData?.role || 'author',
        required: true,
        options: ADMIN_CONFIG.ROLE_OPTIONS.AUTHOR,
        description: 'Select the author\'s role in the system',
      },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        defaultValue: initialData?.status || 'active',
        required: true,
        options: ADMIN_CONFIG.STATUS_OPTIONS.AUTHOR,
        description: 'Current status of the author account',
      },
      {
        name: 'socialLinks',
        label: 'Social Links (JSON)',
        type: 'textarea',
        placeholder: '{"twitter": "https://twitter.com/username", "linkedin": "https://linkedin.com/in/username"}',
        defaultValue: initialData?.socialLinks ? JSON.stringify(initialData.socialLinks, null, 2) : '',
        required: false,
        validation: {
          maxLength: 1000,
        },
        description: 'Social media links in JSON format (optional)',
      },
    ],
    submitLabel: initialData ? 'Update Author' : 'Create Author',
  };

  // Profile Image Manager Component
  const ProfileImageManager = () => {
    return (
      <div className="mt-6 mb-6 p-4 border rounded-md bg-gray-50">
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
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          disabled={isLoading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="text-sm text-gray-500 mt-2">
          Select a profile image for the author (recommended: 400x400px, max 2MB)
        </p>
      </div>
    );
  };

  async function handleSubmit(data: any) {
    setIsLoading(true);
    
    try {
      // Process the form data
      const authorData = {
        ...data,
      };

      // Handle profile image upload
      if (profileImage) {
        const imageResponse = await uploadImage({
          img: profileImage,
          folder: 'authors',
          alt: `Profile image for ${data.name}`,
        });
        
        if (imageResponse && imageResponse.id) {
          authorData.mediaId = imageResponse.id;
        } else {
          ErrorHandler.showWarning('Profile image could not be uploaded, but author data will be saved.');
        }
      } else if (initialData?.mediaId) {
        authorData.mediaId = initialData.mediaId;
      }

      // Handle social links (convert from JSON string if needed)
      if (data.socialLinks && typeof data.socialLinks === 'string') {
        try {
          const parsedLinks = JSON.parse(data.socialLinks);
          authorData.socialLinks = parsedLinks;
        } catch (parseError) {
          ErrorHandler.showWarning('Invalid JSON format for social links. Saving as text.');
          authorData.socialLinks = data.socialLinks;
        }
      }

      const result = await postAndPatch(ENDPOINTS.AUTHORS, authorData, initialData?.id);
      
      if (result) {
        // Delay redirect to show success message
        setTimeout(() => {
          router.push('/admin/authors');
        }, ADMIN_CONFIG.FORM_SETTINGS.SUCCESS_REDIRECT_DELAY);
        return result;
      }
      
      return undefined;
    } catch (error: any) {
      ErrorHandler.handleApiError(error, 'Author Submission');
      return undefined;
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
              : 'Fill in the details to create a new author profile.'
            }
          </p>
        </div>
        
        <div className="p-6">
          <DynamicForm 
            config={config} 
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <ProfileImageManager />
        </div>
      </div>
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700">Processing...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorForm; 