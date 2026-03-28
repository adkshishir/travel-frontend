import { fetchData } from '@/utils/request-intregation';
import { Mail, Users, Download } from 'lucide-react';
import React from 'react';

const BASE = process.env.NEXT_PUBLIC_API_URL + '/api';

const NewsletterAdminPage = async () => {
  const res = await fetchData('newsletter?limit=100');
  const subscribers = Array.isArray(res?.data?.items) ? res.data.items : [];
  const total = res?.data?.total || subscribers.length;

  return (
    <div className='space-y-6'>
      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='bg-white rounded-xl border p-5 flex items-center gap-4'>
          <div className='w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center'>
            <Users size={22} className='text-primary' />
          </div>
          <div>
            <div className='text-2xl font-bold text-gray-900'>{total}</div>
            <div className='text-sm text-gray-500'>Total Subscribers</div>
          </div>
        </div>
        <div className='bg-white rounded-xl border p-5 flex items-center gap-4'>
          <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center'>
            <Mail size={22} className='text-green-600' />
          </div>
          <div>
            <div className='text-2xl font-bold text-gray-900'>{subscribers.filter((s: any) => s.isActive).length}</div>
            <div className='text-sm text-gray-500'>Active Subscribers</div>
          </div>
        </div>
        <div className='bg-white rounded-xl border p-5'>
          <p className='text-sm text-gray-500 mb-3'>Export all subscriber emails</p>
          <button
            onClick={() => {
              const emails = subscribers.map((s: any) => s.email).join('\n');
              const blob = new Blob([emails], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'newsletter-subscribers.txt';
              a.click();
            }}
            className='flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors'
          >
            <Download size={14} /> Export Emails
          </button>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className='bg-white rounded-xl border overflow-hidden'>
        <div className='px-6 py-4 border-b'>
          <h2 className='font-semibold text-gray-900'>Newsletter Subscribers</h2>
        </div>
        {subscribers.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b bg-gray-50'>
                  <th className='text-left px-6 py-3 font-medium text-gray-500'>#</th>
                  <th className='text-left px-6 py-3 font-medium text-gray-500'>Email</th>
                  <th className='text-left px-6 py-3 font-medium text-gray-500'>Name</th>
                  <th className='text-left px-6 py-3 font-medium text-gray-500'>Status</th>
                  <th className='text-left px-6 py-3 font-medium text-gray-500'>Subscribed</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {subscribers.map((sub: any, i: number) => (
                  <tr key={sub.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-3 text-gray-400'>{i + 1}</td>
                    <td className='px-6 py-3 font-medium text-gray-900'>{sub.email}</td>
                    <td className='px-6 py-3 text-gray-600'>{sub.name || '—'}</td>
                    <td className='px-6 py-3'>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sub.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {sub.isActive ? 'Active' : 'Unsubscribed'}
                      </span>
                    </td>
                    <td className='px-6 py-3 text-gray-500'>
                      {new Date(sub.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='text-center py-12 text-gray-500'>
            <Mail size={48} className='mx-auto mb-4 text-gray-300' />
            <p className='font-medium'>No subscribers yet</p>
            <p className='text-sm mt-1'>Newsletter subscriptions will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterAdminPage;
