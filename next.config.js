/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/raghuvanshi-healthcare',
  assetPrefix: '/raghuvanshi-healthcare/',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        encoding: false,
      };
    }
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['firebase', 'firebase-admin'],
  },
};

module.exports = nextConfig;
