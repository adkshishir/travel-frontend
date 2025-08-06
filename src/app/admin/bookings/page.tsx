import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { 
  Calendar, 
  MapPin, 
  Package, 
  User, 
  DollarSign,
  Clock,
  Phone,
  Mail
} from 'lucide-react';
import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';

const BookingsPage = async () => {
  const result = await fetchData(ENDPOINTS.BOOKING);
  const bookings = result || [];

  // Calculate stats
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((booking: any) => booking.status === 'pending').length;
  const confirmedBookings = bookings.filter((booking: any) => booking.status === 'confirmed').length;
  const totalRevenue = bookings
    .filter((booking: any) => booking.status === 'confirmed')
    .reduce((sum: number, booking: any) => sum + (booking.totalPrice || booking.price || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookings Management</h1>
        <p className="text-muted-foreground">
          Manage customer bookings and track reservation details.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              All time bookings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingBookings}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedBookings}</div>
            <p className="text-xs text-muted-foreground">
              Active bookings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From confirmed bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Help Card */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">📅 Booking Management Guide</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Booking Status:</h4>
              <ul className="space-y-1">
                <li>• <strong>Pending:</strong> New booking awaiting confirmation</li>
                <li>• <strong>Confirmed:</strong> Booking approved and active</li>
                <li>• <strong>Cancelled:</strong> Booking has been cancelled</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Key Information:</h4>
              <ul className="space-y-1">
                <li>• Customer contact details and preferences</li>
                <li>• Package details and pricing</li>
                <li>• Travel dates and special requirements</li>
                <li>• Payment status and transaction details</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.BOOKING}
        data={bookings}
        excludeColumns={[
          'id', 
          'updatedAt', 
          'packageId', 
          'flightArrival', 
          'flightDeparture', 
          'emergency',
          'extraPrice',
          'extraDays', 
          'extraNights',
          'bookingDate',
          'howdidyouhear',
          'prePayment'
        ]}
        title='Bookings'
        EDIT_NAME={'admin/bookings'}
      />
    </div>
  );
};

export default BookingsPage; 