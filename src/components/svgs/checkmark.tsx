'use client';

import React from 'react';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const CheckMarkSVG: React.FC<Props> = (_props) => {
  return (
    <svg
      className='w-7 h-7'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  );
};
