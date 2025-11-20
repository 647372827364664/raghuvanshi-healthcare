import type { Metadata } from 'next';
// Removed `next/font/google` imports to avoid build-time font fetching failures
// We'll load fonts via a runtime <link> so remote builders don't need to fetch
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

// Using runtime font loading via Google Fonts <link> to avoid build-time network issues

export const metadata: Metadata = {
  title: {
    default: 'Raghuvanshi Healthcare - Your Family\'s Health, Our Mission',
    template: '%s | Raghuvanshi Healthcare',
  },
  description: 'Trusted multi-specialty healthcare provider offering advanced, affordable, and compassionate medical services with 20+ years of experience and NABH certification.',
  keywords: [
    'healthcare',
    'medical services',
    'doctor consultation',
    'blood tests',
    'ECG',
    'X-Ray',
    'home sample collection',
    'teleconsultation',
    'NABH certified',
    'Raghuvanshi Healthcare',
  ],
  authors: [{ name: 'Raghuvanshi Healthcare' }],
  creator: 'Raghuvanshi Healthcare',
  publisher: 'Raghuvanshi Healthcare',
  metadataBase: new URL('https://raghuvanshihealthcare.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://raghuvanshihealthcare.com',
    title: 'Raghuvanshi Healthcare - Your Family\'s Health, Our Mission',
    description: 'Trusted multi-specialty healthcare provider with 20+ years of experience. Book appointments, shop for medicines, and access quality healthcare services.',
    siteName: 'Raghuvanshi Healthcare',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Raghuvanshi Healthcare',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raghuvanshi Healthcare - Your Family\'s Health, Our Mission',
    description: 'Trusted healthcare provider with 20+ years of experience. Quality medical services at affordable prices.',
    images: ['/images/twitter-image.jpg'],
    creator: '@RaghuvanshiHC',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* Load fonts at runtime instead of build-time to avoid remote builder timeouts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#004AAD" />
        <link rel="preload" href="/images/hero-bg.jpg" as="image" />
      </head>
        <body className={`font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                {children}
              </div>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    style: {
                      background: '#29AB87',
                    },
                  },
                  error: {
                    style: {
                      background: '#ff4757',
                    },
                  },
                }}
              />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
