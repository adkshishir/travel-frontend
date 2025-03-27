import Banner from '@/components/banner';
import BlogCard from '@/components/blog/blog-card-big';
import Sidebar from '@/components/blog/side-bar';
import Pagination from '@/components/pagination';
import React from 'react';

const BlogsPage = () => {
  // Sample blog data
  const blogs = [
    {
      id: 1,
      title:
        "Anatolian Adventure: Off-the-Beaten-Path Discoveries in Turkey's Heartland",
      image: '',
      excerpt:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con quis nostrud exercitation quis nostrud esse enim ad minim veniam, quis nostrud exercitation enim ad minim veniam, quis nostrud',
      date: '12 March 2024',
      comments: 14,
      shares: 8,
    },
    {
      id: 2,
      title:
        'Soaking in the Natural Thermal Springs and Cotton Castle Terraces',
      image: '',

      excerpt:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con quis nostrud exercitation quis nostrud esse enim ad minim veniam, quis nostrud exercitation enim ad minim veniam, quis nostrud',
      date: '12 March 2024',
      comments: 14,
      shares: 5,
    },
    {
      id: 3,
      title: 'Hidden Gems of the Mediterranean Coast: Secret Beaches and Coves',
      image: '',

      excerpt:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con quis nostrud exercitation quis nostrud esse enim ad minim veniam, quis nostrud exercitation enim ad minim veniam, quis nostrud',
      date: '10 March 2024',
      comments: 9,
      shares: 12,
    },
    {
      id: 4,
      title: 'Mountain Trekking: Exploring the Peaks of the Taurus Range',
      image: '',

      excerpt:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con quis nostrud exercitation quis nostrud esse enim ad minim veniam, quis nostrud exercitation enim ad minim veniam, quis nostrud',
      date: '8 March 2024',
      comments: 7,
      shares: 3,
    },
  ];
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
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}

          {/* Pagination */}
          <Pagination currentPage={1} totalPages={3} />
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
