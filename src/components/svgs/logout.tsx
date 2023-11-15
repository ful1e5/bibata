'use client';

import React from 'react';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const LogoutSVG: React.FC<Props> = (_props) => {
  return (
    <svg
      className='w-full'
      fill='none'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        className='stroke-current text-current'
        d='M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  );
};
