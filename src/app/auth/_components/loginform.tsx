'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ENDPOINTS from '@/utils/endpoints';
import { postAndPatch } from '@/utils/request-intregation';

// Form validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Auth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const email = watch('email');

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const responseData = await postAndPatch(ENDPOINTS.AUTH, data);
      
      if (responseData) {
        setSubmitStatus('success');
        localStorage.setItem('email', data.email);
        toast.success('Verification code sent to your email!');
        
        // Delay redirect to show success state
        setTimeout(() => {
          router.push('/auth/verify');
        }, 1500);
      } else {
        throw new Error('Failed to send verification code');
      }
    } catch (error: any) {
      setSubmitStatus('error');
      const message = error.message || 'Something went wrong. Please try again.';
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
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
                <Mail className='h-8 w-8 text-white' />
              </div>
            </motion.div>
            
            <CardTitle className='text-2xl font-bold text-gray-900'>
              Welcome back
            </CardTitle>
            <CardDescription className='text-gray-600'>
              Enter your email to receive a verification code
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
                  Email Address
                </Label>
                <div className='relative'>
                  <Input
                    id='email'
                    type='email'
                    placeholder='enter@yourmail.com'
                    {...register('email')}
                    className={`pl-10 h-12 transition-all duration-200 ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-orange-500 focus:ring-orange-200'
                    }`}
                    disabled={isLoading}
                  />
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-sm text-red-600 flex items-center gap-1'>
                    <AlertCircle className='h-4 w-4' />
                    {errors.email.message}
                  </motion.p>
                )}
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
                        Verification code sent successfully! Check your email.
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
                disabled={isLoading || !email || submitStatus === 'success'}
                className='w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'>
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                    Sending code...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className='mr-2 h-5 w-5' />
                    Code sent!
                  </>
                ) : (
                  'Send verification code'
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className='text-center text-sm text-gray-600'>
              <p>We'll send a 6-digit code to verify your email</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='text-center mt-8'>
          <p className='text-sm text-gray-600'>
            Having trouble? <button className='text-orange-600 hover:text-orange-700 font-medium'>Contact support</button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
