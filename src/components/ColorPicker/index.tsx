'use client';

import React, { useState } from 'react';

import { Color, Colors } from 'bibata-live';
import { ColorPickerModal } from './modal';

type ColorPickerButtonProps = {
  name: string;
  color?: Color;
  selected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

export const ColorPickerButton: React.FC<ColorPickerButtonProps> = (props) => {
  const stops = Array.from(
    { length: 12 },
    (_, i) => `hsl(${i * (360 / 12)}, 100%, 50%)`
  ).join(', ');

  return (
    <button
      className={`container py-3 flex flex-col justify-center items-center rounded-3xl ring-1 ${
        props.selected ? 'ring-white/[.3] bg-white/[.1]' : 'ring-white/[.2]'
      }`}
      onClick={props.onClick}
      style={{
        maxWidth: '100%',
        overflow: 'hidden'
      }}>
      <div
        className='mt-2 w-14 h-14 rounded-full font-bold flex justify-center items-center text-center shadow-xl'
        style={
          props.color
            ? {
                backgroundColor: `#${props.color.base}`
              }
            : {
                backgroundBlendMode: 'screen',
                background: `radial-gradient( circle closest-side, hsl(0, 0%, 100%), hsl(0, 0%, 0%) 90%), conic-gradient(${stops})`
              }
        }>
        {props.children}
      </div>
      <div className='mt-3 text-center'>{props.name}</div>
    </button>
  );
};

type ColorPickerProps = {
  colors: Colors;
  onClick?: (c: Color) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colorName, setColorName] = useState<string>('Amber');

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full md:w-1/2 mx-3 sm:mx-32 grid grid-cols-4 gap-7'>
        {Object.entries(props.colors).map(([name, color], i) => (
          <ColorPickerButton
            key={i}
            name={name}
            selected={name === colorName}
            color={color}
            onClick={() => {
              if (props.onClick) {
                props.onClick(color);
                setColorName(name);
              }
            }}
          />
        ))}

        <ColorPickerButton
          key='colorPicker'
          name={'Custom'}
          selected={colorName === 'Custom'}
          onClick={() => setIsModalOpen(true)}
        />
        <ColorPickerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onColorPick={(c) => {
            if (props.onClick) {
              props.onClick(c);
              setColorName('Custom');
            }
          }}
        />
      </div>
    </div>
  );
};
