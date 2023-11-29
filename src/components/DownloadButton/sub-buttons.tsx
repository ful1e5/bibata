'use client';

import React from 'react';

import { LinuxDownloadSVG, WindowsDownloadSVG } from '@components/svgs';

type Props = {
  disabled?: boolean;
  version: string;

  onClick: (p: 'x11' | 'win') => void; // eslint-disable-line no-unused-vars
};

export const DownloadSubButtons: React.FC<Props> = (props) => {
  return (
    <div className='p-2'>
      <div className='p-6 grid grid-flow-col gap-4 diviide-y-2 divide-white/[.1] text-left'>
        <button
          disabled={props.disabled}
          className='inline-flex flex-col justify-center items-center bg-white/[.1] hover:bg-orange-400 fill-white/[.5] hover:fill-black/[.6] text-white/[.7] hover:text-black/[.6] rounded-xl p-4 text-center'
          onClick={() => props.onClick('x11')}>
          <LinuxDownloadSVG />
          <p className='text-sm font-bold mt-2'>XCursors</p>
          <strong className='text-xs font-extrabold'>(.tar.gz)</strong>
        </button>
        <button
          disabled={props.disabled}
          className='inline-flex flex-col justify-center items-center bg-white/[.1] hover:bg-blue-400 fill-white/[.5] hover:fill-black/[.6] text-white/[.7] hover:text-black/[.6] rounded-xl p-4 text-center'
          onClick={() => props.onClick('win')}>
          <WindowsDownloadSVG />
          <p className='text-sm font-bold mt-2'>Win Cursors</p>
          <strong className='text-xs font-extrabold'>(.zip)</strong>
        </button>
      </div>
      <p className='text-xs text-center font-mono text-white/[.8]'>
        v{props.version}
      </p>
    </div>
  );
};
