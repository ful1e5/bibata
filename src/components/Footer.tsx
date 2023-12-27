'use client';

import React from 'react';
import Link from 'next/link';
import {
  BibataTypoLogo,
  GitHubLogo,
  RedditLogo,
  TwitchLogo,
  XLogo
} from './svgs';
import { LIB_VERSION } from '@root/version';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const Footer: React.FC<Props> = (_props) => {
  return (
    <footer className='bg-[--bg-dark] border-t border-white/[.1] p-3 mt-20'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          <Link className='hover:text-[--accent-active]' href='/'>
            <BibataTypoLogo size={50} />
          </Link>

          <ul className='flex-center gap-4 text-white/[.5]'>
            <li>
              <Link
                className='hover:text-white'
                href='https://github.com/ful1e5/bibata'
                target='_blank'
                rel='noopener noreferrer'>
                <GitHubLogo size={18} />
              </Link>
            </li>

            <li>
              <Link
                className='hover:text-white'
                href='https://reddit.com/u/ful1e5'
                target='_blank'
                rel='noopener noreferrer'>
                <RedditLogo size={18} />
              </Link>
            </li>

            <li>
              <Link
                className='hover:text-white'
                href='https://x.com/ful1e5'
                target='_blank'
                rel='noopener noreferrer'>
                <XLogo size={15} />
              </Link>
            </li>

            <li className='flex'>
              <Link
                className='hover:text-white'
                href='https://twitch.tv/ful1e5'
                target='_blank'
                rel='noopener noreferrer'>
                <TwitchLogo size={15} />
              </Link>
              <span className='relative flex h-2 w-2 sm:h-3 sm:w-3 -translate-y-1 sm:-translate-y-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-purple-500'></span>
              </span>
            </li>
          </ul>
        </div>

        <div className='pb-4 lg:pb-12'>
          <div className='flex items-center justify-start gap text-white/[.8]'>
            <Link
              target='_blank'
              href='https://github.com/ful1e5/bibata/blob/main/LICENSE'
              className='inline-flex gap-1 hover:text-white hover:underline'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 fill-current'
                viewBox='0 0 24 24'>
                <path d='M7 11l-2.5-2-2.5 2v-11h5v11zm10 1h-8v1h8v-1zm-8-12v2h11v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.637 6h-7.363v-10.039l-2 1.601v10.438h10.189c3.163 0 9.811-7.223 9.811-9.614v-14.386h-13zm8 6h-8v1h8v-1zm0 3h-8v1h8v-1z' />
              </svg>
              MIT License
            </Link>

            <p>•</p>

            <Link
              target='_blank'
              href='https://github.com/ful1e5/bibata/releases'
              className='inline-flex gap-1 hover:text-white hover:underline'>
              {`v${LIB_VERSION}`}
            </Link>
          </div>
          <div className='mt-7 pt-3 border-t border-white/[.1] flex flex-col'>
            <div className='text-white/[.5] w-full sm:w-3/5'>
              <h7 className='font-black'>Privacy Policy</h7>
              <p>
                Bibata is committed to ensuring the privacy of user information.
                We only collect necessary data when an account is linked, and
                this information is accessible through the public GitHub API.
                Some records related to app activities, such as downloads, may
                also be retained to enhance user experience.
              </p>
            </div>
            <div className='mt-5'>
              <p className='text-white/[.6] font-bold'>
                Copyright © 2023 AbdulKaiz Khatri
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
