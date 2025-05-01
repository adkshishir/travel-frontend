'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { postAndPatch } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { setPersistentCookie } from '@/utils/cookie-handler';

const OtpForm = () => {
  const router = useRouter();
  const [otp, setOtp] = React.useState('');
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = localStorage.getItem('email');
    if (!email) {
      router.push('/auth');
      return;
    }
    if (otp.length === 6) {
      const data = {
        email,
        otp,
      };
      const responseData = await postAndPatch(ENDPOINTS.AUTH_VERIFY, data);
      if (responseData) {
        console.log(responseData);
        localStorage.removeItem('email');
        await setPersistentCookie('token', responseData.token);
        router.push('/auth/login');
      }
    } else {
      toast.error('Please enter a valid OTP');
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='grid justify-center h-screen w-full items-center'>
          <div className='flex flex-col gap-4 border rounded-md p-4'>
            <InputOTP onChange={setOtp} maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button className='cursor-pointer' type='submit'>Verify</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default OtpForm;
