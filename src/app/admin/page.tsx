import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { 
  Activity, 
  MapPin, 
  Package, 
  FileText, 
  Users, 
  Star, 
  TrendingUp, 
  Calendar,
  Plus,
  BarChart3,
  Eye,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

const AdminDashboard = async () => {
  // Fetch data for dashboard stats with proper error handling
  const [activitiesRes, destinationsRes, packagesRes, blogsRes, reviewsRes] = await Promise.all([
    fetchData(ENDPOINTS.ACTIVITIES).catch(() => ([])),
    fetchData(ENDPOINTS.DESTINATIONS).catch(() => ([])),
    fetchData(ENDPOINTS.PACKAGES).catch(() => ([])),
    fetchData(ENDPOINTS.BLOGS).catch(() => ([])),
    fetchData(ENDPOINTS.REVIEWS).catch(() => ([]))
  ]);

  const activities = activitiesRes || [];
  const destinations = destinationsRes || [];
  const packages = packagesRes || [];
  const blogs = blogsRes || [];
  const reviews = reviewsRes || [];

  // Calculate stats with proper error handling
  const totalRevenue = packages.reduce((sum: number, pkg: any) => {
    const price = parseFloat(pkg.price);
    return sum + (isNaN(price) ? 0 : price);
  }, 0);
  
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum: number, review: any) => {
        const rating = parseFloat(review.rating);
        return sum + (isNaN(rating) ? 0 : rating);
      }, 0) / reviews.length 
    : 0;
    
  const recentBlogs = blogs.filter((blog: any) => {
    try {
      const createdAt = new Date(blog.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return createdAt > weekAgo;
    } catch {
      return false;
    }
  }).length;

  // Quick actions data
  const quickActions = [
    {
      title: 'Add New Package',
      description: 'Create a new travel package',
      href: '/admin/packages/add',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Add Destination',
      description: 'Add a new travel destination',
      href: '/admin/destinations/add',
      icon: MapPin,
      color: 'bg-green-500'
    },
    {
      title: 'Write Blog Post',
      description: 'Create new blog content',
      href: '/admin/blogs/add',
      icon: FileText,
      color: 'bg-purple-500'
    },
    {
      title: 'Add Activity',
      description: 'Create new activity category',
      href: '/admin/activities/add',
      icon: Activity,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's an overview of your travel business.
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From {packages.length} packages
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{packages.length}</div>
            <p className="text-xs text-muted-foreground">
              Across {destinations.length} destinations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              From {reviews.length} reviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogs.length}</div>
            <p className="text-xs text-muted-foreground">
              {recentBlogs} published this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Content Overview */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Content Overview</CardTitle>
            <CardDescription>
              Your content management summary
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">Activities</p>
                      <p className="text-sm text-muted-foreground">Adventure categories</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{activities.length}</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="font-medium">Destinations</p>
                      <p className="text-sm text-muted-foreground">Travel locations</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{destinations.length}</Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Package className="h-8 w-8 text-purple-500" />
                    <div>
                      <p className="font-medium">Packages</p>
                      <p className="text-sm text-muted-foreground">Travel offerings</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{packages.length}</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-orange-500" />
                    <div>
                      <p className="font-medium">Blog Posts</p>
                      <p className="text-sm text-muted-foreground">Content articles</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{blogs.length}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button key={index} asChild variant="outline" className="w-full justify-start h-auto p-4">
                <Link href={action.href}>
                  <div className={`p-2 rounded-md ${action.color} mr-3`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Content Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/activities">
                <Activity className="mr-2 h-4 w-4" />
                Manage Activities
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/destinations">
                <MapPin className="mr-2 h-4 w-4" />
                Manage Destinations
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/packages">
                <Package className="mr-2 h-4 w-4" />
                Manage Packages
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/categories">
                <FileText className="mr-2 h-4 w-4" />
                Manage Categories
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Content & Media
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/blogs">
                <FileText className="mr-2 h-4 w-4" />
                Manage Blogs
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/authors">
                <Users className="mr-2 h-4 w-4" />
                Manage Authors
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/carousels">
                <Eye className="mr-2 h-4 w-4" />
                Manage Carousels
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Customer Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/reviews">
                <Star className="mr-2 h-4 w-4" />
                Manage Reviews
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/admin/faq">
                <FileText className="mr-2 h-4 w-4" />
                Manage FAQs
              </Link>
            </Button>
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Average rating: <span className="font-medium">{averageRating.toFixed(1)}/5</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips for Administrators */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardHeader>
          <CardTitle className="text-amber-900">💡 Admin Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-amber-800">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Daily Tasks:</h4>
              <ul className="space-y-1">
                <li>• Check new reviews and respond</li>
                <li>• Update package availability</li>
                <li>• Review booking inquiries</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Weekly Tasks:</h4>
              <ul className="space-y-1">
                <li>• Publish new blog content</li>
                <li>• Update seasonal packages</li>
                <li>• Review and optimize SEO</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Monthly Tasks:</h4>
              <ul className="space-y-1">
                <li>• Analyze booking trends</li>
                <li>• Update destination information</li>
                <li>• Review pricing strategies</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;