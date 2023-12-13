'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { bugReportTemplate } from '@utils/bug-report';

import { ErrorSVG } from '@components/svgs';

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
    <div className='container h-72 flex flex-col gap-2 fill-red-300 items-center justify-center'>
      <ErrorSVG size={60} />
      <div className='max-w-sm font-bold text-red-300 text-center'>
        {props.message}
      </div>

      {show && !reported ? (
        <>
          <div className='mt-2 mb-2 flex justify-center gap-2'>
            <Link
              className='bg-red-500 hover:bg-red-400 px-4 py-2 rounded-xl '
              target='_blank'
              onClick={() => {
                setShow(false);
                setReported(true);
              }}
              href={BUG_REPORT_ENDPOINT(title, body)}>
              Report Issue
            </Link>
            <button
              className='ring-1 ring-white/[.2] hover:bg-white/[.1] px-4 py-2 rounded-xl'
              onClick={() => setShow(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        reported && <p>Thanks for Reporting</p>
      )}
    </div>
  );
};
