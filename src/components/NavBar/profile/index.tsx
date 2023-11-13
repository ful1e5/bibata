'use client';

import React from 'react';

import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

import { LogoutSVG, GitHubLogo } from './svgs';

type Props = {
  session: Session | null;
};

export const Profile: React.FC<Props> = (props) => {
  const user = props.session?.user;
  return (
    <div className='inline-flex items-center gap-2'>
      {!props.session ? (
        <button
          className='inline-flex items-center py-1 sm:py-2 px-3 sm:px-6 bg-white/[.03]  ring-1 ring-white/[.2] shadow text-white fill-white rounded-2xl text-lg font-semibold'
          title='Click to Connect your GitHub Account'
          onClick={() => signIn('github', { callbackUrl: '/' })}>
          <span className='mr-2 block sm:hidden text-xl font-bold'>+</span>
          <GitHubLogo />
          <span className='ml-3 hidden sm:block'>Connect</span>
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
