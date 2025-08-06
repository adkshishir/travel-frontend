import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { notFound } from 'next/navigation';
import BookingForm from '../_components/booking-form';

interface BookingEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BookingEditPage = async ({ params }: BookingEditPageProps) => {
  const { id } = await params;
  
  try {
    const booking = await fetchData(`${ENDPOINTS.BOOKING}/${id}`);
    
    if (!booking) {
      notFound();
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Booking</h1>
            <p className="text-muted-foreground">
              Update booking details and status
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={
                booking.status === 'confirmed' ? 'default' : 
                booking.status === 'pending' ? 'secondary' : 
                'destructive'
              }
            >
              {booking.status?.toUpperCase()}
            </Badge>
            <Badge 
              variant={
                booking.paymentStatus === 'paid' ? 'default' : 
                booking.paymentStatus === 'pending' ? 'secondary' : 
                'destructive'
              }
            >
              Payment: {booking.paymentStatus?.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Package Information Card */}
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

        {/* Booking Form */}
        <BookingForm booking={booking} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching booking:', error);
    notFound();
  }
};

export default BookingEditPage; 