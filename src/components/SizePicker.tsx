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
      <div className='w-full sm:w-1/2 grid grid-cols-7 sm:grid-cols-8 gap-2 '>
        {props.list.map((t) => (
          <button
            key={t}
            onClick={() => {
              props.onClick(t);
            }}
            disabled={props.values === t}
            className={`${
              props.values === t
                ? 'bg-white/[.08] font-bold text-white/[.8]'
                : 'bg-transparent hover:bg-sky-500/[.2] text-white/[.7] font-normal'
            } rounded-xl border-white/[.08] border text-center`}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};
