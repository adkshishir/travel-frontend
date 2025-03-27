'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BookingSidebar } from '../_components/booking-sidebar';

export function Booking() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
    //   const [guests, setGuests] = useState('2 Adult, 1 Children');
    const guests=("2 Adult, 1 Children");
//   const [showGuestSelect, setShowGuestSelect] = useState(false);

  return (
    <BookingSidebar>
      <div className='rounded-lg border bg-card p-5  shadow-sm'>
        <div className='flex items-center justify-between'>
          <div>
            <span className='text-2xl font-bold'>$102</span>
            <span className='text-sm text-muted-foreground'>/night $119</span>
          </div>
          <div className='rounded-md bg-orange-500 px-2 py-1 text-xs font-medium text-white'>
            25% OFF
          </div>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='check-in'>Check In</Label>
            <div className='relative mt-1'>
              <Input
                id='check-in'
                type='text'
                placeholder='mm/dd/yyyy'
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className='pr-10'
              />
              <Calendar className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            </div>
          </div>
          <div>
            <Label htmlFor='check-out'>Check Out</Label>
            <div className='relative mt-1'>
              <Input
                id='check-out'
                type='text'
                placeholder='mm/dd/yyyy'
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className='pr-10'
              />
              <Calendar className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <Label htmlFor='guests'>Guests</Label>
          <Select defaultValue={guests}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select guests' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1 Adult'>1 Adult</SelectItem>
              <SelectItem value='2 Adult'>2 Adult</SelectItem>
              <SelectItem value='2 Adult, 1 Children'>
                2 Adult, 1 Children
              </SelectItem>
              <SelectItem value='2 Adult, 2 Children'>
                2 Adult, 2 Children
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='mt-6'>
          <h3 className='font-medium'>Extra Features</h3>
          <div className='mt-2 space-y-3'>
            <div className='flex items-center justify-between'>
              <span>Allow to bring pet</span>
              <span className='font-medium'>$15</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Breakfast a day per person</span>
              <span className='font-medium'>$10</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Parking a day</span>
              <span className='font-medium'>$6</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Extra pillow</span>
              <span className='font-medium'>Free</span>
            </div>
          </div>
        </div>

        <Separator className='my-6' />

        <div>
          <h3 className='font-medium'>Price</h3>
          <div className='mt-2 space-y-2'>
            <div className='flex items-center justify-between'>
              <span>1 Nights</span>
              <span className='font-medium'>$102</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Discount 20%</span>
              <span className='font-medium'>$20</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Breakfast per person</span>
              <span className='font-medium'>$10</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Service fee</span>
              <span className='font-medium'>$5</span>
            </div>
          </div>
        </div>

        <Separator className='my-6' />

        <div className='flex items-center justify-between font-medium'>
          <span>Total payment</span>
          <span className='text-xl'>$100</span>
        </div>

        <Button className='mt-6 w-full'>Book Now</Button>

        <p className='mt-4 text-center text-sm text-muted-foreground'>
          You will not get charged yet
        </p>
      </div>
    </BookingSidebar>
  );
}
