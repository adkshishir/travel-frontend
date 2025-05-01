import React from 'react';
import Auth from './_components/loginform';
import { getCookie } from '@/utils/cookie-handler';
import { redirect } from 'next/navigation';

const AuthPage = async () => {
  const token = await getCookie('token');
  if (token) {
    redirect('/admin');
  }

  return <Auth />;
};

export default AuthPage;
