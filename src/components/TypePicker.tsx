'use client';

import React, { useEffect, useState } from 'react';

import { FlipCursorSVG, ModernSVG, OriginalSVG } from './svgs';

interface Props {
  list: string[];
  value: string;

  onChange: (v: string, m: boolean) => void; // eslint-disable-line no-unused-vars
}

export const TypePicker: React.FC<Props> = (props) => {
  const [type, setType] = useState(props.value);
  const [rightHandMode, setRightHandMode] = useState(false);

  useEffect(() => {
    props.onChange(rightHandMode ? `${type}Right` : type, rightHandMode);
  }, [type, rightHandMode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full sm:w-3/5 lg:w-2/5 px-1 sm:px-0'>
        <div className={`grid grid-cols-5 gap-3`}>
          {props.list.map((t) => {
            const active = props.value.includes(t);

            return (
              <button
                key={t}
                title={`Bibata ${t}`}
                disabled={active}
                onClick={() => setType(t)}
                className={`py-2 flex justify-center items-center gap-1 col-span-2 font-bold border rounded-full shadow-md border-white/[.2] transition active:scale-90 ${
                  active
                    ? 'bg-white fill-black text-black font-bold'
                    : 'fill-white/[.4] text-white/[.4] hover:text-white hover:fill-white hover:border-white'
                }`}>
                <>
                  {t === 'Modern' && <ModernSVG flip={rightHandMode} />}
                  {t === 'Original' && <OriginalSVG flip={rightHandMode} />}
                  <p className='hidden sm:block'>{t}</p>
                </>
              </button>
            );
          })}
          <button
            title={rightHandMode ? 'Right Hand Mode' : 'Left Hand Mode'}
            onClick={() => setRightHandMode(!rightHandMode)}
            className='py-2 flex justify-center items-center gap-1 font-bold border rounded-full shadow-md border-white/[.2] transition-all active:scale-90 active:bg-white active:text-stone-300 hover:scale-105 fill-white/[.4] text-white/[.4] hover:text-white hover:fill-white hover:border-white'>
            <FlipCursorSVG flip={rightHandMode} />
          </button>
        </div>
      </div>
    </div>
  );
};
