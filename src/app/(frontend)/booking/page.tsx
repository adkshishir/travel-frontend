'use client';
import BookingDetails from '@/components/booking-details';
import React, { useEffect, useState } from 'react';
import { ChevronLeft, Map, Phone, Search, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

interface PackageData {
  id: number;
  title: string;
  slug: string;
  price: number;
  duration: number;
  groupSize: number;
  destination: {
    name: string;
    slug: string;
    activity: {
      name: string;
      slug: string;
    };
  };
  media?: {
    thumbnail?: string;
  };
}

const Booking = () => {
  const [activeSection, setActiveSection] = useState('booking');
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const response = await fetchData(ENDPOINTS.PACKAGES);
        setPackages(response?.items || []);
      } catch (error) {
        console.error('Failed to load packages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  // Filter packages based on search term
  const filteredPackages = packages.filter(pkg =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destination.activity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePackageSelect = (pkg: PackageData) => {
    setSelectedPackage(pkg);
  };

  return (
    <main className='mt-20 max-w-[1180px] mx-auto my-16'>
      <div className='flex items-center justify-between py-4 max-lg:p-4'>
        <Button variant='outline' size='sm'>
          <ChevronLeft className='mr-1 h-4 w-4' />
          Back
        </Button>
        <div className='flex space-x-2'>
          <Button variant='outline' size='sm'>
            <Map className='mr-1 h-4 w-4' />
            Map
          </Button>
          <Button variant='outline' size='sm'>
            <Phone className='mr-1 h-4 w-4' />
            Contact
          </Button>
        </div>
      </div>

   

      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Trek Selection Panel */}
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Package className='h-5 w-5' />
                Select Your Trek
              </CardTitle>
              <CardDescription>
                Choose from our available trek packages
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className='relative mb-6'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  type='search'
                  placeholder='Search treks by name, destination, or activity...'
                  className='pl-10'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Package List */}
              {loading ? (
                <div className='flex justify-center items-center py-8'>
                  <div className='text-muted-foreground'>Loading treks...</div>
                </div>
              ) : (
                <div className='space-y-4 max-h-96 overflow-y-auto'>
                  {filteredPackages.length > 0 ? (
                    filteredPackages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className={cn(
                          'border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md',
                          selectedPackage?.id === pkg.id
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-border hover:border-primary/50'
                        )}
                        onClick={() => handlePackageSelect(pkg)}
                      >
                        <div className='flex items-start justify-between'>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2 mb-2'>
                              <h3 className='font-semibold text-lg'>{pkg.title}</h3>
                              {selectedPackage?.id === pkg.id && (
                                <Badge variant='default'>Selected</Badge>
                              )}
                            </div>
                            
                            <div className='space-y-1 text-sm text-muted-foreground mb-3'>
                              <p>
                                <span className='font-medium'>Activity:</span> {pkg.destination.activity.name}
                              </p>
                              <p>
                                <span className='font-medium'>Destination:</span> {pkg.destination.name}
                              </p>
                              <div className='flex gap-4'>
                                <span>
                                  <span className='font-medium'>Duration:</span> {pkg.duration} days
                                </span>
                                <span>
                                  <span className='font-medium'>Group Size:</span> {pkg.groupSize} people
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className='text-right'>
                            <div className='text-2xl font-bold text-primary'>${pkg.price}</div>
                            <div className='text-sm text-muted-foreground'>/person</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='text-center py-8 text-muted-foreground'>
                      <Package className='h-12 w-12 mx-auto mb-4 opacity-50' />
                      <p className='font-medium'>No treks found</p>
                      <p className='text-sm'>Try adjusting your search terms</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <div className='lg:col-span-1'>
          {selectedPackage ? (
            <BookingDetails packageData={selectedPackage} />
          ) : (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-12'>
                <Package className='h-12 w-12 text-muted-foreground mb-4' />
                <h3 className='font-semibold text-lg mb-2'>Select a Trek</h3>
                <p className='text-sm text-muted-foreground text-center'>
                  Choose a trek from the list to start your booking process
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
};

export default Booking;
