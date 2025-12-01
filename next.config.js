/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Static export configuration
  output: 'export',

  // Add trailing slash for directory-style serving
  trailingSlash: true,

  // Ensure images work with static hosting
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
