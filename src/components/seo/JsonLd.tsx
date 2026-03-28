interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function organizationSchema(siteInfo?: {
  name?: string;
  url?: string;
  logo?: string;
  phone1?: string;
  email1?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteInfo?.name || 'Poonhill Treks',
    url: siteInfo?.url || 'https://poonhill.com',
    logo: siteInfo?.logo,
    telephone: siteInfo?.phone1,
    email: siteInfo?.email1,
    address: siteInfo?.address
      ? { '@type': 'PostalAddress', streetAddress: siteInfo.address, addressCountry: 'NP' }
      : undefined,
    sameAs: [
      siteInfo?.facebook,
      siteInfo?.instagram,
      siteInfo?.twitter,
    ].filter(Boolean),
  };
}

export function tourPackageSchema(pkg: {
  title?: string;
  description?: string;
  price?: string;
  duration?: string;
  altitude?: string;
  bestSeason?: string;
  groupSize?: string;
  rating?: number;
  slug: string;
  destination?: { name?: string; slug?: string; activity?: { name?: string; slug?: string } };
  reviews?: { name?: string; description?: string; rating?: number; reviewDate?: string }[];
  mainImage?: { original?: string; thumbnail?: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://poonhill.com';
  const reviewCount = pkg.reviews?.length || 0;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: pkg.description,
    url: `${baseUrl}/${pkg.destination?.activity?.slug || 'trekking'}/${pkg.destination?.name?.toLowerCase().replace(/\s+/g, '-') || 'destination'}/${pkg.slug}`,
    touristType: pkg.destination?.activity?.name,
    image: pkg.mainImage?.original || pkg.mainImage?.thumbnail,
    offers: pkg.price
      ? {
          '@type': 'Offer',
          price: pkg.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        }
      : undefined,
  };

  if (reviewCount > 0 && pkg.rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: pkg.rating,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (pkg.reviews && pkg.reviews.length > 0) {
    schema.review = pkg.reviews.slice(0, 5).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewBody: r.description,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating || 5, bestRating: 5 },
      datePublished: r.reviewDate,
    }));
  }

  return schema;
}

export function faqPageSchema(faqs: { question?: string; answer?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://poonhill.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${baseUrl}${item.href}`,
    })),
  };
}

export function blogPostingSchema(blog: {
  title?: string;
  description?: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  author?: { name?: string; bio?: string };
  media?: { original?: string };
  content?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://poonhill.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.description,
    url: `${baseUrl}/blogs/${blog.slug}`,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    image: blog.media?.original,
    author: blog.author
      ? { '@type': 'Person', name: blog.author.name, description: blog.author.bio }
      : { '@type': 'Organization', name: 'Poonhill Treks' },
    publisher: {
      '@type': 'Organization',
      name: 'Poonhill Treks',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` },
    },
  };
}
