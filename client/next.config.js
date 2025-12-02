/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thephonedoctors.com',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
