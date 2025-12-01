/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Add trailing slash for directory-style serving
  trailingSlash: true,

  // Re-enable image optimization for SSR
  images: {
    unoptimized: false,
  },

  // Add production optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
