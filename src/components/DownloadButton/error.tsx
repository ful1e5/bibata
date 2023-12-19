'use client';

import React from 'react';
import Link from 'next/link';

import { bugReportTemplate } from '@utils/bug-report';

import { ErrorSVG } from '@components/svgs';

import { BUG_REPORT_ENDPOINT } from '@root/configs';

import { ErrorLogs } from 'bibata/app';

type Props = {
  logs: ErrorLogs;
  onClick: () => void;
};

export const DownloadError: React.FC<Props> = (props) => {
  const limitExceeded = props.logs.text === 'Download Limit Exceeded.';

  return (
    <>
      {props.logs.text && (
        <>
          <div className='flex mt-2 p-4 justify-center items-center fill-red-300 text-red-300'>
            <div className='mr-2 h-6 w-6'>
              <ErrorSVG size={19} />
            </div>
            <p className='font-bold'>{props.logs.text}</p>
          </div>

          <div className='mt-2 mb-2 flex justify-center gap-2'>
            {limitExceeded ? (
              <>
                <Link
                  className='inline-flex gap-2 justify-center items-center bg-white hover:bg-white/[.8] px-5 py-2 rounded-full text-black font-bold'
                  target='_blank'
                  onClick={props.onClick}
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
                  className='inline-flex gap-2 justify-center items-center ring-1 ring-white/[.2] hover:bg-white/[.2] hover:ring-white/[.4] px-4 py-2 rounded-full'
                  target='_blank'
                  onClick={props.onClick}
                  href='https://github.com/ful1e5/bibata#why-a-download-limit'>
                  Read More
                </Link>
              </>
            ) : (
              <>
                <Link
                  className='bg-red-500 hover:bg-red-400 px-4 py-2 rounded-full'
                  target='_blank'
                  onClick={props.onClick}
                  href={BUG_REPORT_ENDPOINT(
                    props.logs.text,
                    bugReportTemplate(props.logs.text, props.logs)
                  )}>
                  Report Bug
                </Link>
                <button
                  className='ring-1 ring-white/[.2] hover:bg-white/[.1] px-4 py-2 rounded-full'
                  onClick={props.onClick}>
                  Dismiss
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
