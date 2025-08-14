'use client';

import { ArrowLeft } from 'lucide-react';

export default function GoBackButton() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <button
      onClick={handleGoBack}
      className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
    >
      <ArrowLeft className="w-5 h-5" />
      Go Back
    </button>
  );
} 