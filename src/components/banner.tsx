import Image from 'next/image';
import React, { Fragment } from 'react';
import H1 from './typography/h1';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
type BannerProps = {
  title: string;
  image: string;
  breadcrumb: {
    name: string;
    href?: string;
  }[];
  pageName?: string;
};
const Banner = ({ title, image, breadcrumb, pageName }: BannerProps) => {
  return (
    <section className='relative h-[40vh] bg-[#012E4188]'>
      <Image
        src={image}
        alt={title}
        width={1920}
        height={1080}
        className='object-cover absolute h-full w-full -z-10'
      />
      <div className='flex max-lg:flex-col-reverse max-lg:px-4 justify-between gap-2   h-fit container max-w-[1180px] mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/5'>
        <div className='w-full mt-8 max-lg:text-center max-lg:justify-center'>
          <H1 className='text-white w-fit mx-auto mb-2'>{title}</H1>
          <Breadcrumb className='mx-auto w-fit '>
            <BreadcrumbList>
              {breadcrumb.map((item, index) => (
                <Fragment key={index}>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink
                      href={item.href}
                      className='text-gray-300 hover:text-gray-400'>
                      {item.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='text-gray-300' />
                </Fragment>
              ))}
              <BreadcrumbItem>
                <BreadcrumbPage className='text-gray-100'>
                  {pageName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </section>
  );
};

export default Banner;
