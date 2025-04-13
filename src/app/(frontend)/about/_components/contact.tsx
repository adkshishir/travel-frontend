import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AboutContact() {
  return (
    <div className='mb-12'>
      <div className='mx-auto max-w-3xl text-center'>
        <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Get In Touch
        </h2>
        <p className='mt-4 text-lg text-muted-foreground'>
          Have questions or ready to plan your next adventure?
        </p>
      </div>

      <div className='mt-12 grid gap-8 md:grid-cols-2'>
        <div className='rounded-lg border bg-card p-6 shadow-sm'>
          <h3 className='text-lg font-medium'>Contact Information</h3>
          <div className='mt-6 space-y-4'>
            <div className='flex items-start gap-3'>
              <MapPin className='h-5 w-5 text-primary' />
              <div>
                <p className='font-medium'>Main Office</p>
                <p className='text-sm text-muted-foreground'>
                  123 Adventure Way, Suite 400
                  <br />
                  San Francisco, CA 94107
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <Phone className='h-5 w-5 text-primary' />
              <div>
                <p className='font-medium'>Phone</p>
                <p className='text-sm text-muted-foreground'>
                  +1 (555) 123-4567
                  <br />
                  Mon-Fri: 9am-6pm PT
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <Mail className='h-5 w-5 text-primary' />
              <div>
                <p className='font-medium'>Email</p>
                <p className='text-sm text-muted-foreground'>
                  info@wanderlustexpeditions.com
                  <br />
                  support@wanderlustexpeditions.com
                </p>
              </div>
            </div>
          </div>

          <div className='mt-8'>
            <h4 className='font-medium'>Regional Offices</h4>
            <div className='mt-4 grid gap-4 sm:grid-cols-2'>
              <div>
                <p className='font-medium'>Asia Pacific</p>
                <p className='text-sm text-muted-foreground'>
                  Bangkok, Thailand
                </p>
              </div>
              <div>
                <p className='font-medium'>Europe</p>
                <p className='text-sm text-muted-foreground'>
                  Barcelona, Spain
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='rounded-lg border bg-card p-6 shadow-sm'>
          <h3 className='text-lg font-medium'>Send Us a Message</h3>
          <form className='mt-6 space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div>
                <label htmlFor='name' className='block text-sm font-medium'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  placeholder='Your name'
                />
              </div>
              <div>
                <label htmlFor='email' className='block text-sm font-medium'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  placeholder='your.email@example.com'
                />
              </div>
            </div>

            <div>
              <label htmlFor='subject' className='block text-sm font-medium'>
                Subject
              </label>
              <input
                type='text'
                id='subject'
                className='mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                placeholder='How can we help?'
              />
            </div>

            <div>
              <label htmlFor='message' className='block text-sm font-medium'>
                Message
              </label>
              <textarea
                id='message'
                rows={4}
                className='mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                placeholder='Tell us about your travel plans or questions...'></textarea>
            </div>

            <Button type='submit' className='w-full'>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
