'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2, Lock } from 'lucide-react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

function CheckoutForm({
  bookingId,
  onSuccess,
}: {
  bookingId: number;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(confirmError.message || 'Payment failed');
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      // Confirm on our backend
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payment/stripe/confirm`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
          }
        );
        onSuccess();
      } catch {
        setError('Payment confirmed but failed to update booking. Contact support.');
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}
      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-primary hover:bg-orange-600 text-white font-semibold py-3 rounded-xl"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Lock size={14} /> Pay Securely
          </span>
        )}
      </Button>
    </form>
  );
}

interface StripeCheckoutProps {
  bookingId: number;
  amount: number;
  onSuccess: () => void;
  onBack: () => void;
}

export default function StripeCheckout({
  bookingId,
  amount,
  onSuccess,
  onBack,
}: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/stripe/create-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, amount }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data?.data?.clientSecret) {
          setClientSecret(data.data.clientSecret);
        } else {
          setError('Failed to initialize payment. Try again.');
        }
      })
      .catch(() => setError('Failed to connect to payment service.'))
      .finally(() => setLoading(false));
  }, [bookingId, amount]);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 py-6">
        <Loader2 className="animate-spin text-primary" size={28} />
        <p className="text-sm text-gray-500">Initializing payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
        <Button variant="outline" className="w-full" onClick={onBack}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Card Payment
        </p>
        <p className="text-sm font-bold text-gray-800">${amount}</p>
      </div>

      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: { theme: 'stripe' } }}
        >
          <CheckoutForm bookingId={bookingId} onSuccess={onSuccess} />
        </Elements>
      )}

      <button
        onClick={onBack}
        className="text-xs text-gray-400 hover:text-gray-600 underline w-full text-center"
      >
        ← Choose a different payment method
      </button>
    </div>
  );
}
