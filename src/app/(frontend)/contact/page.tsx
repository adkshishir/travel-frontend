'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { postAndPatch } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Message is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim() || undefined,
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        message: formData.message.trim(),
      };

      await postAndPatch(ENDPOINTS.MAIL, payload);
      
      toast.success('Thank you! Your message has been sent successfully. We will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='mt-20 max-w-[1180px] mx-auto my-16 px-4'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          Contact Us
        </h1>
        <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
          Have questions about our treks or need assistance planning your adventure? 
          We're here to help! Get in touch with our experienced team.
        </p>
      </div>

      <div className='grid gap-8 lg:grid-cols-3'>
        {/* Contact Information */}
        <div className='lg:col-span-1'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Phone className='h-5 w-5' />
                Get in Touch
              </CardTitle>
              <CardDescription>
                Reach out to us through any of these channels
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-start gap-3'>
                <Mail className='h-5 w-5 text-blue-500 mt-0.5' />
                <div>
                  <h3 className='font-medium text-gray-900'>Email</h3>
                  <p className='text-gray-600'>info@poonhilltreks.com</p>
                  <p className='text-gray-600'>support@poonhilltreks.com</p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <Phone className='h-5 w-5 text-green-500 mt-0.5' />
                <div>
                  <h3 className='font-medium text-gray-900'>Phone</h3>
                  <p className='text-gray-600'>+977 1 234 5678</p>
                  <p className='text-gray-600'>+977 9876 543 210</p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <MapPin className='h-5 w-5 text-red-500 mt-0.5' />
                <div>
                  <h3 className='font-medium text-gray-900'>Office</h3>
                  <p className='text-gray-600'>
                    Thamel, Kathmandu<br />
                    Nepal, 44600
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-3'>
                <Clock className='h-5 w-5 text-orange-500 mt-0.5' />
                <div>
                  <h3 className='font-medium text-gray-900'>Business Hours</h3>
                  <p className='text-gray-600'>
                    Mon - Fri: 9:00 AM - 6:00 PM<br />
                    Sat: 9:00 AM - 4:00 PM<br />
                    Sun: Closed
                  </p>
                </div>
              </div>

              <div className='pt-4 border-t'>
                <h3 className='font-medium text-gray-900 mb-2'>Emergency Contact</h3>
                <p className='text-sm text-gray-600'>
                  For urgent matters during treks:<br />
                  <span className='font-medium'>+977 9801 234 567</span><br />
                  Available 24/7
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Send className='h-5 w-5' />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div>
                    <Label htmlFor='name'>Full Name</Label>
                    <Input
                      id='name'
                      type='text'
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder='Your full name'
                      className='mt-1'
                    />
                  </div>

                  <div>
                    <Label htmlFor='email'>Email Address *</Label>
                    <Input
                      id='email'
                      type='email'
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder='your.email@example.com'
                      className='mt-1'
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor='phone'>Phone Number</Label>
                  <Input
                    id='phone'
                    type='tel'
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder='Your phone number'
                    className='mt-1'
                  />
                </div>

                <div>
                  <Label htmlFor='message'>Message *</Label>
                  <Textarea
                    id='message'
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder='Tell us about your trek interests, questions, or how we can help you...'
                    className='mt-1 min-h-[120px]'
                    required
                  />
                </div>

                <Button 
                  type='submit' 
                  className='w-full md:w-auto px-8'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className='h-4 w-4 mr-2' />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Information */}
      <div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Trek Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-gray-600 text-sm'>
              Questions about specific treks, difficulty levels, best seasons, 
              or custom itineraries? Our trek specialists are here to help.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Booking Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-gray-600 text-sm'>
              Need assistance with booking, payments, or changes to existing 
              reservations? Our booking team will guide you through the process.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Emergency Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-gray-600 text-sm'>
              24/7 emergency support for trekkers currently on expeditions. 
              Safety is our top priority and help is always available.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ContactPage; 