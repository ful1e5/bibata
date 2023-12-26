'use client';

import React from 'react';
import Link from 'next/link';
import { BibataTypoLogo, GitHubLogo, XLogo } from './svgs';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const Footer: React.FC<Props> = (_props) => {
  return (
    <footer className='bg-[--bg-dark] border-t border-white/[.1] p-3 mt-20'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center pb-6 md:gap-12'>
          <Link className='hover:text-yellow-300' href='/'>
            <BibataTypoLogo size={50} />
          </Link>

          <ul className='flex-center gap-5 text-white/[.5]'>
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
                href='https://x.com/ful1e5'
                target='_blank'
                rel='noopener noreferrer'>
                <XLogo size={15} />
              </Link>
            </li>
          </ul>
        </div>

        <div className='pb-4 lg:pb-12'>
          <div className='flex items-center justify-start'>
            <p className='opacity-40'>Copyright © 2023 AbdulKaiz Khatri</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
