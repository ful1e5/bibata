/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: '/api/core/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:5328/api/:path*'
            : '/api/'
      }
    ];
  }
};

module.exports = nextConfig;
