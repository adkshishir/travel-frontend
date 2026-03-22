import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import { Plus, Activity } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Activities = async () => {
  const result = await fetchData(ENDPOINTS.ACTIVITIES);
  const activities = result?.items || [];

  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div className='flex items-center justify-between'>
        <div className="space-y-1">
          <h1 className='text-3xl font-bold tracking-tight flex items-center gap-2'>
            <Activity className="h-8 w-8 text-primary" />
            Activities Management
          </h1>
          <p className="text-muted-foreground">
            Manage adventure activities that customers can book. Activities contain destinations and packages.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href={'/admin/activities/add'}>
            <Plus className="h-4 w-4" />
            Add New Activity
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activities.length}</div>
            <p className="text-xs text-muted-foreground">
              Active adventure categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Destinations</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activities.filter((activity: any) => activity.destinations?.length > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Activities with destinations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recently Updated</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activities.filter((activity: any) => {
                try {
                  const updatedAt = new Date(activity.updatedAt);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return updatedAt > weekAgo;
                } catch {
                  return false;
                }
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Updated this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Help Card */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">💡 Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <ul className="space-y-2 text-sm">
            <li>• <strong>Activities</strong> are the main categories (e.g., Trekking, Rafting, Cultural Tours)</li>
            <li>• Each activity can have multiple <strong>destinations</strong> where it's offered</li>
            <li>• Make sure to add SEO information to improve search rankings</li>
            <li>• Use clear, descriptive names that customers will understand</li>
          </ul>
        </CardContent>
      </Card>

      {/* Data Table */}
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.ACTIVITIES}
        data={activities}
        excludeColumns={['id', '_count', 'createdAt', 'updatedAt']}
        title='Activities'
        EDIT_NAME={'admin/activities'}
      />
    </div>
  );
};

export default Activities;
