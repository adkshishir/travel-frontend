'use client';

import { useEffect } from 'react';

export default function FrontendError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⛰️</div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Trail temporarily blocked
        </h2>
        <p className="text-gray-600 mb-6">
          We encountered an issue loading this page. Please try again.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
