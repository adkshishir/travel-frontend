import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Large Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 select-none">
            404
          </h1>
          <div className="relative -mt-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          
          <Link
            href="/search"
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            <Search className="w-4 h-4" />
            Search Packages
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/trekking"
              className="text-primary hover:text-primary/80 underline text-sm"
            >
              Trekking Packages
            </Link>
            <Link
              href="/hiking"
              className="text-primary hover:text-primary/80 underline text-sm"
            >
              Hiking Tours
            </Link>
            <Link
              href="/expedition"
              className="text-primary hover:text-primary/80 underline text-sm"
            >
              Expeditions
            </Link>
            <Link
              href="/contact"
              className="text-primary hover:text-primary/80 underline text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 