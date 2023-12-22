'use client';

import '@app/(home)/styles.css';

import { AnimatedCounter } from '@components/AnimatedCount';
import {
  AndroidLogo,
  CheckMarkSVG,
  LinuxDownloadSVG,
  LinuxMintLogo,
  ManjaroLogo,
  WindowsDownloadSVG
} from '@components/svgs';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <div className='container m-auto px-3 pt-6 pb-28'>
        <section className='mt-5 sm:mt-32 lg:mt-56 flex flex-col gap-6 justify-center items-center text-[--accent]'>
          <h1 className='inline-flex flex-col'>
            <span className='main-heading'>One Cursor</span>
            <span className='sub-heading'>Endless Personalization.</span>
          </h1>

          <p className='main-text'>
            Free and open-source, the internet&apos;s premier #1 cursor offers
            fully customizable features and an interactive web studio.
          </p>
        </section>

        <section className='mt-10 flex-center flex-row gap-5 md:gap-10 text-black font-black'>
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

        <section className='mt-20 text-center'>
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

        <section className='mt-24 sm:mt-48'>
          {/* <h1 className='section-heading'>Statistics</h1> */}
          {/* <p className='section-subheading my-3'>subtext</p> */}

          <div className='flex justify-center items-center'>
            <div className='w-full md:w-2/3 bg-gradient-to-br from-10% from-white/[.17] to-purple-300/[.08] to-100% mt-10 p-5 rounded-3xl grid grid-cols-2 sm:grid-cols-4 gap-5 '>
              <div className='count-card'>
                <p className='count-subtext'>Most Popular</p>
                <h4 className='count-heading text-pink-200'>#1</h4>
              </div>

              <div className='count-card'>
                <p className='count-subtext'>Downloads</p>
                <h4 className='count-heading text-orange-300'>
                  <AnimatedCounter number='120' duration={2} />
                  K+
                </h4>
              </div>

              <div className='count-card'>
                <p className='count-subtext'>Stars on Github</p>
                <h4 className='count-heading text-green-200'>1.4K+</h4>
              </div>

              <div className='count-card'>
                <p className='count-subtext'>Handcrafted Cursors</p>
                <h4 className='count-heading text-purple-200'>350+</h4>
              </div>
            </div>
          </div>
        </section>

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

              <div className='library-card-lang w-36 bg-blue-400/[.1]'>
                <span className='circle bg-blue-300' />
                <p className='text-blue-200'>TypeScript</p>
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

              <div className='library-card-lang w-36 bg-orange-400/[.1]'>
                <span className='circle bg-orange-300' />
                <p className='text-orange-200'>Python</p>
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

              <div className='library-card-lang w-36 bg-blue-400/[.1]'>
                <span className='circle bg-blue-300' />
                <p className='text-blue-200'>TypeScript</p>
              </div>
            </Link>

            <Link
              href='https://github.com/python-pillow/Pillow'
              target='_blank'
              className='library-card bg-white/[.1]'>
              <h5 className='library-card-heading'>Pillow</h5>
              <p className='library-card-text'>The Python Imaging Library.</p>

              <div className='library-card-lang w-36 bg-orange-400/[.1]'>
                <span className='circle bg-orange-300' />
                <p className='text-orange-200'>Python</p>
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

              <div className='library-card-lang w-36 bg-yellow-400/[.1]'>
                <span className='circle bg-yellow-300' />
                <p className='text-yellow-200'>JavaScript</p>
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

              <div className='library-card-lang w-36 bg-orange-400/[.1]'>
                <span className='circle bg-orange-300' />
                <p className='text-orange-200'>Python</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
