export { default } from 'next-auth/middleware';

export const config = { matcher: ['/create', '/api/svg/:path*'] };

