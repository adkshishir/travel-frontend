"use client"
import H2 from '@/components/typography/h2';
import PrimaryText from '@/components/typography/primary';
import React, { useEffect, useState } from 'react';
import BlogCard from '@/components/blog/blog-card';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

const Blogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  useEffect(() => {
    fetchData(ENDPOINTS.BLOGS).then((res) => {
      if (res && Array.isArray(res)) setBlogs(res);
      else if (res && res.data) setBlogs(res.data);
    });
  }, []);
  return (
    <section className='mx-auto max-w-[1180px] my-32 max-lg:my-16 max-lg:px-4'>
      <div className='text-center max-w-2xl grid   mx-auto'>
        <PrimaryText className='mb-4'>Blogs & News</PrimaryText>
        <H2 className='mb-8'>Tips and Tricks for Planning Your Dream Trip</H2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {blogs.map((post) => (
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
