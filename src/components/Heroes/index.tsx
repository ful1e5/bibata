'use client';

import React from 'react';

import { HeroesElements } from './elements';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const Heroes: React.FC<Props> = (_props) => {
  return (
    <div className='relative flex flex-rows overflow-x-hidden'>
      <div className='animate-marquee whitespace-nowrap'>
        <HeroesElements />
      </div>

      <div className='absolute top-0 animate-marquee2 whitespace-nowrap'>
        <HeroesElements />
      </div>
    </div>
  );
};
