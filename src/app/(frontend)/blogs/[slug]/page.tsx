export const revalidate = 3600;

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
import { notFound } from 'next/navigation';
import getCanonicalUrl from '@/utils/canonical';
import JsonLd, { blogPostingSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import ShareButtons from '@/components/share-buttons';
import CommentSection from '@/components/comment-section';
import { Clock } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const blog = await fetchData(ENDPOINTS.BLOGS + '/' + slug);
  const seo = blog?.seo || {};
  const title = seo.metaTitle || blog?.title || 'Blog Details';
  const description = seo.metaDescription || blog?.description || 'Read this blog.';
  const keywords = seo.metaKeywords || '';
  const canonical = seo.metaCanonical || '';
  const image = blog?.media?.thumbnail || blog?.seo?.media?.thumbnail || '/images/hero.jpg';
  const pageUrl = canonical || getCanonicalUrl(`/blogs/${slug}`);
  
  return {
    title,
    description,
    keywords,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'article',
      images: [image],
      siteName: 'Poonhill Treks',
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
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const readingTime = Math.max(1, Math.ceil(
    ((blog.content || '').replace(/<[^>]*>/g, '').split(/\s+/).length) / 200
  ));

  return (
    <main>
      <JsonLd schema={blogPostingSchema({ ...blog, slug: slug as string })} />
      <JsonLd schema={breadcrumbSchema([
        { name: 'Home', href: '/' },
        { name: 'Blogs', href: '/blogs' },
        { name: blog.title || 'Blog Post', href: `/blogs/${slug}` },
      ])} />

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
                <span>📅 {formatDate(blog.createdAt)}</span>
              )}
              {blog.author && (
                <span>✍️ {blog.author.name}</span>
              )}
              <span className='flex items-center gap-1'>
                <Clock size={14} /> {readingTime} min read
              </span>
            </div>
            <div className='mb-4'>
              <ShareButtons title={blog.title || ''} url={getCanonicalUrl(`/blogs/${slug}`)} />
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

          {/* Share buttons (bottom) */}
          <div className='mt-8 pt-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4'>
            <ShareButtons title={blog.title || ''} url={getCanonicalUrl(`/blogs/${slug}`)} />
          </div>

          {/* Author Information */}
          {blog.author && (
            <div className='mt-8 p-6 bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-2xl border border-gray-100'>
              <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4'>About the Author</h3>
              <div className='flex items-start gap-4'>
                {blog.author.media?.thumbnail ? (
                  <Image
                    src={blog.author.media.thumbnail}
                    alt={blog.author.name}
                    width={80}
                    height={80}
                    className='rounded-full object-cover shrink-0'
                  />
                ) : (
                  <div className='w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-primary font-bold text-xl shrink-0'>
                    {blog.author.name?.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className='font-bold text-lg text-gray-900'>{blog.author.name}</h4>
                  {blog.author.role && (
                    <p className='text-primary text-sm font-medium mb-2 capitalize'>{blog.author.role}</p>
                  )}
                  {blog.author.bio && (
                    <p className='text-gray-600 text-sm leading-relaxed'>{blog.author.bio}</p>
                  )}
                  {blog.author.website && (
                    <a
                      href={blog.author.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-primary hover:underline mt-2 inline-block text-sm font-medium'
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          <CommentSection blogId={blog.id} />
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
