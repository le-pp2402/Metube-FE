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
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
