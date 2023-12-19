'use client';

import React from 'react';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const LinuxMintLogo: React.FC<Props> = (_props) => {
  return (
    <svg
      className='fill-current h-8 sm:h-14'
      viewBox='0 0 256 256'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M256 128C256 198.692 198.692 256 128 256C57.3075 256 0 198.692 0 128C0 57.3075 57.3075 0 128 0C198.692 0 256 57.3075 256 128ZM58 153V63H78V153.3C78.1 164.2 87 173.1 98 173H158.3C169.2 172.9 178.1 164 178 153V103C178 97.5 173.5 93 168 93C162.5 93 158 97.5 158 103V153H138V103C138 97.5 133.5 93 128 93C122.5 93 118 97.5 118 103V153H98V103C98.1 86.5 111.5 73.1 128 73C135.4 73.1 142.5 75.9 148 80.9C153.5 75.8 160.6 73 168 73C184.5 73.1 197.9 86.5 198 103V153C197.9 175.1 180.1 192.9 158 193H98C75.9 192.9 58.1 175.1 58 153Z'
      />
    </svg>
  );
};
