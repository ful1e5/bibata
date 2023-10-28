import { UserRole, DBUser } from 'bibata-live/misc';

import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Profile extends Profile {
    id: number;
    login: string;
    node_id: string;
    avatar_url: string;
    gravatar_id?: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string | null;
    hireable: string | null;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: '2016-12-01T04:53:49Z';
    updated_at: '2023-09-25T04:05:41Z';
    private_gists: number;
    total_private_repos: number;
    owned_private_repos: number;
    disk_usage: number;
    collaborators: number;
    two_factor_authentication: boolean;
    plan: {
      name: string;
      space: number;
      collaborators: number;
      private_repos: number;
    };
  }

  interface User extends DBUser {}

  interface Session extends Session {
    accessToken: string;
    user?: DBUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends JWT {
    user?: DBUser;
  }
}
