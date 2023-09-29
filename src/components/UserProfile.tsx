'use client';

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

import Link from 'next/link';

export default function UserProfile() {
  const { data, status } = useSession();

  const handleSignOutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') return <>Loading...</>;

  if (!data) {
    return <Link href='/login'>Sign In</Link>;
  }

  return (
    <>
      ({data?.user?.name}) |
      <a
        href='/api/auth/signout'
        title='Click to SignOut'
        onClick={handleSignOutClick}>
        Signout
      </a>
    </>
  );
}
