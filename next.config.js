/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["madwolfstore.s3.amazonaws.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
