/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['madwolfstore.s3.amazonaws.com'],
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'madwolfstore.s3.amazonaws.com' },
      { hostname: 'localhost' },
    ],
  },
};

module.exports = nextConfig;
