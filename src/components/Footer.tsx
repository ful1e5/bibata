'use client';

import React from 'react';

import { usePathname } from 'next/navigation';
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

const getGitBranch = (url: string | undefined) => {
  if (!url) return null;
  const regex = /-git-(.*?)-/;
  const match = regex.exec(url);
  return match && match[1];
};

// eslint-disable-next-line no-unused-vars
export const Footer: React.FC<Props> = (_props) => {
  const path = usePathname();

  const gitCommintSHA = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const url = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;
  const branch = getGitBranch(url);

  const refreshUrl =
    branch === 'main' ? 'https://dev.bibata.live' : 'https://bibata.live';
  const refreshBranch = branch === 'main' ? 'dev' : 'upstream';

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
              <span className='relative flex h-2 w-2 sm:h-3 sm:w-3 -translate-y-1 -translate-x-1 sm:-translate-x-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-purple-500'></span>
              </span>
            </li>
          </ul>
        </div>

        <div className='pb-4 lg:pb-12'>
          <div className='flex items-center justify-start gap-1 font-mono tracking-tighter text-sm text-white/[.8]'>
            <Link
              target='_blank'
              href='https://github.com/ful1e5/bibata/blob/main/LICENSE'
              className='hover:text-white hover:underline'>
              MIT License
            </Link>

            <p>•</p>

            <Link
              target='_blank'
              href='https://github.com/ful1e5/bibata/releases'
              className='hover:text-white hover:underline'>
              {`v${LIB_VERSION}`}
            </Link>
          </div>

          <div className='mt-3 flex items-center justify-start gap-2 font-mono tracking-tighter text-sm text-white/[.89]'>
            <div className='inline-flex gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='fill-current w-3'
                viewBox='0 0 24 24'>
                <path d='M21 3c0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.323.861 2.433 2.05 2.832.168 4.295-2.021 4.764-4.998 5.391-1.709.36-3.642.775-5.052 2.085v-7.492c1.163-.413 2-1.511 2-2.816 0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.305.837 2.403 2 2.816v12.367c-1.163.414-2 1.512-2 2.817 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.295-.824-2.388-1.973-2.808.27-3.922 2.57-4.408 5.437-5.012 3.038-.64 6.774-1.442 6.579-7.377 1.141-.425 1.957-1.514 1.957-2.803zm-16.8 0c0-.993.807-1.8 1.8-1.8s1.8.807 1.8 1.8-.807 1.8-1.8 1.8-1.8-.807-1.8-1.8zm3.6 18c0 .993-.807 1.8-1.8 1.8s-1.8-.807-1.8-1.8.807-1.8 1.8-1.8 1.8.807 1.8 1.8z' />
              </svg>

              <p>{branch}</p>

              {gitCommintSHA && (
                <>
                  <p>•</p>
                  <Link
                    target='_blank'
                    href={`https://github.com/ful1e5/bibata/commit/${gitCommintSHA}`}
                    className='hover:text-white hover:underline'>
                    {`${gitCommintSHA.substring(0, 6)}`}
                  </Link>
                </>
              )}

              <p>
                (
                <Link
                  target='_blank'
                  href={`${refreshUrl}${path}`}
                  className='hover:text-white hover:underline'>
                  {`Switch to ${refreshBranch}`}
                </Link>
                )
              </p>
            </div>
          </div>

          <div className='mt-7 pt-3 border-t border-white/[.1] flex flex-col'>
            <div className='text-white/[.5] w-full sm:w-3/5 text-sm'>
              <h6 className='font-black'>Privacy Policy</h6>
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
