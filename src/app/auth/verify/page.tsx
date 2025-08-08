import React from 'react';
import OtpForm from '../_components/otp-form';
import { getCookie } from '@/utils/cookie-handler';
import { redirect } from 'next/navigation';

const VerifyPage = async () => {
  const token = await getCookie('token');
  if (token) {
    redirect('/admin');
  }

  return <OtpForm />;
};

export default VerifyPage;