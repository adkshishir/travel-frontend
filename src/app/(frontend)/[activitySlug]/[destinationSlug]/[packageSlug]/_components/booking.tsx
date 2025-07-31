import { BookingSidebar } from './booking-sidebar';
import BookingDetails from '@/components/booking-details';

interface PackageBookingProps {
  packageData?: {
    id: number | string;
    title?: string;
    price?: number;
    [key: string]: any;
  };
}

export function PackageBooking({ packageData }: PackageBookingProps) {
  return (
    <BookingSidebar>
      <BookingDetails packageData={packageData} />
    </BookingSidebar>
  );
}
