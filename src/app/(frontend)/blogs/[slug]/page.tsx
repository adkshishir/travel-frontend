import Banner from '@/components/banner';
import Sidebar from '@/components/blog/side-bar';
import H1 from '@/components/typography/h1';
import P from '@/components/typography/P';
import Image from 'next/image';
import React from 'react';

const BlogDetail = () => {
  return (
    <main>
      <Banner
        title='Blog Details'
        image='/images/hero.jpg'
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Blogs', href: '/blogs' },
        ]}
        pageName='Blogs Details'
      />
      <div className='flex flex-col lg:flex-row gap-8 max-lg:px-4 max-w-[1180px] mx-auto my-16'>
        {/* Main content */}
        <div className='lg:w-2/3'>
          <Image
            src={'/images/hero.jpg'}
            alt='about'
            width={500}
            height={1000}
            priority={false}
            className='object-cover rounded-md mb-4 w-full'
          />
          <H1>This is a blog title</H1>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste. alias iure quia
            fugiat a enim, repellendus cum consequatur exercitationem expedita
            perspiciatis eum iste. alias iure quia fugiat a enim, repellendus
            cum consequatur exercitationem expedita perspiciatis eum iste. alias
            iure quia fugiat a enim, repellendus cum consequatur exercitationem
            expedita perspiciatis eum iste. alias iure quia fugiat a enim,
            repellendus cum consequatur exercitationem expedita perspiciatis eum
            iste.
          </P>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste. alias iure quia
            fugiat a enim, repellendus cum consequatur exercitationem expedita
            perspiciatis eum iste. alias iure quia fugiat a enim, repellendus
            cum consequatur exercitationem expedita perspiciatis eum iste. alias
            iure quia fugiat a enim, repellendus cum consequatur exercitationem
            expedita perspiciatis eum iste. alias iure quia fugiat a enim,
            repellendus cum consequatur exercitationem expedita perspiciatis eum
            iste.
          </P>{' '}
          <H1>This is a blog title</H1>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste. alias iure quia
            fugiat a enim, repellendus cum consequatur exercitationem expedita
            perspiciatis eum iste. alias iure quia fugiat a enim, repellendus
            cum consequatur exercitationem expedita perspiciatis eum iste. alias
            iure quia fugiat a enim, repellendus cum consequatur exercitationem
            expedita perspiciatis eum iste. alias iure quia fugiat a enim,
            repellendus cum consequatur exercitationem expedita perspiciatis eum
            iste.
          </P>{' '}
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste. alias iure quia
            fugiat a enim, repellendus cum consequatur exercitationem expedita
            perspiciatis eum iste. alias iure quia fugiat a enim, repellendus
            cum consequatur exercitationem expedita perspiciatis eum iste. alias
            iure quia fugiat a enim, repellendus cum consequatur exercitationem
            expedita perspiciatis eum iste. alias iure quia fugiat a enim,
            repellendus cum consequatur exercitationem expedita perspiciatis eum
            iste.
          </P>{' '}
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste. alias iure quia
            fugiat a enim, repellendus cum consequatur exercitationem expedita
            perspiciatis eum iste. alias iure quia fugiat a enim, repellendus
            cum consequatur exercitationem expedita perspiciatis eum iste. alias
            iure quia fugiat a enim, repellendus cum consequatur exercitationem
            expedita perspiciatis eum iste. alias iure quia fugiat a enim,
            repellendus cum consequatur exercitationem expedita perspiciatis eum
            iste.
          </P>{' '}
          <H1>This is a blog title</H1>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste. alias iure quia
            fugiat a enim, repellendus cum consequatur exercitationem expedita
            perspiciatis eum iste. alias iure quia fugiat a enim, repellendus
            cum consequatur exercitationem expedita perspiciatis eum iste. alias
            iure quia fugiat a enim, repellendus cum consequatur exercitationem
            expedita perspiciatis eum iste. alias iure quia fugiat a enim,
            repellendus cum consequatur exercitationem expedita perspiciatis eum
            iste.
          </P>{' '}
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste. alias iure quia
            fugiat a enim, repellendus cum consequatur exercitationem expedita
            perspiciatis eum iste. alias iure quia fugiat a enim, repellendus
            cum consequatur exercitationem expedita perspiciatis eum iste. alias
            iure quia fugiat a enim, repellendus cum consequatur exercitationem
            expedita perspiciatis eum iste. alias iure quia fugiat a enim,
            repellendus cum consequatur exercitationem expedita perspiciatis eum
            iste.
          </P>
          <H1>This is a blog title</H1>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste.
          </P>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste.
          </P>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste.
          </P>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste.
          </P>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste.
          </P>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste.
          </P>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste.
          </P>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos asperiores error doloremque totam culpa ut explicabo
            alias iure quia fugiat a enim, repellendus cum consequatur
            exercitationem expedita perspiciatis eum iste.
          </P>
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
