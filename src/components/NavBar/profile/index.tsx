'use client';

import Link from 'next/link';

import { signOut } from 'next-auth/react';

import { Session } from 'next-auth';
import { LogoutSVG } from './svgs';

type Props = {
  session: Session | null;
};

export const Profile: React.FC<Props> = (props) => {
  const user = props?.session?.user;
  return (
    <div className='inline-flex items-center gap-2'>
      {!props.session ? (
        <Link
          className='py-2 px-6 bg-white text-center text-black rounded-2xl font-bold'
          title='Click to SignIn'
          href='/login'>
          Sign In
        </Link>
      ) : (
        <>
          <button
            className='w-10 p-2 rounded-full hover:bg-white/[.3]'
            onClick={(e) => {
              e.preventDefault();
              signOut({ callbackUrl: '/' });
            }}>
            <LogoutSVG />
          </button>

          <div className='w-14'>
            <img
              className='rounded-3xl ring-white/[.2] ring-1 p-1'
              src={user?.avatar_url}
              alt={user?.name}
            />
          </div>
        </>
      )}
    </div>
  );
};
