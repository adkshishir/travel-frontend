'use client';

import { useState } from 'react';
import { DynamicForm, type FormConfig } from '@/components/admin-dynamics/form/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ExamplePage() {
  const [loginData, setLoginData] = useState<any>(null);
  const [contactData, setContactData] = useState<any>(null);
  const [surveyData, setSurveyData] = useState<any>(null);

  // Login form configuration
  const loginFormConfig: FormConfig = {
    fields: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        required: true,
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        required: true,
      },
      {
        name: 'rememberMe',
        label: 'Remember me',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
    submitLabel: 'Sign In',
  };

  // Contact form configuration
  const contactFormConfig: FormConfig = {
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Your name',
        required: true,
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Your email',
        required: true,
      },
      {
        name: 'subject',
        label: 'Subject',
        type: 'select',
        options: [
          { label: 'General Inquiry', value: 'general' },
          { label: 'Technical Support', value: 'support' },
          { label: 'Billing Question', value: 'billing' },
          { label: 'Feature Request', value: 'feature' },
        ],
        required: true,
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Your message',
        required: true,
      },
    ],
    submitLabel: 'Send Message',
  };

  // Survey form configuration
  const surveyFormConfig: FormConfig = {
    fields: [
      {
        name: 'satisfaction',
        label: 'How satisfied are you with our product?',
        type: 'radio',
        options: [
          { label: 'Very Satisfied', value: 'very_satisfied' },
          { label: 'Satisfied', value: 'satisfied' },
          { label: 'Neutral', value: 'neutral' },
          { label: 'Dissatisfied', value: 'dissatisfied' },
          { label: 'Very Dissatisfied', value: 'very_dissatisfied' },
        ],
        required: true,
      },
      {
        name: 'usageFrequency',
        label: 'How often do you use our product?',
        type: 'select',
        options: [
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'Rarely', value: 'rarely' },
        ],
        required: true,
      },
      {
        name: 'features',
        label: 'Which features do you use most?',
        type: 'textarea',
        placeholder: 'Please describe the features you use most',
      },
      {
        name: 'recommendLikelihood',
        label: 'How likely are you to recommend our product?',
        type: 'number',
        validation: {
          min: 1,
          max: 10,
        },
        description: 'On a scale from 1 to 10',
        required: true,
      },
      {
        name: 'futureUpdates',
        label: 'Would you like to be notified about future updates?',
        type: 'switch',
        defaultValue: true,
      },
    ],
    submitLabel: 'Submit Survey',
  };

  const handleLoginSubmit = (data: any) => {
    setLoginData(data);
  };

  const handleContactSubmit = (data: any) => {
    setContactData(data);
  };

  const handleSurveySubmit = (data: any) => {
    setSurveyData(data);
  };

  return (
    <div className='container mx-auto py-10'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-center'>
          Dynamic Form Examples
        </h1>

        <Tabs defaultValue='login' className='w-full'>
          <TabsList className='grid grid-cols-3 mb-6'>
            <TabsTrigger value='login'>Login</TabsTrigger>
            <TabsTrigger value='contact'>Contact</TabsTrigger>
            <TabsTrigger value='survey'>Survey</TabsTrigger>
          </TabsList>

          <TabsContent value='login'>
            <Card>
              <CardHeader>
                <CardTitle>Login Form</CardTitle>
                <CardDescription>
                  A simple login form generated from configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DynamicForm
                  config={loginFormConfig}
                  onSubmit={handleLoginSubmit}
                />

                {loginData && (
                  <div className='mt-6 p-4 bg-gray-50 rounded-md'>
                    <h3 className='font-medium mb-2'>Submitted Data:</h3>
                    <pre className='text-sm overflow-auto'>
                      {JSON.stringify(loginData, null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='contact'>
            <Card>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>
                  A contact form with various field types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DynamicForm
                  config={contactFormConfig}
                  onSubmit={handleContactSubmit}
                />

                {contactData && (
                  <div className='mt-6 p-4 bg-gray-50 rounded-md'>
                    <h3 className='font-medium mb-2'>Submitted Data:</h3>
                    <pre className='text-sm overflow-auto'>
                      {JSON.stringify(contactData, null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='survey'>
            <Card>
              <CardHeader>
                <CardTitle>Survey Form</CardTitle>
                <CardDescription>
                  A more complex survey form with various field types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DynamicForm
                  config={surveyFormConfig}
                  onSubmit={handleSurveySubmit}
                />

                {surveyData && (
                  <div className='mt-6 p-4 bg-gray-50 rounded-md'>
                    <h3 className='font-medium mb-2'>Submitted Data:</h3>
                    <pre className='text-sm overflow-auto'>
                      {JSON.stringify(surveyData, null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
