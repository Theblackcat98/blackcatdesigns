/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Enable static exports for VPS deployment
  output: 'export',

  // Ensure images work in static export (disable Next.js image optimization)
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
