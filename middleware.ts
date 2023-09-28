import { withAuth } from 'next-auth/middleware';

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: '/login',
    error: '/error'
  }
});

export const config = {
  matcher: ['/studio']
};
