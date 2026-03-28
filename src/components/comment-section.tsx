'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

interface CommentSectionProps {
  blogId?: number;
  packageId?: number;
}

function timeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function CommentSection({ blogId, packageId }: CommentSectionProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const query = blogId ? `blogId=${blogId}` : `packageId=${packageId}`;
        const res = await fetchData(`${ENDPOINTS.COMMENTS_APPROVED}?${query}`);
        setComments(Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : []);
      } catch {
        setComments([]);
      }
    })();
  }, [blogId, packageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${ENDPOINTS.COMMENTS}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, blogId, packageId }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg('Your comment has been submitted and is awaiting moderation. Thank you!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setMsg(data.message || 'Failed to submit comment.');
      }
    } catch {
      setStatus('error');
      setMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <section className='mt-10 pt-8 border-t border-gray-100'>
      <h3 className='text-xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
        <MessageSquare size={20} className='text-primary' />
        Comments {comments.length > 0 && `(${comments.length})`}
      </h3>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className='space-y-4 mb-10'>
          {comments.map((c: any) => (
            <div key={c.id} className='bg-gray-50 rounded-xl p-4'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='w-9 h-9 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center shrink-0'>
                  <User size={16} className='text-primary' />
                </div>
                <div>
                  <span className='font-semibold text-gray-900 text-sm'>{c.name}</span>
                  <span className='text-gray-400 text-xs ml-2'>{timeAgo(c.createdAt)}</span>
                </div>
              </div>
              <p className='text-gray-700 text-sm leading-relaxed pl-12'>{c.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className='bg-gray-50 rounded-xl p-6 text-center text-gray-500 text-sm mb-8'>
          No comments yet. Be the first to share your experience!
        </div>
      )}

      {/* Comment Form */}
      <div className='bg-gray-50 rounded-2xl p-6'>
        <h4 className='font-bold text-gray-900 mb-4'>Leave a Comment</h4>
        {status === 'success' ? (
          <div className='text-green-600 bg-green-50 rounded-xl p-4 text-sm font-medium'>
            {msg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <input
                type='text'
                placeholder='Your name *'
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className='px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white'
              />
              <input
                type='email'
                placeholder='Your email * (not published)'
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                className='px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white'
              />
            </div>
            <textarea
              placeholder='Share your experience or question...'
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              required
              rows={4}
              className='w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white resize-none'
            />
            {status === 'error' && <p className='text-red-500 text-sm'>{msg}</p>}
            <button
              type='submit'
              disabled={status === 'loading'}
              className='flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-orange-700 transition-colors disabled:opacity-60'
            >
              <Send size={14} />
              {status === 'loading' ? 'Submitting...' : 'Submit Comment'}
            </button>
            <p className='text-gray-400 text-xs'>All comments are moderated before publishing.</p>
          </form>
        )}
      </div>
    </section>
  );
}
