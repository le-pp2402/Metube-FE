import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
