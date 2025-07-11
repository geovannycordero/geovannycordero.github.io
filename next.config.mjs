/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // Remove basePath for GitHub Pages root deployment
  // basePath: process.env.NODE_ENV === 'production' ? '/geovanny-portfolio' : '',
  // swcMinify: true,
  // experimental: {
  //   // Remove app directory experimental flag for Next.js 13.5.6
  //   appDir: true
  // },
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
}

export default nextConfig
