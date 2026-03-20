'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface RefundManagerProps {
  bookingId: number;
  refundStatus: string | null;
  paymentMethod: string | null;
  paidAmount: number | null;
}

const statusColors: Record<string, string> = {
  none: 'bg-gray-100 text-gray-600',
  requested: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  failed: 'bg-red-100 text-red-700',
};

export default function RefundManager({
  bookingId,
  refundStatus,
  paymentMethod,
  paidAmount,
}: RefundManagerProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null);
  const [refundAmount, setRefundAmount] = useState(paidAmount?.toString() || '');

  const handleRefund = async (action: 'approved' | 'rejected') => {
    setLoading(action === 'approved' ? 'approve' : 'reject');
    try {
      const token = document.cookie.split('; ').find(r => r.startsWith('token='))?.split('=')[1];
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/refund`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookingId,
            action,
            refundAmount: action === 'approved' ? parseInt(refundAmount) || undefined : undefined,
          }),
        }
      );
      const data = await res.json();
      if (data?.success) {
        toast.success(action === 'approved' ? 'Refund processed!' : 'Refund rejected.');
        router.refresh();
      } else {
        toast.error(data?.message || 'Action failed.');
      }
    } catch {
      toast.error('Failed to process. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const statusLabel = refundStatus || 'none';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Refund Status:</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[statusLabel] || statusColors.none}`}>
          {statusLabel.toUpperCase()}
        </span>
      </div>

      {statusLabel === 'requested' && (
        <div className="border rounded-lg p-4 space-y-4 bg-yellow-50 border-yellow-200">
          <p className="text-sm text-yellow-800 font-medium flex items-center gap-2">
            <RefreshCw size={14} /> Refund requested — action required
          </p>
          <div>
            <Label htmlFor="refundAmount" className="text-sm">
              Refund Amount (USD)
            </Label>
            <Input
              id="refundAmount"
              type="number"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              placeholder={paidAmount?.toString() || '0'}
              className="mt-1 max-w-[160px]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave as is for full refund (${paidAmount})
              {paymentMethod !== 'cash' && ' — will be processed via ' + paymentMethod}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => handleRefund('approved')}
              disabled={!!loading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {loading === 'approve' ? (
                <Loader2 size={14} className="animate-spin mr-1" />
              ) : (
                <CheckCircle size={14} className="mr-1" />
              )}
              Approve Refund
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleRefund('rejected')}
              disabled={!!loading}
            >
              {loading === 'reject' ? (
                <Loader2 size={14} className="animate-spin mr-1" />
              ) : (
                <XCircle size={14} className="mr-1" />
              )}
              Reject
            </Button>
          </div>
        </div>
      )}

      {statusLabel === 'completed' && (
        <p className="text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2 border border-green-200">
          Refund of <strong>${paidAmount}</strong> has been processed successfully.
        </p>
      )}

      {statusLabel === 'rejected' && (
        <p className="text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2 border border-red-200">
          Refund request was rejected.
        </p>
      )}
    </div>
  );
}
