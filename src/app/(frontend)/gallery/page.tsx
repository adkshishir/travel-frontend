'use client';

import Banner from '@/components/banner';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, Images } from 'lucide-react';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData(ENDPOINTS.UPLOAD);
        const all = Array.isArray(res?.items) ? res.items : Array.isArray(res) ? res : [];
        setImages(all.filter((img: any) => img.original || img.thumbnail));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = ['all', 'trekking', 'culture', 'nature', 'wildlife'];
  const filtered = filter === 'all' ? images : images.filter((img: any) =>
    img.alt?.toLowerCase().includes(filter) || img.type?.toLowerCase().includes(filter)
  );

  return (
    <main>
      <Banner
        title='Photo Gallery'
        pageName='Gallery'
        breadcrumb={[{ name: 'Home', href: '/' }]}
        image='/images/hero.jpg'
      />

      <section className='max-w-[1180px] mx-auto px-4 py-16'>
        <div className='text-center mb-10'>
          <span className='inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-widest uppercase mb-3'>
            <Images size={16} /> Visual Journey
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Moments From The Mountains
          </h2>
          <p className='text-gray-600 max-w-xl mx-auto'>
            A glimpse of the breathtaking landscapes, vibrant cultures, and unforgettable moments from our treks.
          </p>
        </div>

        {/* Filter tabs */}
        <div className='flex flex-wrap gap-3 justify-center mb-10'>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                filter === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className='aspect-square bg-gray-100 rounded-xl animate-pulse' />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className='columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'>
            {filtered.map((img: any, i: number) => (
              <div
                key={img.id || i}
                className='relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid mb-4'
                onClick={() => setSelected(img)}
              >
                <Image
                  src={img.thumbnail || img.original}
                  alt={img.alt || `Gallery image ${i + 1}`}
                  width={400}
                  height={300}
                  className='w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500'
                  style={{ height: 'auto' }}
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center rounded-xl'>
                  <ZoomIn className='text-white opacity-0 group-hover:opacity-100 transition-opacity' size={32} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-20 text-gray-500'>
            <Images size={48} className='mx-auto mb-4 text-gray-300' />
            <p className='text-lg font-medium'>Gallery photos coming soon</p>
            <p className='text-sm mt-1'>Check back for stunning trek photography</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4'
          onClick={() => setSelected(null)}
        >
          <button
            className='absolute top-4 right-4 text-white bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors'
            onClick={() => setSelected(null)}
          >
            <X size={24} />
          </button>
          <div className='relative max-w-4xl max-h-[90vh] w-full' onClick={(e) => e.stopPropagation()}>
            <Image
              src={selected.original || selected.thumbnail}
              alt={selected.alt || 'Gallery image'}
              width={1200}
              height={800}
              className='object-contain w-full h-full max-h-[85vh] rounded-lg'
              style={{ objectFit: 'contain' }}
            />
            {selected.alt && (
              <p className='text-white/80 text-center text-sm mt-3'>{selected.alt}</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
