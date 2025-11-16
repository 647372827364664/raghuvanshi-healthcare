'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center py-20">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Something went wrong!
          </h1>
          
          <p className="text-gray-600 mb-8">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>

          {error.digest && (
            <p className="text-sm text-gray-500 mb-6">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex gap-4 justify-center">
            <Button 
              onClick={reset}
              className="bg-healthcare-blue hover:bg-healthcare-blue/90 text-white px-6 py-2"
            >
              Try Again
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2"
              onClick={() => window.location.href = '/'}
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
