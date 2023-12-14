'use client';

import React from 'react';

import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

import { GitHubLogo } from '@components/svgs';

type Props = {
  session: Session | null;
};

export const Profile: React.FC<Props> = (props) => {
  const user = props.session?.user;
  return (
    <div className='inline-flex items-center gap-1'>
      {!props.session ? (
        <button
          className='inline-flex items-center py-1 sm:py-2 px-3 sm:px-7 text-white ring-1 ring-white/[.4] rounded-full text-lg font-semibold'
          title='Click to Connect your GitHub Account'
          onClick={() => signIn('github', { callbackUrl: '/' })}>
          <GitHubLogo />
          <span className='ml-1 block sm:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-4 h-4'>
              <path
                fillRule='evenodd'
                d='M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z'
                clipRule='evenodd'
              />
            </svg>
          </span>
          <span className='sm:ml-3 hidden uppercase sm:block text-sm'>
            Connect
          </span>
        </button>
      ) : (
        <>
          <button
            className='w-8 sm:w-10 p-2 rounded-full hover:bg-white/[.3]'
            title='Logout'
            onClick={(e) => {
              e.preventDefault();
              signOut({ callbackUrl: '/' });
            }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z'
                clipRule='evenodd'
              />
            </svg>
          </button>

          <div className='w-9 sm:w-12 overflow-hidden rounded-2xl ring-white/[.2] ring-1 '>
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
