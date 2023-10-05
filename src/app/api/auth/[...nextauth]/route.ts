import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

function getIdFromUrl(url: string): string | null {
  const match = url.match(/\/u\/(\d+)\?v=/);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}
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
    async session({ session }) {
      let data = {};
      const image = session.user?.image;

      if (image) {
        const id = getIdFromUrl(image);
        data = await fetch(`https://api.github.com/user/${id}`, {
          next: { revalidate: 360 }
        }).then((res) => res.json());
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
