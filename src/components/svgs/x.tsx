'use client';

import React from 'react';

type Props = { size?: number };

export const XLogo: React.FC<Props> = (props) => {
  const size = props.size || 16;

  return (
    <svg
      className={`fill-current w-[${size}px] sm:w-5`}
      width={size}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      role='none'>
      <path d='M14.2833 10.1624L23.2178 0H21.1006L13.3427 8.82384L7.14656 0H0L9.36984 13.3432L0 24H2.11732L10.3098 14.6817L16.8534 24H24L14.2833 10.1624ZM2.88022 1.55962H6.1323L21.1016 22.5113H17.8495L2.88022 1.55962Z' />
    </svg>
  );
};
