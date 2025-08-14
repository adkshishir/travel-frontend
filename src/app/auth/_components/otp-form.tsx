'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, CheckCircle, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { postAndPatch } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { setPersistentCookie } from '@/utils/cookie-handler';

const OtpForm = () => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (!storedEmail) {
      router.push('/auth');
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!email) {
      router.push('/auth');
      return;
    }

    if (otp.length !== 6) {
      setSubmitStatus('error');
      setErrorMessage('Please enter all 6 digits');
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const data = { email, otp };
      const responseData = await postAndPatch(ENDPOINTS.AUTH_VERIFY, data);
      
      if (responseData && responseData.token) {
        setSubmitStatus('success');
        localStorage.removeItem('email');
        await setPersistentCookie('token', responseData.token);
        // toast.success('Login successful! Welcome back.');
        
        // Delay redirect to show success state
        setTimeout(() => {
          router.push('/admin');
        }, 1500);
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (error: any) {
      setSubmitStatus('error');
      const message = error.message || 'Invalid verification code. Please try again.';
      setErrorMessage(message);
      toast.error(message);
      setOtp(''); // Clear OTP on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    
    setIsResending(true);
    try {
      const responseData = await postAndPatch(ENDPOINTS.AUTH, { email });
      if (responseData) {
        // toast.success('New verification code sent!');
        setCountdown(60); // 60 second cooldown
        setOtp(''); // Clear current OTP
        setSubmitStatus('idle');
        setErrorMessage('');
      } else {
        throw new Error('Failed to resend code');
      }
    } catch (error: any) {
      toast.error('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem('email');
    router.push('/auth');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md'>
        
        <Card className='shadow-xl border-0 bg-white/80 backdrop-blur-sm'>
          <CardHeader className='space-y-1 text-center pb-6'>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}>
              <div className='mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4'>
                <Shield className='h-8 w-8 text-white' />
              </div>
            </motion.div>
            
            <CardTitle className='text-2xl font-bold text-gray-900'>
              Verify your email
            </CardTitle>
            <CardDescription className='text-gray-600'>
              We've sent a 6-digit code to <br />
              <span className='font-medium text-gray-800'>{email}</span>
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='flex flex-col items-center space-y-4'>
                <InputOTP 
                  value={otp}
                  onChange={setOtp} 
                  maxLength={6}
                  disabled={isLoading}
                  className='justify-center'>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className='w-12 h-12 text-lg font-semibold' />
                    <InputOTPSlot index={1} className='w-12 h-12 text-lg font-semibold' />
                    <InputOTPSlot index={2} className='w-12 h-12 text-lg font-semibold' />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className='w-12 h-12 text-lg font-semibold' />
                    <InputOTPSlot index={4} className='w-12 h-12 text-lg font-semibold' />
                    <InputOTPSlot index={5} className='w-12 h-12 text-lg font-semibold' />
                  </InputOTPGroup>
                </InputOTP>

                <p className='text-sm text-gray-600 text-center'>
                  Enter the 6-digit code from your email
                </p>
              </div>

              {/* Success/Error Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}>
                    <Alert className='border-green-200 bg-green-50'>
                      <CheckCircle className='h-4 w-4 text-green-600' />
                      <AlertDescription className='text-green-800'>
                        Verification successful! Redirecting to dashboard...
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {submitStatus === 'error' && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}>
                    <Alert className='border-red-200 bg-red-50'>
                      <AlertCircle className='h-4 w-4 text-red-600' />
                      <AlertDescription className='text-red-800'>
                        {errorMessage}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type='submit'
                disabled={isLoading || otp.length !== 6 || submitStatus === 'success'}
                className='w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-primary/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'>
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                    Verifying...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className='mr-2 h-5 w-5' />
                    Verified!
                  </>
                ) : (
                  'Verify code'
                )}
              </Button>
            </form>

            {/* Resend Code */}
            <div className='text-center space-y-3'>
              <p className='text-sm text-gray-600'>
                Didn't receive the code?
              </p>
              
              <Button
                type='button'
                variant='ghost'
                onClick={handleResendCode}
                disabled={countdown > 0 || isResending}
                className='text-primary hover:text-primary/80 hover:bg-orange-50 font-medium'>
                {isResending ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Sending...
                  </>
                ) : countdown > 0 ? (
                  <>
                    <RefreshCw className='mr-2 h-4 w-4' />
                    Resend in {countdown}s
                  </>
                ) : (
                  <>
                    <RefreshCw className='mr-2 h-4 w-4' />
                    Resend code
                  </>
                )}
              </Button>
            </div>

            {/* Back Button */}
            <Button
              type='button'
              variant='outline'
              onClick={handleGoBack}
              className='w-full border-gray-300 text-gray-700 hover:bg-gray-50'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to email entry
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='text-center mt-8'>
          <p className='text-sm text-gray-600'>
            Having trouble? <button className='text-primary hover:text-primary/80 font-medium'>Contact support</button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OtpForm;
