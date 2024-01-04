'use client';

import React from 'react';

import {
  LinuxDownloadSVG,
  PNGsDownloadSVG,
  WindowsDownloadSVG
} from '@components/svgs';
import { Platform } from '@prisma/client';

type Props = {
  disabled?: boolean;
  version: string;

  onClick: (p: Platform) => void; // eslint-disable-line no-unused-vars
};

export const DownloadSubButtons: React.FC<Props> = (props) => {
  return (
    <div className='p-2'>
      <div className='p-6 grid grid-cols-2 gap-4 diviide-y-2 divide-white/[.1] text-left'>
        <button
          disabled={props.disabled}
          className='inline-flex flex-col justify-center items-center bg-white/[.1] hover:bg-orange-400 fill-white/[.5] hover:fill-black/[.6] text-white/[.7] hover:text-black/[.6] rounded-xl p-4 text-center transition active:scale-90'
          onClick={() => props.onClick('x11')}>
          <LinuxDownloadSVG />
          <p className='text-sm font-bold mt-2'>XCursors</p>
          <strong className='text-xs font-extrabold'>(.tar.gz)</strong>
        </button>
        <button
          disabled={props.disabled}
          className='inline-flex flex-col justify-center items-center bg-white/[.1] hover:bg-blue-400 fill-white/[.5] hover:fill-black/[.6] text-white/[.7] hover:text-black/[.6] rounded-xl p-4 text-center transition active:scale-90'
          onClick={() => props.onClick('win')}>
          <WindowsDownloadSVG />
          <p className='text-sm font-bold mt-2'>Windows Cursors</p>
          <strong className='text-xs font-extrabold'>(.zip)</strong>
        </button>

        <button
          disabled={props.disabled}
          className='inline-flex col-span-2 flex-col justify-center items-center bg-white/[.1] hover:bg-violet-400 fill-white/[.5] hover:fill-black/[.6] text-white/[.7] hover:text-black/[.6] rounded-xl p-4 text-center transition active:scale-90'
          onClick={() => props.onClick('png')}>
          <PNGsDownloadSVG />
          <p className='text-sm font-bold mt-2'>PNGs</p>
          <strong className='text-xs font-extrabold'>(.zip)</strong>
        </button>
      </div>
      <p className='text-xs text-center font-mono text-white/[.8]'>
        v{props.version}
      </p>
    </div>
  );
};
