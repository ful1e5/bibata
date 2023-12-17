'use client';

import React from 'react';

interface Props {
  list: number[];
  values: number;

  onClick: (v: number) => void; // eslint-disable-line no-unused-vars
}

export const SizePicker: React.FC<Props> = (props) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='w-full md:w-2/3 lg:w-1/2 sm:mx-32 grid grid-cols-7 gap-3 text-[9px] sm:text-sm'>
        {props.list.map((t) => {
          const selected = props.values === t;
          return (
            <button
              key={t}
              disabled={selected}
              onClick={() => props.onClick(t)}
              className={`p-1 py-3 sm:p-3 rounded-xl text-center transform ring-1 ring-white/[.2] hover:scale-105 hover:bg-white/[.1] ${
                selected ? 'bg-white/[.25] font-black ' : 'bg-white/[.03]'
              }`}>
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
};
