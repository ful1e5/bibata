'use client';

import '@app/(home)/styles.css';

import { AnimatedCounter } from '@components/AnimatedCount';
import { AndroidLogo, LinuxMintLogo } from '@components/svgs';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <div className='container m-auto px-3 py-6'>
        <div className='mt-5 sm:mt-32 lg:mt-56 flex flex-col gap-6 justify-center items-center text-[--accent]'>
          <>
            <h1 className='heading-0'>One Cursor</h1>
            <h2 className='heading-1'>Endless Personalization.</h2>
          </>

          <p className='sub-heading'>
            Free and open-source, the internet&apos;s premier #1 cursor offers
            fully customizable features and an interactive web studio.
          </p>
        </div>

        <div className='mt-10 flex-center flex-col sm:flex-row gap-5 md:gap-20 text-black font-black'>
          <Link
            className='heading-button selected-button'
            target='_blank'
            href='https://github.com/ful1e5/bibata#how-to-upgrade-to-a-pro-account'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'>
              <path
                fillRule='evenodd'
                d='M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z'
                clipRule='evenodd'
              />
            </svg>
            Get Pro
          </Link>

          <Link className='heading-button outlined-button' href='/studio'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'>
              <path
                fillRule='evenodd'
                d='M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z'
                clipRule='evenodd'
              />
            </svg>
            Studio
          </Link>
        </div>

        <div className='mt-20 sm:mt-40 lg:mt-52 text-center'>
          <p className='text-[6px] sm:text-[10px] font-bold text-white/[.9] uppercase'>
            Default in
          </p>

          <div className='mt-4 flex-center text-white/[.8] gap-6'>
            <Link
              href='https://developer.android.com/about/versions/14/get'
              target='_blank'
              className='hover:text-[--accent]'>
              <AndroidLogo />
            </Link>

            <Link
              href='https://linuxmint.com/edition.php?id=299'
              target='_blank'
              className='hover:text-[--accent]'>
              <LinuxMintLogo />
            </Link>
          </div>
        </div>

        <div className='mt-20 sm:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-10 text-center'>
          <div className='count-card'>
            <h1 className='count-heading'>#1</h1>
            <p className='count-subtext'>Most Popular Cursor</p>
          </div>

          <div className='count-card'>
            <h1 className='count-heading'>
              <AnimatedCounter number={'120'} duration={4} />
              K+
            </h1>
            <p className='count-subtext'>Downloads and counting...</p>
          </div>

          <div className='count-card'>
            <h1 className='count-heading'>1.4K+</h1>
            <p className='count-subtext'>Stars on Github</p>
          </div>

          <div className='count-card'>
            <h1 className='count-heading'>
              <AnimatedCounter number={'350'} duration={0.01} />+
            </h1>
            <p className='count-subtext'>Handcrafted Cursors</p>
          </div>
        </div>
      </div>
    </main>
  );
}
