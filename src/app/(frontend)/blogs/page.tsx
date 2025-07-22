import Banner from '@/components/banner';
import BlogCard from '@/components/blog/blog-card-big';
import Sidebar from '@/components/blog/side-bar';
import Pagination from '@/components/pagination';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import React from 'react';

const BlogsPage = async () => {
  const blogs = await fetchData(ENDPOINTS.BLOGS);
  return (
    <main>
      <Banner
        title='Blogs'
        image='/images/hero.jpg'
        breadcrumb={[{ name: 'Home', href: '/' }]}
        pageName='Blogs'
      />
      <div className='flex flex-col lg:flex-row gap-8 max-lg:px-4 max-w-[1180px] mx-auto my-16'>
        {/* Main content */}
        <div className='lg:w-2/3'>
          {blogs?.map((blog: any) => (
            <BlogCard key={blog.id} blog={{
              id: blog.id,
              title: blog.title,
              image: blog.media?.thumbnail || '/images/hero.jpg',
              excerpt: blog.description?.slice(0,200) || '',
              date: blog.createdAt?.slice(0,10) || '',
              comments: blog.comments?.length || 0,
              shares: 0,
            }} />
          ))}

          {/* TODO: Implement real pagination */}
          {blogs && blogs.length > 6 && (
            <Pagination currentPage={1} totalPages={1} />
          )}
        </div>

        {/* Sidebar */}
        <div className='lg:w-1/3'>
          <div className='lg:sticky lg:top-20'>
            <Sidebar />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogsPage;
