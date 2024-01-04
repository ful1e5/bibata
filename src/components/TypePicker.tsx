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
      <div className='w-full sm:w-1/2 lg:w-2/5 px-12 sm:px-0'>
        <div className={`grid grid-cols-2 gap-3`}>
          {props.list.map((t) => (
            <button
              key={t}
              title={`Bibata ${t}`}
              disabled={t === props.value}
              onClick={() => props.onClick(t)}
              className={`py-2 flex justify-center items-center gap-1 font-bold border rounded-full shadow-md border-white/[.2] transition active:scale-90 ${
                t === props.value
                  ? 'bg-white fill-black text-black font-bold'
                  : 'fill-white/[.4] text-white/[.4] hover:text-white hover:fill-white hover:border-white'
              }`}>
              <>
                {t === 'Modern' && <ModernSVG />}
                {t === 'Original' && <OriginalSVG />}
                <p className='hidden sm:block'>{t}</p>
              </>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
