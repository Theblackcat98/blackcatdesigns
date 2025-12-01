/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Enable static exports for VPS deployment
  output: 'export',

  // Add trailing slash for directory-style serving
  trailingSlash: true,

  // Ensure images work in static export (disable Next.js image optimization)
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
