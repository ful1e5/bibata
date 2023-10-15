'use client';

import React from 'react';
import { Color, Colors } from 'bibata-live';

type ColorPickerProps = {
  colors: Colors;
  value: Color;
  onClick?: (color: Color) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  onClick
}) => {
  const stops = Array.from(
    { length: 12 },
    (_, i) => `hsl(${i * (360 / 12)}, 100%, 50%)`
  ).join(', ');

  const renderColorButton = ([name, color]: [string, Color], i: number) => (
    <button
      key={i}
      className='container py-3 flex flex-col justify-center items-center rounded-3xl ring-1 ring-white/[.2]'
      onClick={() => onClick && onClick(color)}>
      <div
        className='mt-2 w-14 h-14 rounded-full font-bold flex justify-center items-center text-center shadow-xl'
        style={{
          backgroundColor: `#${color.base}`,
          maxWidth: '100%', // Ensure the inner div doesn't overflow its container
          overflow: 'hidden' // Hide overflow content if any
        }}></div>
      <div className='mt-3 text-center'>{name}</div>
    </button>
  );

  return (
    <div className='w-full sm:w-1/2 grid grid-cols-4 gap-7'>
      {Object.entries(colors).map(renderColorButton)}

      <button
        className='container flex flex-col justify-center items-center rounded-3xl ring-1 ring-white/[.2]'
        onClick={() => console.log('Customize Color')}>
        <div
          className='mt-2 w-14 h-14 rounded-full font-bold flex justify-center items-center text-center shadow-xl'
          style={{
            backgroundBlendMode: 'screen',
            background: `radial-gradient(
              circle closest-side,
              hsl(0, 0%, 100%),
              hsl(0, 0%, 0%) 90%
            ),
            conic-gradient(${stops})`,
            maxWidth: '100%',
            overflow: 'hidden'
          }}>
          <svg
            fill='rgba(50,50,50,0.95)'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            width='40%'
            height='40%'
            viewBox='0 0 528.899 528.899'>
            <g>
              <path d='M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z' />
            </g>
          </svg>
        </div>
        <div className='mt-3 text-center'>Customize</div>
      </button>
    </div>
  );
};
