'use client';

import React from 'react';

import { ModernSVG, OriginalSVG } from './svgs';

interface Props {
  list: string[];
  value: string;

  onClick: (v: string) => void; // eslint-disable-line no-unused-vars
}

export const TypePicker: React.FC<Props> = (props) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='w-5/6 sm:w-1/2 lg:w-2/5 bg-black/[0.2] overflow-hidden '>
        <div className={`grid grid-cols-2 gap-3`}>
          {props.list.map((t) => (
            <button
              key={t}
              title={`Bibata ${t}`}
              disabled={t === props.value}
              onClick={() => props.onClick(t)}
              className={`py-2 inline-flex justify-center items-center gap font-bold border rounded-2xl shadow-md border-gray-500 ${
                t === props.value
                  ? 'bg-white fill-black text-black font-bold'
                  : 'fill-gray-500 text-gray-500 hover:text-white hover:fill-white hover:border-white'
              }`}>
              <>
                {t === 'Modern' && <ModernSVG />}
                {t === 'Original' && <OriginalSVG />}
                {t}
              </>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
