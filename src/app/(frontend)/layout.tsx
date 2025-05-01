import Footer from '@/common/Footer';
import Header from '@/common/header';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default layout;
