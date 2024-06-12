/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  images: {
    domains: ["coin-images.coingecko.com"],
  },
};

export default nextConfig;
