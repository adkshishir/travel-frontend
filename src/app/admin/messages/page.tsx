import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Clock,
  User,
  Calendar
} from 'lucide-react';
import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';

const ContactMessagesPage = async () => {
  const result = await fetchData(ENDPOINTS.MAIL);
  const messages = result || [];

  // Calculate stats
  const totalMessages = messages.length;
  const todaysMessages = messages.filter((msg: any) => {
    const today = new Date().toDateString();
    const msgDate = new Date(msg.createdAt).toDateString();
    return today === msgDate;
  }).length;
  
  const thisWeekMessages = messages.filter((msg: any) => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(msg.createdAt) > weekAgo;
  }).length;

  const messagesWithPhone = messages.filter((msg: any) => msg.phone && msg.phone.trim()).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
        <p className="text-muted-foreground">
          Manage and respond to customer contact form submissions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              All time messages
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysMessages}</div>
            <p className="text-xs text-muted-foreground">
              Messages received today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisWeekMessages}</div>
            <p className="text-xs text-muted-foreground">
              Messages this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Phone</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messagesWithPhone}</div>
            <p className="text-xs text-muted-foreground">
              Messages with phone numbers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Help Card */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="text-lg text-green-900">💬 Contact Management Guide</CardTitle>
        </CardHeader>
        <CardContent className="text-green-800">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Message Types:</h4>
              <ul className="space-y-1">
                <li>• <strong>Trek Inquiries:</strong> Questions about specific treks</li>
                <li>• <strong>Booking Support:</strong> Help with reservations</li>
                <li>• <strong>General Info:</strong> Company and service questions</li>
                <li>• <strong>Emergency:</strong> Urgent trek-related matters</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Response Guidelines:</h4>
              <ul className="space-y-1">
                <li>• Respond to all inquiries within 24 hours</li>
                <li>• Prioritize emergency and booking-related messages</li>
                <li>• Include detailed trek information in responses</li>
                <li>• Follow up on potential bookings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.MAIL}
        data={messages}
        excludeColumns={[
          'id', 
          'updatedAt', 
          'mediaId',
          'Media'
        ]}
        title='Contact Messages'
        EDIT_NAME={'admin/messages'}
      />
    </div>
  );
};

export default ContactMessagesPage; 