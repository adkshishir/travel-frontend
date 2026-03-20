import PackageCard from '@/components/packages/package-card';
import { ParamValue } from 'next/dist/server/request/params';
import Link from 'next/link';
import { Package } from 'lucide-react';
import React from 'react';

export type TPackage = {
  id: number;
  title: string;
  description: string;
  duration: string;
  slug: string;
  price: string;
  groupSize: string;
  rating: number;
  destination: { name: string; slug: string };
  media: { thumbnail: string; alt: string }[];
  createdAt: string;
};

const Packages = ({
  packages = [],
  activitySlug,
}: {
  packages: TPackage[];
  activitySlug: ParamValue;
}) => {
  if (!packages.length) {
    return (
      <div className='max-w-[1180px] mx-auto px-4 py-12 text-center text-gray-500'>
        <Package size={40} className='mx-auto mb-4 text-gray-300' />
        <p>No packages available for this destination yet.</p>
      </div>
    );
  }

  return (
    <div className='grid max-lg:px-4 max-w-[1180px] mx-auto pb-16 pt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {packages.map((pack) => (
        <Link
          href={`/${activitySlug}/${pack.destination.slug}/${pack.slug}`}
          key={pack.id}>
          <PackageCard
            title={pack.title}
            location={pack.destination.name}
            image={
              pack?.media?.length > 0
                ? pack.media[0]?.thumbnail
                : '/images/hero.jpg'
            }
            price={Number(pack.price || 0)}
            rating={pack.rating}
            reviews={100}
            popular
          />
        </Link>
      ))}
    </div>
  );
};

export default Packages;
