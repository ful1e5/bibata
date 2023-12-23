'use client';

import '@app/(home)/styles.css';

import Link from 'next/link';

import { AnimatedCounter } from '@components/AnimatedCount';
import {
  AndroidLogo,
  BannerSVG,
  CheckMarkSVG,
  LinuxDownloadSVG,
  LinuxMintLogo,
  ManjaroLogo,
  WindowsDownloadSVG
} from '@components/svgs';

import { refreshColors } from '@utils/randomColors';

export default function HomePage() {
  const colors = refreshColors(true);
  return (
    <main>
      <div className='container m-auto px-3 pt-6 pb-28 '>
        <div className='h-[350px] sm:h-[600px] bg-gradient-radial from-10% from-orange-300/[.07] via-40% via-yellow-300/[.03] to-60%  flex flex-col justify-center items-center'>
          <section className='flex flex-col gap-6 justify-center items-center text-[--accent]'>
            <h1 className='inline-flex flex-col'>
              <span className='main-heading-0'>One Cursor</span>
              <span className='main-heading-1'>Endless Personalization.</span>
            </h1>
          </section>

          <section className='mt-16 sm:mt-24 flex-center flex-row gap-5 md:gap-10 text-black font-black'>
            <Link
              className='heading-button selected-button scale-animation'
              target='_blank'
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

      <section className=''>
        <BannerSVG
          base={colors.base}
          outline={colors.outline}
          watch={{ ...colors.watch }}
        />
      </section>

      <section>
        <div className='flex justify-center items-center'>
          <div className='w-full md:w-2/3 mt-10 p-5 rounded-3xl grid grid-cols-4 gap-5 '>
            <div className='count-card'>
              <p className='count-subtext'>Rank</p>
              <h4 className='count-heading'>#1</h4>
            </div>

            <div className='count-card'>
              <p className='count-subtext'>Downloads</p>
              <h4 className='count-heading'>
                <AnimatedCounter number='120' duration={2} />
                K+
              </h4>
            </div>

            <div className='count-card'>
              <p className='count-subtext'>Stars</p>
              <h4 className='count-heading'>1.4K+</h4>
            </div>

            <div className='count-card'>
              <p className='count-subtext'>Cursors</p>
              <h4 className='count-heading'>350+</h4>
            </div>
          </div>
        </div>
      </section>
      <div className='container m-auto px-3 pt-6 pb-28 '>
        <section className='mt-24 sm:mt-48'>
          <h1 className='section-heading'>Platforms</h1>
          {/* <p className='section-subheading my-3'>subtext</p> */}

          <div className='flex justify-center items-center'>
            <div className='w-full mt-10 p-5 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20'>
              <div className='platform-card bg-white/[.1]'>
                <span className='platform-icon bg-[#f9b801]'>
                  <LinuxDownloadSVG />
                </span>
                <h4 className='platform-heading'>XCursors</h4>

                <div className='mt-10 flex flex-col gap-4'>
                  {[
                    'HiDPi Supports',
                    'Wayland Supports',
                    'Custom Color',
                    'Animated Cursors',
                    'Custom Size'
                  ].map((line, key) => (
                    <div key={key} className='platform-line'>
                      <span className='text-[#f9b801]'>
                        <CheckMarkSVG />
                      </span>
                      <p className='text-blue-200'>{line}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className='platform-card bg-white/[.1]'>
                <span className='platform-icon bg-blue-400'>
                  <WindowsDownloadSVG />
                </span>

                <h4 className='platform-heading'>Windows</h4>

                <div className='mt-10 flex flex-col gap-4'>
                  {[
                    'HiDPi Supports',
                    'Custom Color',
                    'Animated Cursors (.ani)',
                    'Custom Size'
                  ].map((line, key) => (
                    <div key={key} className='platform-line'>
                      <span className='text-blue-400'>
                        <CheckMarkSVG />
                      </span>
                      <p className='text-blue-200'>{line}</p>
                    </div>
                  ))}
                </div>
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
