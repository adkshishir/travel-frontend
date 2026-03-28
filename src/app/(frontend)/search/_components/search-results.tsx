'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PackageCard from '@/components/packages/package-card';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

const DIFFICULTY_OPTIONS = ['Easy', 'Moderate', 'Challenging', 'Strenuous'];
const SEASON_OPTIONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
const DURATION_RANGES = [
  { label: 'Any Duration', value: '' },
  { label: '1–5 Days', value: '1-5' },
  { label: '6–10 Days', value: '6-10' },
  { label: '11–15 Days', value: '11-15' },
  { label: '16+ Days', value: '16-30' },
];
const PRICE_RANGES = [
  { label: 'Any Budget', value: '' },
  { label: 'Under $500', value: '0-500' },
  { label: '$500 – $1,000', value: '500-1000' },
  { label: '$1,000 – $2,000', value: '1000-2000' },
  { label: '$2,000+', value: '2000-99999' },
];

interface SearchResultsProps {
  activities: any[];
  initialParams: Record<string, string | string[] | undefined>;
}

export default function SearchResults({ activities, initialParams }: SearchResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState({
    q: (initialParams.q as string) || '',
    activity: (initialParams.activity as string) || '',
    duration: (initialParams.duration as string) || '',
    price: (initialParams.price as string) || '',
    difficulty: (initialParams.difficulty as string) || '',
    season: (initialParams.season as string) || '',
  });

  const fetchPackages = useCallback(async (f: typeof filters) => {
    setLoading(true);
    try {
      const queryParts: string[] = [];
      if (f.q) queryParts.push(`search=${encodeURIComponent(f.q)}`);
      if (f.activity) queryParts.push(`activity=${encodeURIComponent(f.activity)}`);
      if (f.duration) {
        const [min, max] = f.duration.split('-');
        if (min) queryParts.push(`minDuration=${min}`);
        if (max) queryParts.push(`maxDuration=${max}`);
      }
      if (f.price) {
        const [min, max] = f.price.split('-');
        if (min) queryParts.push(`minPrice=${min}`);
        if (max) queryParts.push(`maxPrice=${max}`);
      }
      if (f.difficulty) queryParts.push(`difficulty=${encodeURIComponent(f.difficulty)}`);
      if (f.season) queryParts.push(`bestSeason=${encodeURIComponent(f.season)}`);

      const endpoint = queryParts.length
        ? `${ENDPOINTS.PACKAGES}/search?${queryParts.join('&')}&limit=24`
        : `${ENDPOINTS.PACKAGES}?limit=24`;

      const res = await fetchData(endpoint);
      const items = Array.isArray(res?.items) ? res.items : Array.isArray(res) ? res : [];
      setPackages(items);
      setTotal(res?.total || items.length);
    } catch {
      setPackages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages(filters);
  }, []);

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
    router.push(`/search?${params.toString()}`, { scroll: false });
    fetchPackages(filters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    const cleared = { q: '', activity: '', duration: '', price: '', difficulty: '', season: '' };
    setFilters(cleared);
    router.push('/search', { scroll: false });
    fetchPackages(cleared);
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <section className='max-w-[1180px] mx-auto px-4 py-8'>
      {/* Search Bar */}
      <div className='flex gap-3 mb-6'>
        <div className='flex-1 relative'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
          <input
            type='text'
            placeholder='Search packages, destinations, activities...'
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
            className='w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm'
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-5 py-3.5 rounded-xl border text-sm font-medium transition-colors ${showFilters ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-700 hover:border-primary hover:text-primary'}`}
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className='w-5 h-5 bg-white text-primary rounded-full text-xs font-bold flex items-center justify-center'>
              {Object.values(filters).filter(Boolean).length}
            </span>
          )}
        </button>
        <button
          onClick={applyFilters}
          className='px-6 py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-orange-700 transition-colors'
        >
          Search
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className='bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-100'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
            {/* Activity */}
            <div>
              <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'>Activity Type</label>
              <div className='relative'>
                <select
                  value={filters.activity}
                  onChange={(e) => setFilters((f) => ({ ...f, activity: e.target.value }))}
                  className='w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white'
                >
                  <option value=''>All Activities</option>
                  {activities.map((a: any) => (
                    <option key={a.id} value={a.slug}>{a.name}</option>
                  ))}
                </select>
                <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' size={16} />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'>Duration</label>
              <div className='relative'>
                <select
                  value={filters.duration}
                  onChange={(e) => setFilters((f) => ({ ...f, duration: e.target.value }))}
                  className='w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white'
                >
                  {DURATION_RANGES.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
                <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' size={16} />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'>Budget (USD)</label>
              <div className='relative'>
                <select
                  value={filters.price}
                  onChange={(e) => setFilters((f) => ({ ...f, price: e.target.value }))}
                  className='w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white'
                >
                  {PRICE_RANGES.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
                <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' size={16} />
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'>Difficulty</label>
              <div className='flex flex-wrap gap-2'>
                {DIFFICULTY_OPTIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setFilters((f) => ({ ...f, difficulty: f.difficulty === d ? '' : d }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filters.difficulty === d ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Best Season */}
            <div>
              <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2'>Best Season</label>
              <div className='flex flex-wrap gap-2'>
                {SEASON_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilters((f) => ({ ...f, season: f.season === s ? '' : s }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filters.season === s ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className='flex gap-3 justify-end border-t border-gray-200 pt-4'>
            <button onClick={clearFilters} className='flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 px-4 py-2'>
              <X size={14} /> Clear All
            </button>
            <button onClick={applyFilters} className='bg-primary text-white text-sm font-semibold px-6 py-2 rounded-xl hover:bg-orange-700 transition-colors'>
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className='flex items-center justify-between mb-6'>
        <p className='text-gray-600 text-sm'>
          {loading ? 'Searching...' : `${total} package${total !== 1 ? 's' : ''} found`}
        </p>
        {hasActiveFilters && (
          <button onClick={clearFilters} className='text-sm text-primary hover:underline flex items-center gap-1'>
            <X size={12} /> Clear filters
          </button>
        )}
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className='rounded-2xl overflow-hidden border border-gray-100 animate-pulse'>
              <div className='h-52 bg-gray-200' />
              <div className='p-4 space-y-3'>
                <div className='h-4 bg-gray-200 rounded w-2/3' />
                <div className='h-5 bg-gray-200 rounded' />
                <div className='h-4 bg-gray-200 rounded w-1/2' />
              </div>
            </div>
          ))}
        </div>
      ) : packages.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {packages.map((pkg: any) => (
            <Link
              key={pkg.id}
              href={`/${pkg.destination?.activity?.slug || 'trekking'}/${pkg.destination?.slug || 'destination'}/${pkg.slug}`}
            >
              <PackageCard
                title={pkg.title}
                location={pkg.destination?.name || 'Nepal'}
                image={pkg.mainImage?.thumbnail || pkg.mainImage?.original || (pkg.media?.[0]?.thumbnail) || '/images/hero.jpg'}
                price={parseFloat(pkg.price) || 0}
                rating={pkg.rating || 5}
                reviews={pkg.reviews?.length || 0}
                duration={pkg.duration}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className='text-center py-20'>
          <Search size={48} className='mx-auto mb-4 text-gray-300' />
          <h3 className='text-xl font-bold text-gray-900 mb-2'>No packages found</h3>
          <p className='text-gray-500 mb-6'>Try adjusting your filters or search terms</p>
          <button onClick={clearFilters} className='bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-700 transition-colors'>
            Clear All Filters
          </button>
        </div>
      )}
    </section>
  );
}
