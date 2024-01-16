'use client';

import '@app/(home)/styles.css';

import Link from 'next/link';

import { Message } from '@components/Message';
import { AnimatedCounter as Counter } from '@components/AnimatedCount';
import { Marquee } from '@components/Marquee';
import { HeroesElements } from '@components/HeroesElements';
import {
  AndroidLogo,
  BannerSVG,
  LinuxDownloadSVG,
  LinuxMintLogo,
  ManjaroLogo,
  PNGsDownloadSVG,
  WindowsDownloadSVG
} from '@components/svgs';

export default function HomePage() {
  return (
    <main>
      <div className='container m-auto px-3 pt-6 pb-24'>
        <div className='h-[350px] sm:h-[600px] bg-gradient-radial from-10% from-orange-300/[.07] via-40% via-fushcia-300/[.07] to-60% flex flex-col justify-center items-center'>
          <Message
            tag='Alert'
            message='Bibata servers need an upgrade! Click to help with the upgrade.'
            href='https://www.github.com/sponsors/ful1e5'
          />
          <section className='flex flex-col gap-6 justify-center items-center'>
            <h1 className='inline-flex flex-col'>
              <span className='main-heading-0'>
                One{' '}
                <span className='inline-flex flex-col h-[calc(40px*theme(lineHeight.tight))] sm:h-[calc(96px*theme(lineHeight.tight))] overflow-hidden'>
                  <ul className='block animate-text-slide leading-tight [&_li]:block'>
                    <li className='tracking-wide'>Bibata</li>
                    <li>Cursor</li>
                    <li>Mouser</li>
                    <li className='tracking-wide' aria-hidden='true'>
                      Bibata
                    </li>
                  </ul>
                </span>
                {/* Cursor */}
              </span>
              <span className='main-heading-1'>Endless Personalization.</span>
            </h1>
          </section>

          <section className='mt-16 sm:mt-24 flex-center flex-row gap-5 md:gap-10 font-black'>
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
        base='#1e5c38'
        outline='#99f97f'
        watch={{
          bg: '#75b48f',
          c1: '#32a0da',
          c2: '#7eba41',
          c3: '#f05024',
          c4: '#fcb813'
        }}
      />

      <section className='mt-12'>
        <div className='flex justify-center items-center'>
          <div className='w-full lg:w-4/5 p-5 rounded-3xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 '>
            <div className='count-card'>
              <div className='count-heading'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='count-icon award-icon animate-float4'
                  viewBox='0 0 24 24'>
                  <path d='M18 10c0 3.309-2.691 6-6 6s-6-2.691-6-6 2.691-6 6-6 6 2.691 6 6zm4 1.737l-1.895 1.168.687 2.095-2.187.46-.079 2.2-2.213-.304-.84 2.04-1.977-1.031-1.496 1.635-1.497-1.634-1.977 1.031-.84-2.04-2.213.304-.079-2.2-2.186-.461.687-2.095-1.895-1.168 1.374-1.737-1.374-1.737 1.895-1.168-.687-2.095 2.187-.46.079-2.2 2.213.304.84-2.04 1.977 1.031 1.496-1.635 1.497 1.634 1.977-1.031.84 2.04 2.213-.304.079 2.2 2.186.461-.687 2.095 1.895 1.168-1.374 1.737 1.374 1.737zm-3-1.737c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7 7-3.134 7-7zm-1.859 10.276l2.401 3.724 1.146-2h2.312l-2.655-4.103c-.917.969-1.999 1.775-3.204 2.379zm-13.486-2.379l-2.655 4.103h2.312l1.146 2 2.401-3.724c-1.205-.604-2.287-1.41-3.204-2.379z' />
                </svg>
                <h4>#1</h4>
              </div>
              <p className='count-subtext'>Rank</p>
            </div>

            <div className='count-card'>
              <div className='count-heading'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='count-icon download-icon animate-float3'
                  viewBox='0 0 24 24'>
                  <path d='M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-18 1h4v-7h4v7h4l-6 6-6-6z' />
                </svg>
                <h4>
                  <Counter number='327' duration={5} />
                  K+
                </h4>
              </div>
              <p className='count-subtext'>Downloads</p>
            </div>

            <div className='count-card'>
              <div className='count-heading'>
                <svg
                  className='count-icon star-icon animate-float2'
                  clipRule='evenodd'
                  fillRule='evenodd'
                  strokeLinejoin='round'
                  strokeMiterlimit='2'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z'
                    fillRule='nonzero'
                  />
                </svg>
                <h4>1.5K+</h4>
              </div>
              <p className='count-subtext'>Stars</p>
            </div>

            <div className='count-card'>
              <div className='count-heading'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='count-icon pen-icon animate-float1'
                  viewBox='0 0 24 24'>
                  <path d='M18.009 13.388c-1.771 2.408-4.399 4.783-7.359 4.396-.801 1.119-1.695 2.682-2.688 4.496l-2.296.72c1.943-3.79 4.537-7.981 7.32-11.166-1.205.785-3.185 2.473-4.908 4.253-1.554-3.246.085-6.253 2.458-8.548-.067 1.081.413 2.068.772 2.575-.062-.904.044-2.52.704-3.92 1.323-1.116 2.492-1.92 3.829-2.622-.217.791-.033 1.739.222 2.331.116-.82.603-2.368 1.167-3.01 1.667-1.075 4.135-1.936 6.77-1.892-.291 1.623-1.143 4.258-2.294 5.893-.929.597-2.157.946-3.137 1.115.811.228 1.719.293 2.509.235-.575 1.207-1.157 2.311-2.039 3.666-1.216.679-2.77.978-3.832 1.035.743.389 2.097.617 2.802.443zm-14.009 8.612h-4v1h4v-1z' />
                </svg>
                <h4>350+</h4>
              </div>
              <p className='count-subtext'>Cursors</p>
            </div>
          </div>
        </div>
      </section>

      <section className='mt-8'>
        <Marquee count={3}>
          <span className='mx-4 text-5xl sm:text-8xl font-black opacity-50 italic'>
            <span className='text-blue-200'>BEEEEEE</span>
            <span className='text-teal-100 ml-8'>BAAA</span>
            <span className='text-blue-200 ml-8'>TAAAAAA...</span>
          </span>
        </Marquee>
      </section>

      <div className='container m-auto px-3'>
        <section className='mt-14'>
          <h1 className='section-heading'>Supported Platforms</h1>

          <div className='flex justify-center items-center'>
            <div className='w-full mt-10 p-5 grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-20'>
              <div className='platform-card bg-white/[.1]'>
                <span className='platform-icon'>
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

              <div className='platform-card bg-white/[.1]'>
                <span className='platform-icon'>
                  <PNGsDownloadSVG />
                </span>

                <h4 className='platform-heading'>Cursor Bitmaps</h4>
                <p className='platform-line'>
                  Bibata Studio specializes in designing top-notch PNG cursor
                  bitmaps, showcasing personalized color schemes, animated
                  sequences, and tailor-made dimensions for effortless
                  integration into games and websites.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className='mt-24'>
        <h1 className='section-heading'>Heroes</h1>
        <p className='section-subheading my-3'>
          The proficient team spearheading the Bibata.
        </p>

        <Marquee count={5}>
          <HeroesElements />
        </Marquee>
        <div className='flex justify-center my-3 mt-10'>
          <p className='section-subheading w-5/6 sm:w-2/3'>
            Bibata stands as a fully open-source platform, boasting actively
            maintained libraries. Elevate your involvement by joining our
            community at the tier exceeding $5 per month, where dedicated
            contributors have the opportunity to play a heroic role in advancing
            our mission.
          </p>
        </div>

        <div className='mt-6 flex-center flex-col sm:flex-row gap-2 sm:gap-5 md:gap-10 font-black'>
          <Link
            className='heading-button selected-button scale-animation'
            href='https://github.com/sponsors/ful1e5'>
            Become a Hero
          </Link>

          <Link
            className='heading-button outlined-button scale-animation'
            href='https://github.com/ful1e5/bibata'>
            Start contributing
          </Link>
        </div>
      </section>

      <div className='container m-auto px-3'>
        <section className='mt-24 sm:mt-48'>
          <h1 className='section-heading'>Open Source & Libraries</h1>

          <div className='mt-10 w-full p-5 rounded-3xl grid grid-cols-1 md:grid-cols-2 lg:sm:grid-cols-3 gap-5 '>
            <Link
              href='https://github.com/ful1e5/bibata'
              target='_blank'
              className='library-card bg-blue-400/[.3]'>
              <h4 className='library-card-heading'>Bibata</h4>
              <p className='library-card-text'>
                The place where Bibata<>&apos;</>s cursor gets personalized.
              </p>

              <div className='library-card-lang w-28 bg-blue-400/[.1]'>
                <span className='circle bg-blue-300' />
                <p className='text-xs text-blue-200'>TypeScript</p>
              </div>
            </Link>

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
          </div>
        </section>
      </div>
    </main>
  );
}
