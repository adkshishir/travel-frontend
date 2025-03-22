import type { Metadata } from 'next';
import { Roboto, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/common/header';
import Footer from '@/common/Footer';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} ${roboto.variable}  antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
