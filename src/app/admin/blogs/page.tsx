import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import { Plus, FileText, Calendar, User, Eye } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Blogs = async () => {
  const result = await fetchData(ENDPOINTS.BLOGS);
 
  
  // Calculate stats with proper error handling
  const totalBlogs = result.length;
  const publishedBlogs = result.filter((blog: any) => blog.isPublished === true).length;
  const recentBlogs = result.filter((blog: any) => {
    try {
      const createdAt = new Date(blog.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return createdAt > weekAgo;
    } catch {
      return false;
    }
  }).length;
  const blogsWithSEO = result.filter((blog: any) => blog.seo?.metaTitle).length;
  
  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div className='flex items-center justify-between'>
        <div className="space-y-1">
          <h1 className='text-3xl font-bold tracking-tight flex items-center gap-2'>
            <FileText className="h-8 w-8 text-primary" />
            Blogs Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage blog content to engage your audience and improve SEO rankings.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href={'/admin/blogs/add'}>
            <Plus className="h-4 w-4" />
            Write New Blog
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBlogs}</div>
            <p className="text-xs text-muted-foreground">
              Blog posts created
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedBlogs}</div>
            <p className="text-xs text-muted-foreground">
              Live blog posts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentBlogs}</div>
            <p className="text-xs text-muted-foreground">
              Recently published
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SEO Optimized</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogsWithSEO}</div>
            <p className="text-xs text-muted-foreground">
              Have meta titles
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Help Card */}
      <Card className="border-indigo-200 bg-indigo-50/50">
        <CardHeader>
          <CardTitle className="text-lg text-indigo-900">✍️ Blog Writing Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="text-indigo-800">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Content Guidelines:</h4>
              <ul className="space-y-1">
                <li>• <strong>Engaging Headlines:</strong> Use compelling, descriptive titles</li>
                <li>• <strong>Quality Content:</strong> Provide valuable, informative content</li>
                <li>• <strong>Visual Appeal:</strong> Include high-quality featured images</li>
                <li>• <strong>Author Attribution:</strong> Assign posts to appropriate authors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">SEO Optimization:</h4>
              <ul className="space-y-1">
                <li>• Add meta titles and descriptions for better search visibility</li>
                <li>• Use relevant keywords naturally in your content</li>
                <li>• Create SEO-friendly URL slugs</li>
                <li>• Add structured data (JSON-LD schema) when possible</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.BLOGS}
        data={result}
        excludeColumns={['id', '_count', 'createdAt', 'updatedAt', 'content', 'seo']}
        title='Blogs'
        EDIT_NAME={'admin/blogs'}
      />
    </div>
  );
};

export default Blogs; 