'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

import { usePathname } from 'next/navigation';
import { isSponsor as fetchIsSponsor } from '@utils/sponsor/isSponsor';

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
  const pathname = usePathname();
  const { data: session, status, update } = useSession();
  const [isSponsor, setIsSponsor] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      const func = async () => {
        const s = await fetchIsSponsor(session?.user?.login!);
        setIsSponsor(s);
      };

      func();
    }
  }, [session, update]);

  return (
    <header className='bg-transparent p-6 top-0 w-full'>
      <div className='flex items-center justify-between flex-wrap '>
        <Link
          className='text-sm sm:text-3xl font-bold'
          href='/'
          title='Goto Homepage'>
          {pathname === '/studio' ? 'Bibata Studio' : 'Bibata'}
          {isSponsor && ' (Pro)'}
        </Link>
        <UserProfile />
      </div>
    </header>
  );
}
