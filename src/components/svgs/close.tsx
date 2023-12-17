'use client';

import React from 'react';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const CloseSVG: React.FC<Props> = (_props) => {
  return (
    <svg
      className='w-4 sm:w-6'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'>
      <path
        fill-rule='evenodd'
        d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
        clip-rule='evenodd'
      />
    </svg>
  );
};
