'use client';

import React from 'react';

type Props = {
  count: number;
  children: React.ReactNode;
};

export const Marquee: React.FC<Props> = (props) => {
  const List: React.FC = () => {
    const counts = Array.from(new Array(props.count), (_, i) => i + 1);
    return (
      <>
        {counts.map((key) => (
          <span key={key}>{props.children}</span>
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
