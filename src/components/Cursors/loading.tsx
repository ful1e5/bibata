'use client';

import React from 'react';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const CursorsLoading: React.FC<Props> = (_props) => {
  const cards = Array.from(new Array(12), (_, i) => i + 1);
  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {cards.map((key) => (
          <div
            key={key}
            className='overflow-hidden rounded-3xl bg-white/[0.05] border-white/[.1] border'>
            <div className={'w-full h-40 animate-pulse bg-white/[.2]'}></div>
            <div className='flex animate-pulse bg-white/[.1] h-12'></div>
          </div>
        ))}
      </div>
    </div>
  );
};
