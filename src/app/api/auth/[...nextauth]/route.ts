import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, profile, trigger }) {
      if (trigger === 'signIn' && profile) {
        token.login = profile?.login;
        token.url = profile?.html_url;

        const isSponsor = await fetch(
          `https://sponsor-spotlight.vercel.app/api/fetch?login=${token.login}`,
          { next: { revalidate: 360 } }
        )
          .then((res) => res.json())
          .then((json) => json.is_sponsor);
        token.role = isSponsor ? 'PRO' : 'USER';
      }

      return token;
    },

    async session({ session, token }) {
      const accessToken = jwt.sign(token, JWT_SECRET, {
        algorithm: 'HS256'
      });
      session.accessToken = accessToken;

      const userData = {
        userId: token.sub,
        login: token.login,
        name: token.name,
        url: token.url,
        email: token.email,
        avatarUrl: token.picture,
        role: token.role
      };

      return Promise.resolve({ ...session, user: { ...userData } });
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
