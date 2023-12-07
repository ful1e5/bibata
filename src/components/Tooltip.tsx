'use client';

import React, { useState } from 'react';

type Props = {
  tooltip: string;
  children: React.ReactElement;
};

const Tooltip: React.FC<Props> = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className='relative inline-block'
      style={{ zIndex: 999 }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}>
      {showTooltip && (
        <div className='absolute w-52 sm:w-64 top-1/2 left-1/2  transform -translate-x-1/2 translate-y-4  shadow'>
          <div className='flex max-w-xs flex-col items-center shadow-lg'>
            <div className='clip-bottom h-2 w-4 bg-black' />
            <div className='rounded-xl bg-black p-2 text-[8px] sm:text-xs text-white'>
              {props.tooltip}
            </div>
          </div>
        </div>
      )}
      {props.children}
    </div>
  );
};

export default Tooltip;
