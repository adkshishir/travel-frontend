import Footer from '@/common/Footer';
import Header from '@/common/header';
import React from 'react';
import WhatsAppButton from '@/components/whatsapp-button';
import CookieConsent from '@/components/cookie-consent';
import { fetchData } from '@/utils/request-intregation';
import ENDPOINTS from '@/utils/endpoints';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const siteInfo = await fetchData(ENDPOINTS.SITE_INFO).catch(() => null);

  return (
    <>
      <Header />
      {children}
      <Footer />
      <WhatsAppButton phone={siteInfo?.whatsapp || '9779800000000'} />
      <CookieConsent />
    </>
  );
};

export default layout;
