'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSession } from 'next-auth/react';

import { Profile } from './profile';
import { ProBadge, BibataLogo } from '@components/svgs';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const NavBar: React.FC<Props> = (_props) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className='bg-transparent p-2 sm:p-5 top-0 w-full h-15'>
      <div className='flex items-center justify-between'>
        <div className='overflow-hidden flex items-center justify-center gap-2'>
          <Link
            href='/'
            title='Goto Homepage'
            className='bg-blue-800 p-2 rounded-xl sm:rounded-3xl'>
            <BibataLogo />
          </Link>
          <span className='inline-flex items-center gap-1'>
            {pathname === '/studio' && (
              <span className='text-xl sm:text-3xl font-bold'>Studio</span>
            )}
            {session?.user?.role === 'PRO' && <ProBadge size={18} />}
          </span>
        </div>
        {status === 'loading' ? (
          <div className='m-1 sm:m-1 w-16 sm:w-24 mr-1 sm:mr-4'>
            <div className='rounded-full h-6 sm:h-8 ring-white/[.2] ring-1 p-1 animate-pulse bg-white/[.1]' />
          </div>
        ) : (
          <Profile session={session} />
        )}
      </div>
    </header>
  );
};
