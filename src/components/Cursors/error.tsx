'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { bugReportTemplate } from '@utils/bug-report';

import { BUG_REPORT_ENDPOINT } from '@root/configs';

import { Color } from 'bibata/app';

type Props = {
  type: string;
  version: string;
  color: Color;

  message: string;
  stack: any;
};

export const CursorsError: React.FC<Props> = (props) => {
  const title = `Unable to load ${props.type} Cursors`;
  const detail = `${props.message}

#### Bibata Type & Version
${props.type} ${props.version}

#### Color

\`\`\`json
${JSON.stringify(props.color, null, 2)}
\`\`\``;

  const body = bugReportTemplate(detail, props.stack);

  const [show, setShow] = useState(true);
  const [reported, setReported] = useState(false);

  return (
    <div className='container h-[300px] md:h-[500px] flex flex-col gap-2  items-center text-center justify-center'>
      <h1 className='text-[28px] md:text-[68px] xl:text-[96px] font-black text-red-400'>
        Error Occured!
      </h1>
      <div className='-translate-y-3 md:-translate-y-7 max-w-sm md:max-w-xl text-red-50 font-semibold tracking-tight text-lg md:text-2xl'>
        {props.message}
      </div>

      {show && !reported ? (
        <>
          <div className='mt-10 flex justify-center gap-2 md:gap-6'>
            <Link
              className='bg-red-500 hover:bg-red-300 px-6 py-3 border border-white/[.2] rounded-full'
              target='_blank'
              onClick={() => {
                setShow(false);
                setReported(true);
              }}
              href={BUG_REPORT_ENDPOINT(title, body)}>
              Report Issue
            </Link>
            <button
              className='ring-1 ring-white/[.2] hover:bg-white/[.1] px-6 py-3 rounded-full'
              onClick={() => setShow(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        reported && <p className='mt-1'>Thanks for Reporting</p>
      )}
    </div>
  );
};
