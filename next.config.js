/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;