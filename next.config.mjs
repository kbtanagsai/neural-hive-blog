/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ml-mondays.netlify.app',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
