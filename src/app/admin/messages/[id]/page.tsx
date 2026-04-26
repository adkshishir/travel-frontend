import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { notFound } from 'next/navigation';
import { Mail, Phone, User, Calendar, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface MessageDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const MessageDetailPage = async ({ params }: MessageDetailPageProps) => {
  const { id } = await params;
  
  try {
    const message = await fetchData(`${ENDPOINTS.MAIL}/${id}`);
    
    if (!message) {
      notFound();
    }

    const formatDate = (date: string) => {
      return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/messages">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Messages
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contact Message Details</h1>
            <p className="text-muted-foreground">
              View and manage contact form submission
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Message Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Message Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Subject/Inquiry</h3>
                  <p className="text-gray-600">
                    {message.name ? `Message from ${message.name}` : 'Contact Form Submission'}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Message</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {message.message || 'No message content provided.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Received on {formatDate(message.createdAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">
                          {message.name || 'Name not provided'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{message.email}</p>
                        <a 
                          href={`mailto:${message.email}`}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Send Email
                        </a>
                      </div>
                    </div>

                    {message.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">{message.phone}</p>
                          <a 
                            href={`tel:${message.phone}`}
                            className="text-xs text-green-600 hover:underline"
                          >
                            Call Now
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button 
                      asChild 
                      className="w-full"
                      size="sm"
                    >
                      <a href={`mailto:${message.email}?subject=Re: Your inquiry to Traveltreks`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Reply via Email
                      </a>
                    </Button>

                    {message.phone && (
                      <Button 
                        variant="outline" 
                        asChild 
                        className="w-full"
                        size="sm"
                      >
                        <a href={`tel:${message.phone}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call Customer
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Message Info</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Message ID:</span>
                      <span className="font-mono">#{message.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Received:</span>
                      <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                    </div>
                    {message.updatedAt !== message.createdAt && (
                      <div className="flex justify-between">
                        <span>Updated:</span>
                        <span>{new Date(message.updatedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Response Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Response Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Trek Information Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    For customers asking about trek details, difficulty, or recommendations.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                  >
                    <a href={`mailto:${message.email}?subject=Trek Information - Traveltreks&body=Dear ${message.name || 'Valued Customer'},%0D%0A%0D%0AThank you for your interest in our trekking packages. I'd be happy to provide you with detailed information about our treks.%0D%0A%0D%0ABased on your inquiry, I recommend...%0D%0A%0D%0ABest regards,%0D%0ATraveltreks Team`}>
                      Use Template
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Booking Assistance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    For customers needing help with bookings or payments.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    asChild
                  >
                    <a href={`mailto:${message.email}?subject=Booking Assistance - Traveltreks&body=Dear ${message.name || 'Valued Customer'},%0D%0A%0D%0AThank you for choosing Traveltreks. I'm here to assist you with your booking process.%0D%0A%0D%0ATo complete your booking, please...%0D%0A%0D%0ABest regards,%0D%0ATraveltreks Team`}>
                      Use Template
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error('Error fetching message:', error);
    notFound();
  }
};

export default MessageDetailPage; 