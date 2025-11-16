'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="text-9xl font-bold bg-gradient-to-r from-healthcare-blue to-healthcare-green bg-clip-text text-transparent mb-4">
                404
              </h1>
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Page Not Found
              </h2>
              <p className="text-xl text-gray-600 mb-2">
                Sorry, the page you're looking for doesn't exist or has been moved.
              </p>
              <p className="text-gray-500">
                Don't worry! You can navigate back to our homepage or use the navigation menu to find what you're looking for.
              </p>
            </div>

            {/* Illustration */}
            <div className="mb-12">
              <svg className="w-64 h-64 mx-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-healthcare-blue hover:bg-healthcare-blue/90 text-white px-8 py-3">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-2 border-healthcare-blue text-healthcare-blue hover:bg-healthcare-blue/10 px-8 py-3"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-6">Here are some helpful links:</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/services" className="text-healthcare-blue hover:text-healthcare-green transition-colors font-semibold">
                  Our Services
                </Link>
                <Link href="/about" className="text-healthcare-blue hover:text-healthcare-green transition-colors font-semibold">
                  About Us
                </Link>
                <Link href="/contact" className="text-healthcare-blue hover:text-healthcare-green transition-colors font-semibold">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
