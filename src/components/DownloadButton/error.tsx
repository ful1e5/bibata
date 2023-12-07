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
            <Link
              className='bg-red-500 hover:bg-red-400 px-4 py-2 rounded-xl '
              target='_blank'
              onClick={props.onClick}
              href={BUG_REPORT_ENDPOINT(
                props.logs.text,
                bugReportTemplate(props.logs.text, props.logs)
              )}>
              Report Bug
            </Link>
            <button
              className='ring-1 ring-white/[.2] hover:bg-white/[.1] px-4 py-2 rounded-xl'
              onClick={props.onClick}>
              Cancel
            </button>
          </div>
        </>
      )}
    </>
  );
};
