'use client';

import React from 'react';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const BibataMarquee: React.FC<Props> = (_props) => {
  const List: React.FC = () => {
    const counts = Array.from(new Array(3), (_, i) => i + 1);
    return (
      <>
        {counts.map((key) => (
          <span
            key={key}
            className='mx-4 text-5xl sm:text-8xl font-black opacity-50 italic'>
            <span className='text-blue-200'>BEEEEEE</span>
            <span className='text-teal-100 ml-8'>BAAA</span>
            <span className='text-blue-200 ml-8'>TAAAAAA...</span>
          </span>
        ))}
      </>
    );
  };

  return (
    <div className='relative flex overflow-x-hidden'>
      <div className='py-12 animate-marquee whitespace-nowrap'>
        <List />
      </div>

      <div className='absolute top-0 py-12 animate-marquee2 whitespace-nowrap'>
        <List />
      </div>
    </div>
  );
};
