'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSession } from 'next-auth/react';

import { Profile } from './profile';
import { ProBadge } from './svgs';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const NavBar: React.FC<Props> = (_props) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className='bg-transparent p-5 top-0 w-full h-15'>
      <div className='flex items-center justify-between'>
        <Link
          className='overflow-hidden text-3xl font-bold inline-flex gap-1'
          href='/'
          title='Goto Homepage'>
          Bibata
          <span className='hidden sm:block'>
            {pathname === '/studio' && ' Studio'}
            {session?.user?.role === 'PRO' && <ProBadge />}
          </span>
        </Link>
        {status === 'loading' ? (
          <div className='m-2 w-24 mr-4'>
            <div className='rounded-full h-8 ring-white/[.2] ring-1 p-1 animate-pulse bg-white/[.1]' />
          </div>
        ) : (
          <Profile session={session} />
        )}
      </div>
    </header>
  );
};
