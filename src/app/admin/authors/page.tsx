import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import { Plus, User, FileText, Calendar, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Authors = async () => {
  const resultRes = await fetchData(ENDPOINTS.AUTHORS).catch(() => ({}));
  const result = resultRes?.items || [];


  // Calculate stats
  const totalAuthors = result?.length;
  const activeAuthors = result?.filter((author: any) => author.status === 'active').length;
  const authorsWithBio = result?.filter((author: any) => author.bio).length;
  const authorsWithWebsite = result?.filter((author: any) => author.website).length;
  
  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div className='flex items-center justify-between'>
        <div className="space-y-1">
          <h1 className='text-3xl font-bold tracking-tight flex items-center gap-2'>
            <User className="h-8 w-8 text-primary" />
            Authors Management
          </h1>
          <p className="text-muted-foreground">
            Manage blog authors who create content for your website. Authors can write and publish blog posts.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href={'/admin/authors/add'}>
            <Plus className="h-4 w-4" />
            Add New Author
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Authors</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAuthors}</div>
            <p className="text-xs text-muted-foreground">
              Registered authors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Authors</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAuthors}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Bio</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authorsWithBio}</div>
            <p className="text-xs text-muted-foreground">
              Have complete profiles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Website</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authorsWithWebsite}</div>
            <p className="text-xs text-muted-foreground">
              Have personal websites
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Help Card */}
      <Card className="border-teal-200 bg-teal-50/50">
        <CardHeader>
          <CardTitle className="text-lg text-teal-900">👤 Author Management Guide</CardTitle>
        </CardHeader>
        <CardContent className="text-teal-800">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Author Information:</h4>
              <ul className="space-y-1">
                <li>• <strong>Name:</strong> Author's full display name</li>
                <li>• <strong>Username:</strong> Unique identifier for the author</li>
                <li>• <strong>Email:</strong> Contact email (must be unique)</li>
                <li>• <strong>Bio:</strong> Brief description of the author</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Best Practices:</h4>
              <ul className="space-y-1">
                <li>• Add professional profile photos</li>
                <li>• Write compelling author bios</li>
                <li>• Include social media links when appropriate</li>
                <li>• Keep author information up to date</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.AUTHORS}
        data={result}
        excludeColumns={['id', 'createdAt', 'updatedAt', 'socialLinks', 'media']}
        title='Authors'
        EDIT_NAME={'admin/authors'}
      />
    </div>
  );
};

export default Authors; 