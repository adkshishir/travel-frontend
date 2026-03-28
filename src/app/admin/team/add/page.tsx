'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ENDPOINTS from '@/utils/endpoints';

export default function AddTeamMemberPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    position: '',
    facebook: '',
    twitter: '',
    linkedin: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { getCookie } = await import('@/utils/cookie-handler');
      const token = await getCookie('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${ENDPOINTS.TEAM}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
      if (res.ok) {
        toast.success('Team member added!');
        router.push('/admin/team');
      } else {
        toast.error('Failed to add team member');
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-lg'>
      <h1 className='text-2xl font-bold mb-6'>Add Team Member</h1>
      <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl border'>
        {[
          { key: 'name', label: 'Name *', required: true },
          { key: 'position', label: 'Position / Role', required: false },
          { key: 'facebook', label: 'Facebook URL', required: false },
          { key: 'twitter', label: 'Twitter URL', required: false },
          { key: 'linkedin', label: 'LinkedIn URL', required: false },
        ].map(({ key, label, required }) => (
          <div key={key}>
            <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
            <input
              type='text'
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              required={required}
              className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20'
            />
          </div>
        ))}
        <div className='flex gap-3 pt-2'>
          <button
            type='submit'
            disabled={loading}
            className='bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 disabled:opacity-60'
          >
            {loading ? 'Saving...' : 'Add Member'}
          </button>
          <button
            type='button'
            onClick={() => router.back()}
            className='border border-gray-200 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
