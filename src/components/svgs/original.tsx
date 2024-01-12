'use client';

import React from 'react';

type Props = {
  flip?: boolean;
};

export const OriginalSVG: React.FC<Props> = (props) => {
  return (
    <svg
      className={`fill-inherit w-8 sm:w-16 sm:p-2 ${
        props.flip ? 'transform -scale-x-100' : ''
      }`}
      viewBox='0 0 256 256'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M53.9986 15.2881L231.789 172.408L125.988 174.809L54.0074 250.574L53.9986 15.2881ZM118.534 157.974L188 156.398L71 53.0001L71.0058 208L118.534 157.974Z'
      />
    </svg>
  );
};
