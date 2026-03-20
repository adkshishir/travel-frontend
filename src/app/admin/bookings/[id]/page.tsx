import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { notFound } from 'next/navigation';
import BookingForm from '../_components/booking-form';
import RefundManager from '../_components/refund-manager';
import { CreditCard, DollarSign, Hash, Calendar } from 'lucide-react';

interface BookingEditPageProps {
  params: Promise<{ id: string }>;
}

const statusVariant = (s: string) =>
  s === 'confirmed' ? 'default' : s === 'pending' ? 'secondary' : 'destructive';

const BookingEditPage = async ({ params }: BookingEditPageProps) => {
  const { id } = await params;

  try {
    const booking = await fetchData(`${ENDPOINTS.BOOKING}/${id}`);
    if (!booking) notFound();

    const payment = booking.payment;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Booking #{id}</h1>
            <p className="text-muted-foreground">Manage booking details, status, and payments.</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={statusVariant(booking.status)}>
              {booking.status?.toUpperCase()}
            </Badge>
            <Badge variant={booking.paymentStatus === 'paid' ? 'default' : 'secondary'}>
              Payment: {booking.paymentStatus?.toUpperCase()}
            </Badge>
            {booking.paymentMethod && (
              <Badge variant="outline">{booking.paymentMethod?.toUpperCase()}</Badge>
            )}
          </div>
        </div>

        {/* Package Info */}
        {booking.package && (
          <Card>
            <CardHeader>
              <CardTitle>Package Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Package</p>
                  <p className="font-semibold">{booking.package.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Destination</p>
                  <p className="font-semibold">{booking.package.destination?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Activity</p>
                  <p className="font-semibold">{booking.package.destination?.activity?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Package Price</p>
                  <p className="font-semibold">${booking.package.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Details */}
        {payment && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Amount Paid</p>
                    <p className="font-semibold">${payment.amount} {payment.currency}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Method</p>
                    <p className="font-semibold capitalize">{payment.paymentMethod}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Transaction ID</p>
                    <p className="font-mono text-xs break-all">{payment.transactionId || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Payment Date</p>
                    <p className="text-sm">{new Date(payment.paymentDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Refund Management */}
              {booking.status === 'cancelled' && (
                <>
                  <hr className="my-4" />
                  <h4 className="text-sm font-semibold mb-3">Refund Management</h4>
                  <RefundManager
                    bookingId={booking.id}
                    refundStatus={booking.refundStatus}
                    paymentMethod={payment.paymentMethod}
                    paidAmount={payment.amount}
                  />
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Cancellation Info */}
        {booking.status === 'cancelled' && (
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader>
              <CardTitle className="text-red-700 text-base">Cancellation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {booking.cancelReason && (
                <p><span className="font-medium">Reason:</span> {booking.cancelReason}</p>
              )}
              {booking.cancelledAt && (
                <p><span className="font-medium">Cancelled at:</span> {new Date(booking.cancelledAt).toLocaleString()}</p>
              )}
              {!payment && (
                <p className="text-muted-foreground">No payment was made — no refund needed.</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Booking Form */}
        <BookingForm booking={booking} />
      </div>
    );
  } catch {
    notFound();
  }
};

export default BookingEditPage;
