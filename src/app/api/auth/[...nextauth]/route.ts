import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

import { upsertUser } from '@services/user';
import { isSponsor } from '@utils/sponsor/is-sponsor';

import { DB_SEEDS } from '@root/configs';
import { Role, User } from '@prisma/client';

const PREVIEW = process.env.VERCEL_ENV === 'preview';

const authOptions: AuthOptions = {
  providers: [
    PREVIEW
      ? CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: {
              label: 'Username',
              type: 'text',
              placeholder: 'abdullah'
            },
            password: {
              label: 'Password',
              type: 'password'
            }
          },
          async authorize(cred) {
            try {
              const user: User = {
                id: '12345-12345-12345-12345',
                userId: '9919',
                login: 'abdullah',
                name: 'Abdullah',
                email: 'abdullah@example.com',
                url: 'https://github.com/github',
                avatarUrl: 'https://picsum.photos/400/400',
                totalDownloadCount: 5,
                index: 1,
                role: 'USER',
                createdAt: new Date(),
                updatedAt: new Date()
              };

              if (cred?.username === 'abdullah') user.role = 'PRO';
              return user;
            } catch {
              return null;
            }
          }
        })
      : GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET
        })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    // TODO: Handle Custom Login Page queries
    // signIn: '/login'
  },
  callbacks: {
    async jwt({ token, profile, trigger }) {
      if (trigger === 'signIn' && profile) {
        const userId = profile.id.toString();
        const login = profile.login;
        const role: Role = (await isSponsor(login)) ? 'PRO' : 'USER';
        const user = {
          userId: userId,
          login: login,
          name: profile.name || null,
          url: profile.html_url,
          email: profile.email || null,
          avatarUrl: profile.avatar_url,
          role: role,
          totalDownloadCount:
            role === 'USER' ? DB_SEEDS.FRESH_SIGNUP_DOWNLOADS : null
        };

        if (!PREVIEW) {
          token.user = await upsertUser(user);
        }
      }

      return token;
    },

    async session({ session, token }) {
      return Promise.resolve({ ...session, user: { ...token.user } });
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
