import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const BookingSuccess = () => {
  return (
    <main className='mt-20 max-w-[600px] mx-auto my-16 px-4'>
      <Card className='text-center'>
        <CardHeader>
          <div className='flex justify-center mb-4'>
            <CheckCircle className='h-16 w-16 text-green-500' />
          </div>
          <CardTitle className='text-2xl text-green-700'>
            Booking Submitted Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='text-muted-foreground'>
            <p className='mb-4'>
              Thank you for your booking request. We have received your information and will contact you within 24 hours to confirm your trek details.
            </p>
            
            <div className='bg-blue-50 rounded-lg p-4 text-left'>
              <h3 className='font-semibold text-blue-900 mb-3'>What happens next?</h3>
              <div className='space-y-2 text-sm text-blue-800'>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4' />
                  <span>Our team will review your booking request</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone className='h-4 w-4' />
                  <span>We'll contact you to confirm details and availability</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Mail className='h-4 w-4' />
                  <span>You'll receive a detailed itinerary via email</span>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild>
              <Link href='/'>
                Return to Home
              </Link>
            </Button>
            <Button variant='outline' asChild>
              <Link href='/booking'>
                Book Another Trek
              </Link>
            </Button>
          </div>

          <div className='text-sm text-muted-foreground'>
            <p>
              Need immediate assistance? Contact us at{' '}
              <a href='tel:+1234567890' className='text-primary hover:underline'>
                +1 (234) 567-890
              </a>{' '}
              or{' '}
              <a href='mailto:info@poonhilltreks.com' className='text-primary hover:underline'>
                info@poonhilltreks.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default BookingSuccess; 