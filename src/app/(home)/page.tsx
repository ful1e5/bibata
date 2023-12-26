'use client';

import '@app/(home)/styles.css';

import Link from 'next/link';

import { AnimatedCounter } from '@components/AnimatedCount';
import {
  AndroidLogo,
  BannerSVG,
  LinuxDownloadSVG,
  LinuxMintLogo,
  ManjaroLogo,
  WindowsDownloadSVG
} from '@components/svgs';

export default function HomePage() {
  const marqueElements = () => {
    const marqueeCounts = Array.from(new Array(3), (_, i) => i + 1);
    return (
      <>
        {marqueeCounts.map((key) => (
          <span key={key} className='mx-4 text-8xl font-black italic'>
            <span className='text-yellow-300'>BEEEEEE</span>
            <span className='text-yellow-300 ml-8'>BAAA</span>
            <span className='text-yellow-400 ml-8'>TAAAAAA...</span>
          </span>
        ))}
      </>
    );
  };

  return (
    <main>
      <div className='container m-auto px-3 pt-6 pb-24'>
        <div className='h-[350px] sm:h-[600px] bg-gradient-radial from-10% from-orange-300/[.07] via-40% via-yellow-300/[.03] to-60%  flex flex-col justify-center items-center'>
          <section className='flex flex-col gap-6 justify-center items-center text-[--accent]'>
            <h1 className='inline-flex flex-col'>
              <span className='main-heading-0'>
                One{' '}
                <span className='inline-flex flex-col h-[calc(40px*theme(lineHeight.tight))] sm:h-[calc(96px*theme(lineHeight.tight))] overflow-hidden'>
                  <ul className='block animate-text-slide leading-tight [&_li]:block'>
                    <li>Cursor</li>
                    <li>Mouser</li>
                    <li className='tracking-wider'>Bibata</li>
                    <li aria-hidden='true'>Cursor</li>
                  </ul>
                </span>
                {/* Cursor */}
              </span>
              <span className='main-heading-1'>Endless Personalization.</span>
            </h1>
          </section>

          <section className='mt-16 sm:mt-24 flex-center flex-row gap-5 md:gap-10 text-black font-black'>
            <Link
              className='heading-button selected-button scale-animation'
              href='/studio'>
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
              Studio
            </Link>

            <Link
              className='heading-button outlined-button scale-animation'
              href='https://github.com/ful1e5/bibata#how-to-upgrade-to-a-pro-account'>
              Get Pro
            </Link>
          </section>
        </div>

        <section className='text-center'>
          <p className='text-[12px] text-white/[.5]'>Preinstalled on</p>
          <div className='mt-6 flex-center text-white/[.6] gap-3 sm:gap-6'>
            <Link
              className='hover:text-[--accent] scale-animation'
              href='https://developer.android.com/about/versions/14/get'
              title='Android 14'
              target='_blank'>
              <AndroidLogo />
            </Link>

            <Link
              className='hover:text-[--accent] scale-animation'
              href='https://linuxmint.com/edition.php?id=299'
              title='Linux Mint 21 Vanessa'
              target='_blank'>
              <LinuxMintLogo />
            </Link>

            <Link
              className='hover:text-[--accent] scale-animation'
              href='https://manjaro.org'
              title='Manjaro Linux'
              target='_blank'>
              <ManjaroLogo />
            </Link>
          </div>
        </section>
      </div>

      <BannerSVG
        base='#adb9d5'
        outline='#738281'
        watch={{
          bg: '#444444',
          c1: '#32a0da',
          c2: '#7eba41',
          c3: '#f05024',
          c4: '#fcb813'
        }}
      />

      <section className='mt-12'>
        <div className='flex justify-center items-center'>
          <div className='w-full lg:w-4/5 p-5 rounded-3xl grid grid-cols-2 sm:grid-cols-4 gap-5 '>
            <div className='count-card'>
              <p className='count-subtext'>Rank</p>
              <h4 className='count-heading'>#1</h4>
            </div>

            <div className='count-card'>
              <p className='count-subtext'>Downloads</p>
              <h4 className='count-heading'>
                <AnimatedCounter number='121' duration={2} />
                K+
              </h4>
            </div>

            <div className='count-card'>
              <p className='count-subtext'>Stars</p>
              <h4 className='count-heading'>1.5K+</h4>
            </div>

            <div className='count-card'>
              <p className='count-subtext'>Cursors</p>
              <h4 className='count-heading'>350+</h4>
            </div>
          </div>
        </div>
      </section>

      <section className='mt-8'>
        <div className='relative flex overflow-x-hidden'>
          <div className='py-12 animate-marquee whitespace-nowrap'>
            {marqueElements()}
          </div>

          <div className='absolute top-0 py-12 animate-marquee2 whitespace-nowrap'>
            {marqueElements()}
          </div>
        </div>
      </section>

      <div className='container m-auto px-3'>
        <section className='mt-24'>
          <h1 className='section-heading'>Supported Platforms</h1>
          {/* <p className='section-subheading my-3'>subtext</p> */}

          <div className='flex justify-center items-center'>
            <div className='w-full mt-10 p-5 rounded-3xl grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-20'>
              <div className='platform-card bg-white/[.1]'>
                <span className='platform-icon '>
                  <LinuxDownloadSVG />
                </span>
                <h4 className='platform-heading'>XCursors</h4>
                <p className='platform-line'>
                  Bibata Studio create stunning, HiDPI and Wayland-compatible
                  cursor websites with customizable colors, animated options,
                  and bespoke sizing for a professional and engaging user
                  experience.
                </p>
              </div>

              <div className='platform-card bg-white/[.1]'>
                <span className='platform-icon'>
                  <WindowsDownloadSVG />
                </span>

                <h4 className='platform-heading'>Windows Cursors</h4>
                <p className='platform-line'>
                  Bibata Studio craft Windows cursors with seamless HiDPI
                  support, personalized color schemes, dynamic animated (.ani)
                  elements, and tailored sizing for a truly customized user
                  interface.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='mt-24 sm:mt-48'>
          <h1 className='section-heading'>Open Source & Libraries</h1>
          {/* <p className='section-subheading my-3'>subtext</p> */}

          <div className='mt-10 w-full p-5 rounded-3xl grid grid-cols-1 md:grid-cols-2 lg:sm:grid-cols-3 gap-5 '>
            <Link
              href='https://github.com/ful1e5/Bibata_Cursor'
              target='_blank'
              className='library-card bg-white/[.1]'>
              <h4 className='library-card-heading'>Bibata Cursor</h4>
              <p className='library-card-text'>
                Open source, compact, and material designed cursor set.
              </p>

              <div className='library-card-lang w-28 bg-blue-400/[.1]'>
                <span className='circle bg-blue-300' />
                <p className='text-xs text-blue-200'>TypeScript</p>
              </div>
            </Link>

            <Link
              href='https://github.com/ful1e5/clickgen'
              target='_blank'
              className='library-card bg-white/[.1]'>
              <h4 className='library-card-heading'>Clickgen</h4>
              <p className='library-card-text'>
                The hassle-free cursor building toolbox.
              </p>

              <div className='library-card-lang w-24 bg-orange-400/[.1]'>
                <span className='circle bg-orange-300' />
                <p className='text-xs text-orange-200'>Python</p>
              </div>
            </Link>

            <Link
              href='https://github.com/ful1e5/cbmp'
              target='_blank'
              className='library-card bg-white/[.1]'>
              <h5 className='library-card-heading'>Cbmp</h5>
              <p className='library-card-text'>
                CLI App for converting cursor svg file to png.
              </p>

              <div className='library-card-lang w-28 bg-blue-400/[.1]'>
                <span className='circle bg-blue-300' />
                <p className='text-xs text-blue-200'>TypeScript</p>
              </div>
            </Link>

            <Link
              href='https://github.com/python-pillow/Pillow'
              target='_blank'
              className='library-card bg-white/[.1]'>
              <h5 className='library-card-heading'>Pillow</h5>
              <p className='library-card-text'>The Python Imaging Library.</p>

              <div className='library-card-lang w-24 bg-orange-400/[.1]'>
                <span className='circle bg-orange-300' />
                <p className='text-xs text-orange-200'>Python</p>
              </div>
            </Link>

            <Link
              href='https://github.com/lovell/sharp'
              target='_blank'
              className='library-card bg-white/[.1]'>
              <h5 className='library-card-heading'>Sharp</h5>
              <p className='library-card-text'>
                High performance Node.js image processer.
              </p>

              <div className='library-card-lang w-28 bg-yellow-400/[.1]'>
                <span className='circle bg-yellow-300' />
                <p className='text-xs text-yellow-200'>JavaScript</p>
              </div>
            </Link>

            <Link
              href='https://github.com/quantum5/win2xcur'
              target='_blank'
              className='library-card bg-white/[.1]'>
              <h5 className='library-card-heading'>Win2XCur</h5>
              <p className='library-card-text'>
                The tool that converts cursors.
              </p>

              <div className='library-card-lang w-24 bg-orange-400/[.1]'>
                <span className='circle bg-orange-300' />
                <p className='text-xs text-orange-200'>Python</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
