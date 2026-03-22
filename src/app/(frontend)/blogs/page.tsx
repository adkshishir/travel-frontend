import Banner from '@/components/banner';
import BlogCard from '@/components/blog/blog-card-big';
import Sidebar from '@/components/blog/side-bar';
import Pagination from '@/components/pagination';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import React from 'react';

const BLOGS_PER_PAGE = 6;

const BlogsPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  const response = await fetchData(ENDPOINTS.BLOGS, {
    page: currentPage,
    limit: BLOGS_PER_PAGE,
  });

  // Handle both paginated response format and legacy array format
  const blogs = response?.items || response || [];
  const totalPages = response?.totalPages || 1;

  return (
    <main>
      <Banner
        title='Blogs'
        image='/images/hero.jpg'
        breadcrumb={[{ name: 'Home', href: '/' }]}
        pageName='Blogs'
      />
      <div className='flex flex-col lg:flex-row gap-8 max-lg:px-4 max-w-[1180px] mx-auto my-16'>
        <div className='lg:w-2/3'>
          {blogs && blogs.length > 0 ? (
            blogs.map((blog: any) => (
              <BlogCard key={blog.id} blog={{
                id: blog.id,
                title: blog.title,
                image: blog.media?.thumbnail || '/images/hero.jpg',
                excerpt: blog.description?.slice(0, 200) || '',
                date: blog.createdAt?.slice(0, 10) || '',
                comments: blog.comments?.length || 0,
                shares: 0,
                slug: blog.slug,
              }} />
            ))
          ) : (
            <div className='text-center py-8'>
              <h3 className='text-xl font-semibold mb-2'>No blogs found</h3>
              <p className='text-gray-600'>Check back later for new blog posts.</p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}
        </div>

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
