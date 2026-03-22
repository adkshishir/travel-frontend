import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import { Plus, FileText, Eye, ToggleLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Categories = async () => {
  const resultRes = await fetchData(ENDPOINTS.CATEGORIES);
  const result = resultRes?.items || [];

  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div className='flex items-center justify-between'>
        <div className="space-y-1">
          <h1 className='text-3xl font-bold tracking-tight flex items-center gap-2'>
            <FileText className="h-8 w-8 text-primary" />
            Categories Management
          </h1>
          <p className="text-muted-foreground">
            Manage static pages like About Us, Privacy Policy, Terms of Service, etc.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href={'/admin/categories/add'}>
            <Plus className="h-4 w-4" />
            Add New Category
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{result?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Static pages available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Pages</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {result?.filter((cat: any) => cat.isActive).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Publicly visible pages
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Pages</CardTitle>
            <ToggleLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {result?.filter((cat: any) => !cat.isActive).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Hidden from public view
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            A list of all category pages with their endpoints and status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DynamicDataTable
            ENDPOINT={ENDPOINTS.CATEGORIES}
            data={result}
            excludeColumns={['id', 'seoId', 'seo', 'content', 'updatedAt']}
            title='Categories'
            EDIT_NAME={'admin/categories'}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Categories; 