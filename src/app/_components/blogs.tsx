import H1 from '@/components/typography/h1';
import PrimaryText from '@/components/typography/primary';
import React from 'react';
import BlogCard from '@/components/blog/blog-card';

interface BlogPost {
  id: string;
  image: string;
  category: string;
  date: string;
  title: string;
  href: string;
}

const Blogs = () => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      image: '/images/hero.jpg',
      category: 'Solo Travel',
      date: 'Sep 19, 2024',
      title: 'The Best Destinations for Memorable Vacations.',
      href: '/blog/best-destinations',
    },
    {
      id: '2',
      image: '/images/hero.jpg',
      category: 'Adventure',
      date: 'Sep 15, 2024',
      title: 'Top 10 Adventure Activities in Southeast Asia',
      href: '/blog/adventure-activities',
    },
    {
      id: '3',
      image: '/images/hero.jpg',
      category: 'Food & Culture',
      date: 'Sep 12, 2024',
      title: 'Culinary Journeys: Exploring World Cuisines',
      href: '/blog/culinary-journeys',
    },
  ];
  return (
    <section className='mx-auto max-w-[1180px] my-32'>
      <div className='text-center max-w-2xl grid   mx-auto'>
        <PrimaryText className='mb-4'>Blogs & News</PrimaryText>
        <H1 className='mb-8'>Tips and Tricks for Planning Your Dream Trip</H1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            image={post.image}
            category={post.category}
            date={post.date}
            title={post.title}
            href={post.href}
          />
        ))}
      </div>
    </section>
  );
};

export default Blogs;
