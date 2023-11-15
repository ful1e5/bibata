'use client';

import React from 'react';

import { ErrorSVG } from '@components/svgs';

type Props = {
  message: string;
};

export const CursorsError: React.FC<Props> = (props) => {
  return (
    <div className='container h-72 flex flex-col gap-2 fill-red-200 items-center justify-center'>
      <ErrorSVG size={60} />
      <div className='max-w-sm font-bold text-center'>{props.message}</div>
    </div>
  );
};
