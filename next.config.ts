import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['picsum.photos'],
  },
};

export default nextConfig;
