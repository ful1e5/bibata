'use client';

import React from 'react';

import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

import { LogoutSVG } from './svgs';

type Props = {
  session: Session | null;
};

export const Profile: React.FC<Props> = (props) => {
  const user = props.session?.user;
  return (
    <div className='inline-flex items-center gap-2'>
      {!props.session ? (
        <button
          className='inline-flex py-2 px-6 bg-white text-center text-black rounded-2xl font-bold'
          title='Click to Connect your GitHub Account'
          onClick={() => signIn('github', { callbackUrl: '/' })}>
          +<span className='ml-3 hidden sm:block'>Connect</span>
        </button>
      ) : (
        <>
          <button
            className='w-10 p-2 rounded-full hover:bg-white/[.3]'
            title='Logout'
            onClick={(e) => {
              e.preventDefault();
              signOut({ callbackUrl: '/' });
            }}>
            <LogoutSVG />
          </button>

          <div className='w-14 h-14 overflow-hidden rounded-3xl ring-white/[.2] ring-1 '>
            <img
              width={100}
              height={100}
              title={user?.name!}
              src={user?.avatarUrl!}
              alt={user?.login!}
            />
            <div className='w-full h-full animate-pulse bg-white/[.4]'></div>
          </div>
        </>
      )}
    </div>
  );
};
