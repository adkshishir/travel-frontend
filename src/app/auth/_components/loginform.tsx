'use client';
import { DynamicForm, FormConfig } from '@/components/admin-dynamics/form/form';
import ENDPOINTS from '@/utils/endpoints';
import {  postAndPatch } from '@/utils/request-intregation';
import React from 'react';
import { useRouter } from 'next/navigation';

const Auth = () => {
  const router = useRouter();
  const config: FormConfig = {
    fields: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        required: true,
      },
    ],
    submitLabel: 'Sign In',
  };

  async function handleSubmit(data: any) {
    const responseData = await postAndPatch(ENDPOINTS.AUTH, data);
    if (responseData) {
      localStorage.setItem('email', data.email);
      router.push('/auth/verify');
    }
  }
  return (
    <main>
      <div className='flex justify-center h-screen w-full items-center'>
        <DynamicForm config={config} onSubmit={handleSubmit} />
      </div>
    </main>
  );
};

export default Auth;
