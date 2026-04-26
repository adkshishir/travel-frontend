import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Phone, Mail, CreditCard, Wallet, Landmark } from 'lucide-react';
import Link from 'next/link';

interface Props {
  searchParams: Promise<{ id?: string; method?: string }>;
}

const methodInfo: Record<string, { icon: React.ReactNode; label: string; note: string }> = {
  stripe: {
    icon: <CreditCard className="h-5 w-5 text-blue-600" />,
    label: 'Card payment received',
    note: 'Your card has been charged and booking is confirmed.',
  },
  paypal: {
    icon: <Wallet className="h-5 w-5 text-yellow-600" />,
    label: 'PayPal payment received',
    note: 'Your PayPal payment was successful and booking is confirmed.',
  },
  cash: {
    icon: <Landmark className="h-5 w-5 text-green-600" />,
    label: 'Cash on Arrival',
    note: 'Please bring your payment in USD on the day of your trek.',
  },
};

const BookingSuccess = async ({ searchParams }: Props) => {
  const { id, method } = await searchParams;
  const info = method ? methodInfo[method] : null;

  return (
    <main className="mt-20 max-w-[600px] mx-auto my-16 px-4">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-700">
            Booking Confirmed!
          </CardTitle>
          {id && (
            <p className="text-sm text-muted-foreground">Booking #{id}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {info && (
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 text-left">
              {info.icon}
              <div>
                <p className="text-sm font-semibold text-gray-800">{info.label}</p>
                <p className="text-xs text-gray-500">{info.note}</p>
              </div>
            </div>
          )}

          <div className="text-muted-foreground">
            <p className="mb-4 text-sm">
              Thank you for booking with Traveltreks! We have received your information and will contact you within 24 hours to finalise your trek details.
            </p>

            <div className="bg-amber-50 rounded-lg p-4 text-left border border-amber-100">
              <h3 className="font-semibold text-amber-900 mb-3">What happens next?</h3>
              <div className="space-y-2 text-sm text-amber-800">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>Our team will review your booking and confirm availability</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>We will call or WhatsApp you to confirm all details</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>A detailed itinerary will be emailed to you</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/trekking">Browse More Treks</Link>
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              Need help?{' '}
              <a href="mailto:info@traveltreks.com" className="text-primary hover:underline">
                info@traveltreks.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default BookingSuccess;
