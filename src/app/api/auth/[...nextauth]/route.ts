import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV === 'development',
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
    async jwt({ token, account }) {
      if (account && account.provider === 'github') {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      let data = {};

      if (token && token.accessToken) {
        data = await fetch('https://api.github.com/user', {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${token.accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28'
          },
          next: { revalidate: 360 }
        }).then((res) => res.json());

        const payload = { gh_access_token: token.accessToken };
        const ghToken = jwt.sign(payload, JWT_SECRET, {
          algorithm: 'HS256'
        });
        session.accessToken = ghToken;
        // const core = new CoreApi();
        // const { token: coreJwt } = await core.getSession(ghToken);
        // console.log(coreJwt);
        // const userType = jwt.verify(coreJwt, JWT_SECRET, {
        //   algorithms: ['HS256']
        // });
      }

      return Promise.resolve({
        ...session,
        user: { ...session.user, ...data }
      });
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
