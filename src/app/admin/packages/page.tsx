import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import { Plus, Package, DollarSign, Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Packages = async () => {
  const resultRes = await fetchData(ENDPOINTS.PACKAGES);
  const result = resultRes?.items || [];


  // Calculate stats with proper error handling
  const totalPackages = result.length;
  const averagePrice = result.reduce((sum: number, pkg: any) => {
    const price = parseFloat(pkg.price);
    return sum + (isNaN(price) ? 0 : price);
  }, 0) / totalPackages || 0;
  const averageDuration = result.reduce((sum: number, pkg: any) => {
    const duration = parseInt(pkg.duration);
    return sum + (isNaN(duration) ? 0 : duration);
  }, 0) / totalPackages || 0;
  const highRatedPackages = result.filter((pkg: any) => {
    const rating = parseFloat(pkg.rating);
    return !isNaN(rating) && rating >= 4;
  }).length;
  
  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div className='flex items-center justify-between'>
        <div className="space-y-1">
          <h1 className='text-3xl font-bold tracking-tight flex items-center gap-2'>
            <Package className="h-8 w-8 text-primary" />
            Packages Management
          </h1>
          <p className="text-muted-foreground">
            Manage travel packages that customers can book. Each package belongs to a destination and activity.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href={'/admin/packages/add'}>
            <Plus className="h-4 w-4" />
            Add New Package
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPackages}</div>
            <p className="text-xs text-muted-foreground">
              Available travel packages
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averagePrice.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">
              Per package average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Duration</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageDuration.toFixed(0)} days</div>
            <p className="text-xs text-muted-foreground">
              Trip length average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Rated</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highRatedPackages}</div>
            <p className="text-xs text-muted-foreground">
              4+ star packages
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Help Card */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="text-lg text-green-900">📦 Package Management Guide</CardTitle>
        </CardHeader>
        <CardContent className="text-green-800">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Essential Information:</h4>
              <ul className="space-y-1">
                <li>• <strong>Title:</strong> Clear, descriptive package name</li>
                <li>• <strong>Price:</strong> Competitive pricing in USD</li>
                <li>• <strong>Duration:</strong> Trip length in days</li>
                <li>• <strong>Group Size:</strong> Maximum participants</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Best Practices:</h4>
              <ul className="space-y-1">
                <li>• Add high-quality images to attract customers</li>
                <li>• Write detailed descriptions and itineraries</li>
                <li>• Include SEO metadata for better visibility</li>
                <li>• Set up FAQs to answer common questions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.PACKAGES}
        data={result}
        excludeColumns={['id', '_count', 'createdAt', 'seo', 'destination','media', 'updatedAt']}
        title='Packages'
        EDIT_NAME={'admin/packages'}
      />
    </div>
  );
};

export default Packages;
