'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSession } from 'next-auth/react';

import { Profile } from './profile';
import { BibataTypoLogo } from '@components/svgs';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const NavBar: React.FC<Props> = (_props) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header
      className={`sticky py-px top-0 z-20 ${
        pathname === '/'
          ? 'bg-[--bg-dark]'
          : 'bg-[#151515] backdrop-filter backdrop-blur-xl border-b border-white/[.1] firefox:bg-opacity-95 bg-opacity-95'
      } `}>
      <nav className='container mx-auto p-3 md:p-4 flex items-center justify-between'>
        <Link href='/'>
          <div className='overflow-hidden flex items-center justify-center gap-2'>
            <span className='inline-flex items-center gap-1'>
              <span
                className={
                  session?.user?.role === 'PRO' || pathname === '/'
                    ? 'text-[--accent]'
                    : 'text-white'
                }>
                <BibataTypoLogo />
              </span>
            </span>
          </div>
        </Link>
        {status === 'loading' ? (
          <div className='m-1 sm:m-1 w-16 sm:w-24 mr-1 sm:mr-4'>
            <div className='rounded-full h-6 sm:h-8 ring-white/[.2] ring-1 p-1 animate-pulse bg-white/[.1]' />
          </div>
        ) : (
          <Profile session={session} />
        )}
      </nav>
    </header>
  );
};
