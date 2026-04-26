import type { Metadata } from 'next';
import { Roboto, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import JsonLd from '@/components/seo/JsonLd';

const poppins = Poppins({
  subsets: ['latin'], // Supports Latin characters
  weight: ['400', '600', '700', '500'], // Choose font weights as needed
  variable: '--font-poppins', // Optional: Define CSS variable
});
const roboto = Roboto({
  subsets: ['latin'], // Supports Latin characters
  weight: ['400', '600', '700', '500'], // Choose font weights as needed
  variable: '--font-roboto', // Optional: Define CSS variable
});
export const metadata: Metadata = {
  title: {
    default: 'Traveltreks | Nepal Trekking & Adventure Tours',
    template: '%s | Traveltreks',
  },
  description: 'Discover the best trekking and tour packages in Nepal. Expert-led Annapurna and Himalayan treks. Book your adventure with local guides.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://traveltreks.com';

  return (
    <html lang='en'>
      <body className={`${roboto.className} ${roboto.variable} ${poppins.variable} antialiased`}>
        <JsonLd schema={{
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          name: 'Traveltreks',
          url: siteUrl,
          description: 'Expert-led Nepal trekking and Himalayan adventure tours since 2009. Annapurna, Everest Base Camp and more.',
          address: { '@type': 'PostalAddress', addressCountry: 'NP', addressLocality: 'Pokhara' },
          priceRange: '$$',
          currenciesAccepted: 'USD, NPR',
          paymentAccepted: 'Cash, Credit Card',
          openingHours: 'Mo-Su 07:00-20:00',
          sameAs: [
            'https://www.facebook.com/traveltreks',
            'https://www.instagram.com/traveltreks',
          ],
        }} />
        <Toaster position='top-right' />
        {children}
      </body>
    </html>
  );
}
