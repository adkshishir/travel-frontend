import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import { Plus, MapPin, Activity, Package } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Destinations = async () => {
  const resultRes = await fetchData(ENDPOINTS.DESTINATIONS);
  const result = resultRes?.items || [];


  // Calculate stats
  const totalDestinations = result.length;
  const destinationsWithPackages = result.filter((dest: any) => dest._count?.packages > 0).length;
  const totalPackages = result.reduce((sum: number, dest: any) => sum + (dest._count?.packages || 0), 0);
  const averagePackagesPerDestination = totalPackages / totalDestinations || 0;
  
  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div className='flex items-center justify-between'>
        <div className="space-y-1">
          <h1 className='text-3xl font-bold tracking-tight flex items-center gap-2'>
            <MapPin className="h-8 w-8 text-primary" />
            Destinations Management
          </h1>
          <p className="text-muted-foreground">
            Manage travel destinations where activities are offered. Each destination belongs to an activity category.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href={'/admin/destinations/add'}>
            <Plus className="h-4 w-4" />
            Add New Destination
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Destinations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDestinations}</div>
            <p className="text-xs text-muted-foreground">
              Available travel destinations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Packages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{destinationsWithPackages}</div>
            <p className="text-xs text-muted-foreground">
              Destinations offering packages
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPackages}</div>
            <p className="text-xs text-muted-foreground">
              Across all destinations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Packages</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averagePackagesPerDestination.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Per destination
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Help Card */}
      <Card className="border-purple-200 bg-purple-50/50">
        <CardHeader>
          <CardTitle className="text-lg text-purple-900">🗺️ Destination Management Guide</CardTitle>
        </CardHeader>
        <CardContent className="text-purple-800">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Destination Hierarchy:</h4>
              <ul className="space-y-1">
                <li>• <strong>Activity</strong> → Destination → Package</li>
                <li>• Each destination must belong to an activity</li>
                <li>• Destinations can have multiple packages</li>
                <li>• Use clear, recognizable location names</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Content Guidelines:</h4>
              <ul className="space-y-1">
                <li>• Add compelling destination descriptions</li>
                <li>• Include beautiful destination images</li>
                <li>• Optimize SEO for location-based searches</li>
                <li>• Ensure URL slugs are SEO-friendly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.DESTINATIONS}
        data={result}
        excludeColumns={['id', '_count', 'createdAt', 'seo','activity', 'updatedAt']}
        title='Destinations'
        EDIT_NAME={'admin/destinations'}
      />
    </div>
  );
};

export default Destinations;
