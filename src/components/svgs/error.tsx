'use client';

import React from 'react';

type Props = {
  size?: number;
};

export const ErrorSVG: React.FC<Props> = (props) => {
  return (
    <svg
      className='fill-inherit'
      width={props.size || 104}
      height={props.size || 104}
      viewBox='0 0 104 104'
      preserveAspectRatio='xMaxYMid meet'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M52 18C33.2223 18 18 33.2223 18 52C18 70.7777 33.2223 86 52 86C70.7777 86 86 70.7777 86 52C86 33.2223 70.7777 18 52 18ZM6 52C6 26.5949 26.5949 6 52 6C77.4051 6 98 26.5949 98 52C98 77.4051 77.4051 98 52 98C26.5949 98 6 77.4051 6 52Z'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M63.7574 72.2427L29.9829 38.4682L38.4682 29.9829L72.2427 63.7574L63.7574 72.2427Z'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M71.3555 39.3555L39.3554 71.3556L30.8701 62.8703L62.8702 30.8702L71.3555 39.3555Z'
      />
    </svg>
  );
};
