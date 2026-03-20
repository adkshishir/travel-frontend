import H2 from '@/components/typography/h2';
import PrimaryText from '@/components/typography/primary';
import BlogCard from '@/components/blog/blog-card';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import Link from 'next/link';
import React from 'react';

const Blogs = async () => {
  const blogs = await fetchData(ENDPOINTS.BLOGS);
  const list = Array.isArray(blogs) ? blogs : blogs?.data ?? [];

  return (
    <section className='mx-auto max-w-[1180px] my-24 max-lg:my-16 max-lg:px-4'>
      <div className='flex items-end justify-between gap-4 mb-8'>
        <div className='max-w-xl'>
          <PrimaryText className='mb-2'>Blogs &amp; News</PrimaryText>
          <H2>Stories from the Trail</H2>
        </div>
        <Link
          href='/blogs'
          className='shrink-0 text-sm font-semibold text-primary hover:underline hidden sm:block'>
          All Articles →
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {list.slice(0, 3).map((post: any) => (
          <BlogCard
            key={post.id}
            image={post.media?.thumbnail || '/images/hero.jpg'}
            category={post.seo?.metaKeywords?.split(',')[0] || 'Blog'}
            date={post.createdAt?.slice(0, 10) || ''}
            title={post.title}
            href={`/blogs/${post.slug}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Blogs;
