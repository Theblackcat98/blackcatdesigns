/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Add trailing slash for directory-style serving
  trailingSlash: true,

  // Ensure images work with static hosting (optional for SSR deployment)
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
