import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

import { upsertUser } from '@services/user';
import { isSponsor } from '@utils/sponsor/is-sponsor';
import { genAccessToken } from '@utils/auth/token';

import { DB_SEEDS } from '@root/configs';
import { Role } from '@prisma/client';

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
              type: 'text',
              placeholder: 'abdullah'
            }
          },
          async authorize(cred) {
            if (cred?.username === 'abdullah' && cred.password === 'abdullah') {
              try {
                return {
                  id: '12345-12345-12345-12345',
                  userId: '9919',
                  login: 'abdullah',
                  name: 'Abdullah',
                  email: 'abdullah@example.com',
                  url: 'https://github.com/github',
                  avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
                  totalDownloadCount: 100,
                  index: 1,
                  role: 'USER',
                  createdAt: new Date(),
                  updatedAt: new Date()
                };
              } catch {
                return null;
              }
            } else {
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
      if (token.user) {
        session.accessToken = genAccessToken(token.user);
      }
      return Promise.resolve({ ...session, user: { ...token.user } });
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
