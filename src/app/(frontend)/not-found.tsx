import React from 'react';
import Link from 'next/link';
import Banner from '@/components/banner';
import GoBackButton from '@/components/go-back-button';
import { Home, Search, MapPin } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Banner
        title="Page Not Found"
        image="/images/hero.jpg"
        breadcrumb={[{ name: 'Home', href: '/' }]}
        pageName="404 Error"
      />
      
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="text-center">
          {/* Large 404 */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-gray-200 select-none mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL. Don't worry, let's get you back on track!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            
            <GoBackButton />
          </div>

          {/* Popular Destinations */}
          <div className="border-t border-gray-200 pt-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Explore Our Popular Destinations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/trekking"
                className="group p-6 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    Trekking
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Discover amazing trekking packages
                </p>
              </Link>

              <Link
                href="/hiking"
                className="group p-6 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    Hiking
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Explore scenic hiking trails
                </p>
              </Link>

              <Link
                href="/expedition"
                className="group p-6 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    Expedition
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Join thrilling expeditions
                </p>
              </Link>

              <Link
                href="/contact"
                className="group p-6 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    Contact Us
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Get in touch with our team
                </p>
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Still Can't Find What You're Looking For?
            </h3>
            <p className="text-gray-600 mb-4">
              Our team is here to help you find the perfect adventure package.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              <Search className="w-4 h-4" />
              Contact Our Support Team
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}