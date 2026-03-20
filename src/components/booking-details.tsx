'use client';

import { Calendar, Users, Shield, CheckCircle, CreditCard, Landmark, Wallet, ArrowLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { postAndPatch } from '@/utils/request-intregation';
import toast from 'react-hot-toast';
import ENDPOINTS from '@/utils/endpoints';
import { useRouter } from 'next/navigation';

// Dynamically load heavy payment SDKs
const StripeCheckout = dynamic(
  () => import('@/components/payment/stripe-checkout'),
  { loading: () => <div className="flex justify-center py-6"><Loader2 className="animate-spin text-primary" size={24} /></div> }
);
const PayPalCheckout = dynamic(
  () => import('@/components/payment/paypal-checkout'),
  { loading: () => <div className="flex justify-center py-6"><Loader2 className="animate-spin text-primary" size={24} /></div> }
);

type Step = 'details' | 'payment' | 'stripe' | 'paypal' | 'cash';

interface BookingDetailsProps {
  packageData?: {
    id: number | string;
    title?: string;
    price?: number;
    duration?: string | number;
    [key: string]: any;
  };
}

const BookingDetails = ({ packageData }: BookingDetailsProps) => {
  const router = useRouter();
  const [step, setStep] = useState<Step>('details');
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [departureDate, setDepartureDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCashLoading, setIsCashLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    country: '',
    phone: '',
  });

  const handleChange = (field: string, value: string) => {
    setUserDetails(prev => ({ ...prev, [field]: value }));
  };

  const price = packageData?.price || 0;

  // Step 1: Create booking
  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!departureDate) { toast.error('Please select a departure date'); return; }
    if (!packageData?.id) { toast.error('Package information is missing'); return; }
    if (!userDetails.name.trim()) { toast.error('Please enter your full name'); return; }
    if (!userDetails.email.trim()) { toast.error('Please enter your email'); return; }
    if (!userDetails.phone.trim()) { toast.error('Please enter your phone number'); return; }
    if (!userDetails.country.trim()) { toast.error('Please enter your country'); return; }

    setIsSubmitting(true);

    const startDate = new Date(departureDate);
    if (isNaN(startDate.getTime())) {
      toast.error('Invalid date'); setIsSubmitting(false); return;
    }

    try {
      const response = await postAndPatch(ENDPOINTS.BOOKING, {
        packageId: parseInt(packageData.id.toString(), 10),
        startDate: startDate.toISOString(),
        name: userDetails.name.trim(),
        email: userDetails.email.trim(),
        country: userDetails.country.trim(),
        phone: userDetails.phone.trim(),
        otherInformation: JSON.stringify({ travelers }),
      });

      if (response?.id || response?.data?.id) {
        const id = response.id || response.data.id;
        setBookingId(id);
        setStep('payment');
      } else {
        toast.error('Booking failed. Please try again.');
      }
    } catch {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3c: Cash payment
  const handleCashPayment = async () => {
    if (!bookingId) return;
    setIsCashLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/cash`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId }),
        }
      );
      const data = await res.json();
      if (data?.success) {
        router.push(`/booking/success?id=${bookingId}&method=cash`);
      } else {
        toast.error('Failed to register cash payment.');
      }
    } catch {
      toast.error('Failed to register cash payment.');
    } finally {
      setIsCashLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    const method = step === 'stripe' ? 'stripe' : step === 'paypal' ? 'paypal' : 'cash';
    router.push(`/booking/success?id=${bookingId}&method=${method}`);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
      {/* Price Header */}
      <div className="bg-gradient-to-r from-primary to-orange-500 p-5 text-white">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-white/80 text-sm">/person</span>
        </div>
        {packageData?.duration && (
          <p className="text-white/80 text-sm mt-1 flex items-center gap-1">
            <Calendar size={13} /> {packageData.duration}
          </p>
        )}
      </div>

      {/* Step indicator */}
      {step !== 'details' && (
        <div className="flex gap-1 px-5 pt-4">
          {(['details', 'payment', step === 'stripe' ? 'stripe' : step === 'paypal' ? 'paypal' : 'cash'] as const).map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= (['details', 'payment', step] as string[]).indexOf(step as string) ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      )}

      <div className="p-5">
        {/* ── Step 1: Details ──────────────────────────────────── */}
        {step === 'details' && (
          <form onSubmit={handleSubmitDetails} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="departure-date" className="text-xs font-medium text-gray-600 mb-1 block">
                  Departure Date *
                </Label>
                <Input
                  id="departure-date"
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="text-sm"
                />
              </div>
              <div>
                <Label htmlFor="travelers" className="text-xs font-medium text-gray-600 mb-1 block">
                  Travelers
                </Label>
                <Select value={travelers} onValueChange={setTravelers}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map((n) => (
                      <SelectItem key={n} value={n}>
                        {n} {n === '1' ? 'Person' : 'People'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Your Details</p>
              <div className="space-y-3">
                <Input
                  placeholder="Full Name *"
                  value={userDetails.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="text-sm"
                />
                <Input
                  type="email"
                  placeholder="Email Address *"
                  value={userDetails.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="text-sm"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="tel"
                    placeholder="Phone *"
                    value={userDetails.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                    className="text-sm"
                  />
                  <Input
                    placeholder="Country *"
                    value={userDetails.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" /> Processing...
                </span>
              ) : (
                'Continue to Payment'
              )}
            </Button>

            <div className="flex items-center justify-center gap-4 pt-1 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Shield size={12} className="text-green-500" /> Free cancellation
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={12} className="text-green-500" /> Instant confirmation
              </span>
            </div>
          </form>
        )}

        {/* ── Step 2: Payment Method Selection ─────────────────── */}
        {step === 'payment' && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Choose Payment</p>
              <p className="text-xs text-gray-400">How would you like to pay?</p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setStep('stripe')}
                className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-orange-50 transition-all text-left group"
              >
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CreditCard size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Credit / Debit Card</p>
                  <p className="text-xs text-gray-400">Visa, Mastercard, Amex</p>
                </div>
              </button>

              <button
                onClick={() => setStep('paypal')}
                className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-orange-50 transition-all text-left group"
              >
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Wallet size={18} className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">PayPal</p>
                  <p className="text-xs text-gray-400">Pay with your PayPal account</p>
                </div>
              </button>

              <button
                onClick={() => setStep('cash')}
                className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-orange-50 transition-all text-left group"
              >
                <div className="p-2 bg-green-100 rounded-lg">
                  <Landmark size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Cash on Arrival</p>
                  <p className="text-xs text-gray-400">Pay when you arrive in Nepal</p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setStep('details')}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft size={12} /> Edit details
            </button>
          </div>
        )}

        {/* ── Step 3a: Stripe ───────────────────────────────────── */}
        {step === 'stripe' && bookingId && (
          <StripeCheckout
            bookingId={bookingId}
            amount={price}
            onSuccess={handlePaymentSuccess}
            onBack={() => setStep('payment')}
          />
        )}

        {/* ── Step 3b: PayPal ───────────────────────────────────── */}
        {step === 'paypal' && bookingId && (
          <PayPalCheckout
            bookingId={bookingId}
            amount={price}
            onSuccess={handlePaymentSuccess}
            onBack={() => setStep('payment')}
          />
        )}

        {/* ── Step 3c: Cash ─────────────────────────────────────── */}
        {step === 'cash' && (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm font-semibold text-green-800 mb-1">Cash on Arrival</p>
              <p className="text-xs text-green-700">
                Your booking will be confirmed. Please bring <span className="font-bold">${price}</span> per person in USD when you arrive in Nepal.
              </p>
            </div>
            <ul className="text-xs text-gray-500 space-y-1">
              <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500 shrink-0" /> Booking confirmed immediately</li>
              <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500 shrink-0" /> Pay on the day of your trek</li>
              <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500 shrink-0" /> USD cash preferred</li>
            </ul>
            <Button
              onClick={handleCashPayment}
              disabled={isCashLoading}
              className="w-full bg-primary hover:bg-orange-600 text-white font-semibold py-3 rounded-xl"
            >
              {isCashLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" /> Confirming...
                </span>
              ) : (
                'Confirm Booking (Cash)'
              )}
            </Button>
            <button
              onClick={() => setStep('payment')}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft size={12} /> Choose different method
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
