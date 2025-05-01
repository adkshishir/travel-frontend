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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  // Example form configuration
  const userFormConfig: FormConfig = {
    fields: [
      {
        name: 'fullName',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter your full name',
        required: true,
        validation: {
          minLength: 2,
          maxLength: 50,
        },
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'your.email@example.com',
        required: true,
        description: "We'll never share your email with anyone else.",
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Create a password',
        required: true,
        validation: {
          minLength: 8,
          pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$',
        },
        description:
          'Password must contain at least 8 characters, including uppercase, lowercase, and numbers.',
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number',
        placeholder: 'Enter your age',
        validation: {
          min: 18,
          max: 120,
        },
      },
      {
        name: 'birthdate',
        label: 'Date of Birth',
        type: 'date',
        description: 'Select your date of birth',
      },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: [
          { label: 'Developer', value: 'developer' },
          { label: 'Designer', value: 'designer' },
          { label: 'Product Manager', value: 'product_manager' },
          { label: 'Other', value: 'other' },
        ],
        description: 'Select your primary role',
      },
      {
        name: 'experience',
        label: 'Experience Level',
        type: 'radio',
        options: [
          { label: 'Beginner', value: 'beginner' },
          { label: 'Intermediate', value: 'intermediate' },
          { label: 'Advanced', value: 'advanced' },
        ],
      },
      {
        name: 'bio',
        label: 'Bio',
        type: 'textarea',
        placeholder: 'Tell us about yourself',
      },
      {
        name: 'receiveEmails',
        label: 'Receive promotional emails',
        type: 'switch',
        defaultValue: true,
      },
      {
        name: 'termsAccepted',
        label: 'I accept the terms and conditions',
        type: 'checkbox',
        required: true,
      },
    ],
    submitLabel: 'Create Account',
  };

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setFormData(data);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className='container mx-auto py-10'>
      <div className='max-w-2xl mx-auto'>
        <Card>
          <CardHeader>
            <CardTitle>Dynamic Form Example</CardTitle>
            <CardDescription>
              This form is generated dynamically based on a configuration object
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <Alert className='bg-green-50 border-green-200'>
                <CheckCircle className='h-4 w-4 text-green-600' />
                <AlertTitle className='text-green-800'>Success!</AlertTitle>
                <AlertDescription className='text-green-700'>
                  Your form has been submitted successfully.
                </AlertDescription>
                <pre className='mt-4 p-4 bg-white border rounded-md text-sm overflow-auto'>
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </Alert>
            ) : (
              <DynamicForm config={userFormConfig} onSubmit={handleSubmit} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
