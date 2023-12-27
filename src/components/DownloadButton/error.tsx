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
                  className='inline-flex gap-2 justify-center items-center bg-white hover:bg-white/[.8] px-6 py-3 rounded-full text-black font-bold'
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
                  Learn More
                </Link>
              </>
            ) : (
              <>
                <Link
                  className='inline-flex gap-2 justify-center items-center bg-red-500 hover:bg-red-400 px-6 py-3 rounded-full'
                  target='_blank'
                  onClick={props.onClick}
                  href={BUG_REPORT_ENDPOINT(
                    props.logs.text,
                    bugReportTemplate(props.logs.text, props.logs)
                  )}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-6 fill-current'
                    viewBox='0 0 24 24'>
                    <path d='M7.074 1.408c0-.778.641-1.408 1.431-1.408.942 0 1.626.883 1.38 1.776-.093.336-.042.695.138.995.401.664 1.084 1.073 1.977 1.078.88-.004 1.572-.408 1.977-1.078.181-.299.231-.658.138-.995-.246-.892.436-1.776 1.38-1.776.79 0 1.431.63 1.431 1.408 0 .675-.482 1.234-1.118 1.375-.322.071-.6.269-.769.548-.613 1.017.193 1.917.93 2.823-1.21.562-2.524.846-3.969.846-1.468 0-2.771-.277-3.975-.84.748-.92 1.555-1.803.935-2.83-.168-.279-.446-.477-.768-.548-.636-.14-1.118-.699-1.118-1.374zm13.485 14.044h2.387c.583 0 1.054-.464 1.054-1.037s-.472-1.037-1.054-1.037h-2.402c-.575 0-1.137-.393-1.227-1.052-.092-.677.286-1.147.765-1.333l2.231-.866c.541-.21.807-.813.594-1.346-.214-.533-.826-.795-1.367-.584l-2.294.891c-.329.127-.734.036-.926-.401-.185-.423-.396-.816-.62-1.188-1.714.991-3.62 1.501-5.7 1.501-2.113 0-3.995-.498-5.703-1.496-.217.359-.421.738-.601 1.146-.227.514-.646.552-.941.437l-2.295-.89c-.542-.21-1.153.051-1.367.584-.213.533.053 1.136.594 1.346l2.231.866c.496.192.854.694.773 1.274-.106.758-.683 1.111-1.235 1.111h-2.402c-.582 0-1.054.464-1.054 1.037s.472 1.037 1.054 1.037h2.387c.573 0 1.159.372 1.265 1.057.112.728-.228 1.229-.751 1.462l-2.42 1.078c-.53.236-.766.851-.526 1.373s.865.753 1.395.518l2.561-1.14c.307-.137.688-.106.901.259 1.043 1.795 3.143 3.608 6.134 3.941 2.933-.327 5.008-2.076 6.073-3.837.261-.432.628-.514.963-.364l2.561 1.14c.529.236 1.154.005 1.395-.518.24-.522.004-1.137-.526-1.373l-2.42-1.078c-.495-.221-.867-.738-.763-1.383.128-.803.717-1.135 1.276-1.135z' />
                  </svg>
                  Report
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
