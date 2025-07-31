import Banner from '@/components/banner';
import Sidebar from '@/components/blog/side-bar';
import H1 from '@/components/typography/h1';
import P from '@/components/typography/P';
import Image from 'next/image';
import React from 'react';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { Params } from 'next/dist/server/request/params';
import '@/styles/blog-content.css';

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const blog = await fetchData(ENDPOINTS.BLOGS + '/' + slug);
  const seo = blog?.seo || {};
  const title = seo.metaTitle || blog?.title || 'Blog Details';
  const description = seo.metaDescription || blog?.description || 'Read this blog.';
  const keywords = seo.metaKeywords || '';
  const canonical = seo.metaCanonical || '';
  const image = blog?.media?.thumbnail || blog?.seo?.media?.thumbnail || '/images/hero.jpg';
  const url = typeof window !== 'undefined' ? window.location.href : '';
  
  return {
    title,
    description,
    keywords,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      url: canonical || url,
      type: 'article',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    ...(seo.schema && { other: { 'application/ld+json': seo.schema } }),
  };
}

const BlogDetail = async ({ params }: { params: Promise<Params> }) => {
  const { slug } = await params;
  const blog = await fetchData(ENDPOINTS.BLOGS + '/' + slug);

  // Handle case where blog is not found
  if (!blog) {
    return (
      <main>
        <Banner
          title="Blog Not Found"
          image="/images/hero.jpg"
          breadcrumb={[
            { name: 'Home', href: '/' },
            { name: 'Blogs', href: '/blogs' },
          ]}
          pageName="Blog Not Found"
        />
        <div className='max-w-4xl mx-auto my-16 px-4'>
          <div className='text-center'>
            <h2 className='text-2xl font-semibold mb-4'>Blog Post Not Found</h2>
            <p className='text-gray-600 mb-6'>
              Sorry, we couldn't find the blog post you're looking for. It may have been moved or deleted.
            </p>
            <a 
              href="/blogs" 
              className='bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors'
            >
              Back to Blogs
            </a>
          </div>
        </div>
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main>
      <Banner
        title={blog.title || 'Blog Details'}
        image={blog.media?.original || '/images/hero.jpg'}
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Blogs', href: '/blogs' },
        ]}
        pageName={blog.title || 'Blog Details'}
      />
      
      <div className='flex flex-col lg:flex-row gap-8 max-lg:px-4 max-w-[1180px] mx-auto my-16'>
        <div className='lg:w-2/3'>
          {/* Featured Image */}
          {blog.media?.original && (
            <Image
              src={blog.media.original}
              alt={blog.media.alt || blog.title || 'Blog image'}
              width={800}
              height={400}
              priority={true}
              className='object-cover rounded-md mb-6 w-full h-[400px]'
            />
          )}

          {/* Blog Header */}
          <div className='mb-6'>
            <H1>{blog.title}</H1>
            
            {/* Meta Information */}
            <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4'>
              {blog.createdAt && (
                <span>Published on {formatDate(blog.createdAt)}</span>
              )}
              {blog.author && (
                <span>By {blog.author.name}</span>
              )}
              {blog.publisher && (
                <span>Publisher: {blog.publisher}</span>
              )}
            </div>

            {/* Subtitle */}
            {blog.subtitle && (
              <div className='text-lg text-gray-700 mb-4'>
                {blog.subtitle}
              </div>
            )}

            {/* Description */}
            {blog.description && (
              <div className='text-gray-600 mb-6'>
                <P>{blog.description}</P>
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div className='prose prose-lg max-w-none blog-content'>
            {blog.content ? (
              <div 
                dangerouslySetInnerHTML={{ __html: blog.content }}
                style={{ 
                  lineHeight: '1.7', 
                  fontSize: '16px', 
                  color: '#374151' 
                }}
              />
            ) : (
              <P>No content available for this blog post.</P>
            )}
          </div>

          {/* Author Information */}
          {blog.author && (
            <div className='mt-8 p-6 bg-gray-50 rounded-lg'>
              <h3 className='text-xl font-semibold mb-2'>About the Author</h3>
              <div className='flex items-start gap-4'>
                {blog.author.media?.thumbnail && (
                  <Image
                    src={blog.author.media.thumbnail}
                    alt={blog.author.name}
                    width={80}
                    height={80}
                    className='rounded-full object-cover'
                  />
                )}
                <div>
                  <h4 className='font-semibold text-lg'>{blog.author.name}</h4>
                  {blog.author.bio && (
                    <p className='text-gray-600 mt-1'>{blog.author.bio}</p>
                  )}
                  {blog.author.website && (
                    <a 
                      href={blog.author.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-blue-600 hover:underline mt-2 inline-block'
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
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

export default BlogDetail;
