/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // comment the following lines to enable static export (local development)
  output: 'export',
  distDir: 'docs',
  trailingSlash: true,
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },
  // Ensure compatibility with React 17
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
