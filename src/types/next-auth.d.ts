import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires: string;
    accessToken: string;
    user?: {
      name?: string;
      email?: string | null;
      image?: string;
      login?: string;
      id?: number;
      node_id?: string | null;
      avatar_url?: string;
      gravatar_id?: string | null;
      url?: string;
      html_url?: string;
      followers_url?: string | null;
      following_url?: string | null;
      gists_url?: string | null;
      starred_url?: string | null;
      subscriptions_url?: string | null;
      organizations_url?: string | null;
      repos_url?: string | null;
      events_url?: string | null;
      received_events_url?: string | null;
      type?: string;
      site_admin?: false;
      name?: string | null;
      company?: string | null;
      blog?: string;
      location?: string | null;
      email?: string | null;
      hireable: string | null;
      bio?: string | null;
      twitter_username?: string | null;
      public_repos?: number;
      public_gists?: number;
      followers?: number;
      following?: number;
      created_at?: string;
      updated_at?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    iat: number;
    exp: number;
    jti: string;
    accessToken?: string;
    type: string;
    name: string;
    email: string;
    picture: string;
    sub: string;
  }
}
