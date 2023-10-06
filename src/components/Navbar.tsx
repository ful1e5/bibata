'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

import { useSponsors } from '@hooks/useSponsors';

interface UserProfileProps {}

function UserProfile(props: UserProfileProps) {
  const { data } = useSession();

  return (
    <div className='inline-flex items-center gap-6'>
      {!data ? (
        <div>
          <Link className='underline' title='Click to SignIn' href='/login'>
            Sign In
          </Link>
        </div>
      ) : (
        <>
          <div className='relative w-10 h-10'>
            <img
              className='rounded-full border-3 border-blue-100 shadow-sm'
              src={data?.user?.avatar_url}
              alt={data?.user?.name}
            />
          </div>

          <Link
            className='underline'
            href='/api/auth/signout'
            title='Click to SignOut'
            onClick={(e) => {
              e.preventDefault();
              signOut({ callbackUrl: '/' });
            }}>
            Signout
          </Link>
        </>
      )}
    </div>
  );
}

interface NavbarProps {}

export default function Navbar(props: NavbarProps) {
  const author = 'ful1e5';
  const { data: session, status } = useSession();
  const [isSponsor, setIsSponsor] = useState(false);

  const {
    data: sponsors,
    error: _e,
    isLoading: loadingSponsors
  } = useSponsors(author);

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user?.login === author) {
        setIsSponsor(true);
      } else if (!loadingSponsors && sponsors && session.user?.login) {
        const unames = sponsors.map((s) => s.login);
        setIsSponsor(
          unames.includes(session.user?.login) || unames.includes(author)
        );
      }
    }
  }, [session, loadingSponsors]);

  return (
    <header className='bg-black p-6 top-0 w-full'>
      <div className='flex items-center justify-between flex-wrap '>
        <Link className='text-3xl font-bold' href='/' title='Goto Homepage'>
          Bibata Live
          {isSponsor && ' (Pro)'}
        </Link>
        <UserProfile />
      </div>
    </header>
  );
}
