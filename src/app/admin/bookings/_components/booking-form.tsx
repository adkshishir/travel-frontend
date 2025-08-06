'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { postAndPatch } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

interface BookingFormProps {
  booking?: any;
}

const BookingForm: React.FC<BookingFormProps> = ({ booking }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: booking?.name || '',
    email: booking?.email || '',
    phone: booking?.phone || '',
    country: booking?.country || '',
    emergency: booking?.emergency || '',
    flightArrival: booking?.flightArrival || '',
    flightDeparture: booking?.flightDeparture || '',
    status: booking?.status || 'pending',
    paymentStatus: booking?.paymentStatus || 'pending',
    totalPrice: booking?.totalPrice || booking?.price || 0,
    price: booking?.price || 0,
    extraPrice: booking?.extraPrice || 0,
    tripCode: booking?.tripCode || '',
    otherInformation: booking?.otherInformation || '',
    startDate: booking?.startDate ? new Date(booking.startDate).toISOString().split('T')[0] : '',
    endDate: booking?.endDate ? new Date(booking.endDate).toISOString().split('T')[0] : '',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        totalPrice: parseInt(formData.totalPrice.toString()),
        price: parseInt(formData.price.toString()),
        extraPrice: parseInt(formData.extraPrice.toString()),
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
      };

      const endpoint = booking?.id 
        ? `${ENDPOINTS.BOOKING}/${booking.id}`
        : ENDPOINTS.BOOKING;

      await postAndPatch(endpoint, payload, booking?.id ? 'PATCH' : 'POST');
      
      toast.success(booking?.id ? 'Booking updated successfully!' : 'Booking created successfully!');
      router.push('/admin/bookings');
      router.refresh();
    } catch (error) {
      console.error('Error saving booking:', error);
      toast.error('Failed to save booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Customer's full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="customer@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="Country of residence"
                />
              </div>
              <div>
                <Label htmlFor="emergency">Emergency Contact</Label>
                <Input
                  id="emergency"
                  value={formData.emergency}
                  onChange={(e) => handleInputChange('emergency', e.target.value)}
                  placeholder="Emergency contact details"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel Information */}
        <Card>
          <CardHeader>
            <CardTitle>Travel Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="flightArrival">Flight Arrival</Label>
                <Input
                  id="flightArrival"
                  value={formData.flightArrival}
                  onChange={(e) => handleInputChange('flightArrival', e.target.value)}
                  placeholder="Arrival flight details"
                />
              </div>
              <div>
                <Label htmlFor="flightDeparture">Flight Departure</Label>
                <Input
                  id="flightDeparture"
                  value={formData.flightDeparture}
                  onChange={(e) => handleInputChange('flightDeparture', e.target.value)}
                  placeholder="Departure flight details"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Status and Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Status & Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Booking Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <Select value={formData.paymentStatus} onValueChange={(value) => handleInputChange('paymentStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Base Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="extraPrice">Extra Price ($)</Label>
                <Input
                  id="extraPrice"
                  type="number"
                  value={formData.extraPrice}
                  onChange={(e) => handleInputChange('extraPrice', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="totalPrice">Total Price ($)</Label>
                <Input
                  id="totalPrice"
                  type="number"
                  value={formData.totalPrice}
                  onChange={(e) => handleInputChange('totalPrice', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="tripCode">Trip Code</Label>
                <Input
                  id="tripCode"
                  value={formData.tripCode}
                  onChange={(e) => handleInputChange('tripCode', e.target.value)}
                  placeholder="Trip reference code"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="otherInformation">Other Information</Label>
              <Textarea
                id="otherInformation"
                value={formData.otherInformation}
                onChange={(e) => handleInputChange('otherInformation', e.target.value)}
                placeholder="Special requests, dietary requirements, etc."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : booking?.id ? 'Update Booking' : 'Create Booking'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm; 