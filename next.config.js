const devMode = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: devMode ? '/api/core/:path*' : '/api/:path*',
        destination: devMode
          ? 'http://localhost:5328/api/core/:path*'
          : '/api/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
