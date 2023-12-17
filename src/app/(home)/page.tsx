'use client';

import '@app/(home)/styles.css';

import { AnimatedCounter } from '@components/AnimatedCount';
import { AndroidLogo, LinuxMintLogo } from '@components/svgs';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <div className='container m-auto px-3 py-6'>
        <section className='mt-5 sm:mt-32 lg:mt-56 flex flex-col gap-6 justify-center items-center text-[--accent]'>
          <h1 className='inline-flex flex-col'>
            <span className='main-heading'>One Cursor</span>
            <span className='section-heading'>Endless Personalization.</span>
          </h1>

          <p className='main-text'>
            Free and open-source, the internet&apos;s premier #1 cursor offers
            fully customizable features and an interactive web studio.
          </p>
        </section>

        <section className='mt-10 flex-center flex-col sm:flex-row gap-5 md:gap-20 text-black font-black'>
          <Link
            className='heading-button selected-button scale-animation'
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

          <Link
            className='heading-button outlined-button scale-animation'
            href='/studio'>
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
        </section>

        <section className='mt-10 text-center'>
          <p className='text-[10px] text-white/[.5]'>Preinstalled on</p>
          <div className='mt-6 flex-center text-white/[.6] gap-3 sm:gap-6'>
            <Link
              className='hover:text-[--accent] scale-animation'
              href='https://developer.android.com/about/versions/14/get'
              target='_blank'>
              <AndroidLogo />
            </Link>

            <Link
              className='hover:text-[--accent] scale-animation'
              href='https://linuxmint.com/edition.php?id=299'
              target='_blank'>
              <LinuxMintLogo />
            </Link>
          </div>
        </section>

        <section className='mt-24 text-center'>
          <h1 className='section-heading'>Project Status</h1>
          {/* <p className='section-subheading mt-3'>subtext</p> */}

          <div className='bg-white/[.05] mt-10 grid grid-cols-2 lg:grid-cols-4 gap-10 p-5 rounded-3xl'>
            <div className='count-card'>
              <h4 className='count-heading text-pink-200'>#1</h4>
              <p className='count-subtext '>Most Popular</p>
            </div>

            <div className='count-card'>
              <h4 className='count-heading text-orange-300'>
                <AnimatedCounter number={'120'} duration={2} />
                K+
              </h4>
              <p className='count-subtext'>Downloads</p>
            </div>

            <div className='count-card'>
              <h4 className='count-heading text-green-200'>1.4K+</h4>
              <p className='count-subtext'>Stars on Github</p>
            </div>

            <div className='count-card'>
              <h4 className='count-heading text-purple-200'>350+</h4>
              <p className='count-subtext'>Handcrafted Cursors</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
