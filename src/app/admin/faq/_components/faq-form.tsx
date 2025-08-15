'use client';
import { DynamicForm, FormConfig } from '@/components/admin-dynamics/form/form';
import { postAndPatch } from '@/utils/request-intregation';
import React from 'react';
import { useRouter } from 'next/navigation';
const FaqForm = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  const config: FormConfig = {
    fields: [
      {
        name: 'question',
        label: 'Question',
        type: 'text',
        placeholder: 'Enter question',
        defaultValue: initialData?.question || '',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
      },
      {
        name: 'answer',
        label: 'Answer',
        type: 'text',
        placeholder: 'Enter answer',
        required: true,
        defaultValue: initialData?.answer || '',
        validation: {
          minLength: 2,
          maxLength: 100,
        },
      },
    ],
    submitLabel: initialData?.question ? 'Update Faq' : 'Add Faq',
  };
  async function handleSubmit(data: any) {
    const res = await postAndPatch('faqs', data, initialData?.id);
    if (res) {
      router.push('/admin/faq');
    }
  }
  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">
            {initialData ? 'Edit FAQ' : 'Create New FAQ'}
          </h2>
          <p className="text-gray-600 mt-1">
            {initialData 
              ? 'Update the FAQ information below.' 
              : 'Fill in the details to create a new FAQ entry.'
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

export default FaqForm;
