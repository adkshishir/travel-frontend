"use client"
import { Calendar, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
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

const BookingDetails = () => {
  const [departureDate, setDepartureDate] = useState('');
  const [travelers, setTravelers] = useState('2 Adults');
  const [selectedOptions, setSelectedOptions] = useState<{[key:string]: boolean}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTravelers('2 Adults');
  }, []);

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!departureDate) {
      toast.error('Please select a departure date');
      return;
    }
    setIsSubmitting(true);
    const bookingPayload = {
      startDate: departureDate,
      travelers,
      options: Object.keys(selectedOptions).filter((k) => selectedOptions[k]),
      // Add more fields as needed (e.g., packageId, user info)
    };
    const response = await postAndPatch('booking', bookingPayload);
    if (response) {
      toast.success('Booking successful!');
      // Optionally reset form or redirect
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className='rounded-lg border bg-card p-5 shadow-sm'>
      <div className='flex items-center justify-between'>
        <div>
          <span className='text-2xl font-bold'>$1,299</span>
          <span className='text-sm text-muted-foreground'>/person $1,599</span>
        </div>
        <div className='rounded-md bg-orange-500 px-2 py-1 text-xs font-medium text-white'>
          20% OFF
        </div>
      </div>

      <div className='mt-4'>
        <Label htmlFor='departure-date'>Departure Date</Label>
        <div className='relative mt-1'>
          <Input
            id='departure-date'
            type='text'
            placeholder='mm/dd/yyyy'
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className='pr-10'
          />
          <Calendar className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        </div>
      </div>

      <div className='mt-4'>
        <Label htmlFor='travelers'>Travelers</Label>
        <Select value={travelers} onValueChange={setTravelers}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select travelers' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='1 Adult'>1 Adult</SelectItem>
            <SelectItem value='2 Adults'>2 Adults</SelectItem>
            <SelectItem value='2 Adults, 1 Child'>2 Adults, 1 Child</SelectItem>
            <SelectItem value='2 Adults, 2 Children'>2 Adults, 2 Children</SelectItem>
            <SelectItem value='Group (5+)'>Group (5+)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='mt-6'>
        <h3 className='font-medium'>Package Options</h3>
        <div className='mt-2 space-y-3'>
          <div className='flex items-start space-x-2'>
            <Checkbox id='flight' checked={!!selectedOptions['flight']} onCheckedChange={() => handleOptionChange('flight')} />
            <div className='grid gap-1.5 leading-none'>
              <Label htmlFor='flight' className='text-sm font-medium'>
                Include International Flights
              </Label>
              <p className='text-xs text-muted-foreground'>
                Add round-trip flights from your location
              </p>
            </div>
            <span className='ml-auto font-medium'>+$599</span>
          </div>

          <div className='flex items-start space-x-2'>
            <Checkbox id='upgrade' checked={!!selectedOptions['upgrade']} onCheckedChange={() => handleOptionChange('upgrade')} />
            <div className='grid gap-1.5 leading-none'>
              <Label htmlFor='upgrade' className='text-sm font-medium'>
                Upgrade to Luxury Villa
              </Label>
              <p className='text-xs text-muted-foreground'>
                Private pool villa instead of standard room
              </p>
            </div>
            <span className='ml-auto font-medium'>+$399</span>
          </div>

          <div className='flex items-start space-x-2'>
            <Checkbox id='spa' checked={!!selectedOptions['spa']} onCheckedChange={() => handleOptionChange('spa')} />
            <div className='grid gap-1.5 leading-none'>
              <Label htmlFor='spa' className='text-sm font-medium'>
                Spa Package
              </Label>
              <p className='text-xs text-muted-foreground'>
                3 premium spa treatments during your stay
              </p>
            </div>
            <span className='ml-auto font-medium'>+$199</span>
          </div>

          <div className='flex items-start space-x-2'>
            <Checkbox id='insurance' checked={!!selectedOptions['insurance']} onCheckedChange={() => handleOptionChange('insurance')} />
            <div className='grid gap-1.5 leading-none'>
              <Label htmlFor='insurance' className='text-sm font-medium'>
                Travel Insurance
              </Label>
              <p className='text-xs text-muted-foreground'>
                Comprehensive coverage for your trip
              </p>
            </div>
            <span className='ml-auto font-medium'>+$89</span>
          </div>
        </div>
      </div>

      <Separator className='my-6' />

      <div>
        <h3 className='font-medium'>Price Breakdown</h3>
        <div className='mt-2 space-y-2'>
          <div className='flex items-center justify-between'>
            <span>Base Package (per person)</span>
            <span className='font-medium'>$1,299</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Selected Options</span>
            <span className='font-medium'>$0</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Taxes & Fees</span>
            <span className='font-medium'>$129</span>
          </div>
        </div>
      </div>

      <Separator className='my-6' />

      <div className='flex items-center justify-between font-medium'>
        <span>Total (per person)</span>
        <span className='text-xl'>$1,428</span>
      </div>

      <Button className='mt-6 w-full' type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Booking...' : 'Book Package'}
      </Button>

      <div className='mt-4 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground'>
        <Users className='h-4 w-4' />
        <span>12 people booked this package in the last 24 hours</span>
      </div>
    </form>
  );
};

export default BookingDetails;
