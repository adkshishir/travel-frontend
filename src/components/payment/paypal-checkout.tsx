'use client';

import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Loader2 } from 'lucide-react';

interface PayPalCheckoutProps {
  bookingId: number;
  amount: number;
  onSuccess: () => void;
  onBack: () => void;
}

export default function PayPalCheckout({
  bookingId,
  amount,
  onSuccess,
  onBack,
}: PayPalCheckoutProps) {
  const [error, setError] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          PayPal
        </p>
        <p className="text-sm font-bold text-gray-800">${amount}</p>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}

      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
          currency: 'USD',
        }}
      >
        <PayPalButtons
          style={{ layout: 'vertical', shape: 'rect', label: 'pay' }}
          createOrder={async () => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/payment/paypal/create-order`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingId, amount }),
              }
            );
            const data = await res.json();
            if (!data?.data?.orderId) throw new Error('Failed to create PayPal order');
            return data.data.orderId;
          }}
          onApprove={async (data) => {
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/payment/paypal/capture`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ bookingId, orderId: data.orderID }),
                }
              );
              const result = await res.json();
              if (result?.success) {
                onSuccess();
              } else {
                setError('Payment capture failed. Please contact support.');
              }
            } catch {
              setError('Payment capture failed. Please contact support.');
            }
          }}
          onError={() => {
            setError('PayPal encountered an error. Please try again.');
          }}
        />
      </PayPalScriptProvider>

      <button
        onClick={onBack}
        className="text-xs text-gray-400 hover:text-gray-600 underline w-full text-center"
      >
        ← Choose a different payment method
      </button>
    </div>
  );
}
