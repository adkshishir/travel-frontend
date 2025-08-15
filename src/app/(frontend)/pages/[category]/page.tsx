import Banner from '@/components/banner';
import React from 'react';
import { Params } from 'next/dist/server/request/params';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  
  try {
    const result = await fetchData(ENDPOINTS.CATEGORIES + '/' + category);
    
    if (!result) {
      return {
        title: 'Page Not Found',
        description: 'The requested page could not be found.',
      };
    }

    const seo = result?.seo || {};
    const title = seo.metaTitle || result?.title || 'Page';
    const description = seo.metaDescription || 'Explore this page.';
    const keywords = seo.metaKeywords || '';
    const canonical = seo.metaCanonical || '';
    const image = result?.seo?.media?.thumbnail || '/images/hero.jpg';
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
        type: 'website',
        images: [image],
        siteName: 'Your Site Name',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
      robots: {
        index: true,
        follow: true,
      },
      ...(seo.schema && { other: { 'application/ld+json': seo.schema } }),
    };
  } catch (error) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }
}

const CategoryPage = async ({ params }: { params: Promise<Params> }) => {
  const { category } = await params;
  
  try {
    const result = await fetchData(ENDPOINTS.CATEGORIES + '/' + category);
    // Handle case where category is not found
    if (!result) {
     notFound();
    }

    return (
      <main>
        <Banner
          title={result?.title || 'Page'}
          image="/images/hero.jpg"
          breadcrumb={[{ name: 'Home', href: '/' }]}
          pageName={result?.title || 'Page'}
        />
        
        {/* Content Section */}
        <div className='max-w-6xl mx-auto py-16 px-4'>
          <div className='prose prose-lg max-w-none'>
            {result?.content && (
              <div 
                dangerouslySetInnerHTML={{ __html: result.content }}
                className="content-container"
              />
            )}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    // Handle network errors or other issues
    notFound();
  }
};

export default CategoryPage; 