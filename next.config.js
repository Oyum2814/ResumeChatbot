/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "www.freeiconspng.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
