'use client';
import {
  Clock,
  MapPin,
  Utensils,
  Hotel,
  Car,
  Camera,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TravelAccordion from '@/components/travel/accordion';

export function PackageDetails() {
  return (
    <div className='space-y-8'>
      {/* Overview Section */}
      <div className='space-y-4'>
        <div className='flex flex-wrap gap-2'>
          <Badge variant='outline' className='flex items-center gap-1'>
            <Clock className='h-3 w-3' />7 Days / 6 Nights
          </Badge>
          <Badge variant='outline' className='flex items-center gap-1'>
            <Users className='h-3 w-3' />
            Max 12 People
          </Badge>
          <Badge variant='outline' className='flex items-center gap-1'>
            <MapPin className='h-3 w-3' />
            Multiple Destinations
          </Badge>
        </div>

        <h2 className='text-xl font-semibold'>Overview</h2>
        <div className='space-y-4 text-muted-foreground'>
          <p>
            Experience the ultimate Bali getaway with our 7-day luxury package.
            From pristine beaches to lush rice terraces, ancient temples to
            vibrant markets, this carefully curated journey showcases the best
            of the Island of the Gods.
          </p>
          <p>
            Stay in premium accommodations, enjoy private transportation, and
            benefit from the knowledge of expert local guides who will reveal
            the island's hidden gems and cultural treasures.
          </p>
        </div>
      </div>

      {/* Highlights Section */}
      <div>
        <h2 className='mb-4 text-xl font-semibold'>Package Highlights</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='rounded-lg border bg-card p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <Hotel className='h-5 w-5' />
              </div>
              <div>
                <h3 className='font-medium'>Luxury Accommodations</h3>
                <p className='text-sm text-muted-foreground'>
                  5-star beachfront resort
                </p>
              </div>
            </div>
          </div>

          <div className='rounded-lg border bg-card p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <Utensils className='h-5 w-5' />
              </div>
              <div>
                <h3 className='font-medium'>Gourmet Dining</h3>
                <p className='text-sm text-muted-foreground'>
                  Daily breakfast & 3 special dinners
                </p>
              </div>
            </div>
          </div>

          <div className='rounded-lg border bg-card p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <Camera className='h-5 w-5' />
              </div>
              <div>
                <h3 className='font-medium'>Guided Excursions</h3>
                <p className='text-sm text-muted-foreground'>
                  4 premium tours included
                </p>
              </div>
            </div>
          </div>

          <div className='rounded-lg border bg-card p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <Car className='h-5 w-5' />
              </div>
              <div>
                <h3 className='font-medium'>Private Transportation</h3>
                <p className='text-sm text-muted-foreground'>
                  Airport transfers & tour transport
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Section */}
      <div>
        <h2 className='mb-4 text-xl font-semibold'>Itinerary</h2>
        <div className='space-y-4'>
          <div className='rounded-lg border p-4'>
            <h3 className='font-medium'>Day 1: Arrival & Welcome</h3>
            <ul className='mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground'>
              <li>Airport pickup & transfer to your beachfront resort</li>
              <li>Welcome drink and resort orientation</li>
              <li>Evening at leisure with sunset cocktail reception</li>
            </ul>
          </div>

          <div className='rounded-lg border p-4'>
            <h3 className='font-medium'>Day 2: Cultural Ubud</h3>
            <ul className='mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground'>
              <li>Morning visit to sacred Monkey Forest</li>
              <li>Traditional Balinese lunch at local restaurant</li>
              <li>Afternoon tour of Ubud art galleries and craft villages</li>
              <li>Evening traditional dance performance</li>
            </ul>
          </div>

          <div className='rounded-lg border p-4'>
            <h3 className='font-medium'>Day 3: Temple & Nature Tour</h3>
            <ul className='mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground'>
              <li>Visit to iconic Tanah Lot temple</li>
              <li>
                Explore the stunning Jatiluwih rice terraces (UNESCO site)
              </li>
              <li>Lunch with panoramic valley views</li>
              <li>Evening at leisure</li>
            </ul>
          </div>

          <Button variant='outline' className='mt-2 w-full'>
            View Full Itinerary
          </Button>
        </div>
      </div>

      {/* Inclusions Section */}
      <div>
        <h2 className='mb-4 text-xl font-semibold'>Package Inclusions</h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <div>
            <h3 className='mb-2 font-medium'>What's Included</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-green-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <span>6 nights accommodation in 5-star beachfront resort</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-green-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <span>Daily breakfast buffet</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-green-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <span>3 special dinner experiences</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-green-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <span>Private airport transfers</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-green-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <span>All guided tours as per itinerary</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-green-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <span>English-speaking local guide</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-2 font-medium'>What's Not Included</h3>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
                <span>International flights</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
                <span>Travel insurance</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
                <span>Meals not mentioned in the itinerary</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
                <span>Personal expenses & souvenirs</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
                <span>Optional activities not in itinerary</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-5 w-5 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
                <span>Visa fees (if applicable)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <TravelAccordion />
    </div>
  );
}
