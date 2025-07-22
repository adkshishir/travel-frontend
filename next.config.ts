import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // image domain prefix
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/**',
      }, {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api-poonhill.adhikarishishir.com.np',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
