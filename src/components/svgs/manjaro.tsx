'use client';

import React from 'react';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const ManjaroLogo: React.FC<Props> = (_props) => {
  return (
    <svg
      className='fill-current h-6 sm:h-12'
      viewBox='0 0 256 256'
      xmlns='http://www.w3.org/2000/svg'>
      <g transform='scale(4)'>
        <path d='m0 0v64h18v-46h23v-18z' />
        <path d='m23 23v41h18v-41z' />
        <path d='m46 0v64h18v-64z' />
      </g>
    </svg>
  );
};
