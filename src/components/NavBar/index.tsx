'use client';

import Link from 'next/link';

import { useSession } from 'next-auth/react';

import { usePathname } from 'next/navigation';
import { Profile } from './profile';
import { ProBadge } from './svgs';

type Props = {};

export const NavBar: React.FC<Props> = (props) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className='bg-transparent p-5 top-0 w-full h-15'>
      <div className='flex items-center justify-between'>
        <Link
          className='overflow-hidden text-3xl font-bold inline-flex gap-1'
          href='/'
          title='Goto Homepage'>
          {pathname === '/studio' ? 'Bibata Studio' : 'Bibata'}
          {session?.user?.role === 'PRO' && <ProBadge />}
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
