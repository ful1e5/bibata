'use client';

import React, { useState } from 'react';

import { ColorPickerModal } from './modal';

import { Color } from 'bibata/app';
import { COLORS } from '@root/configs';

type Props = {
  name: string;
  color?: Color;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const ColorPickerButton: React.FC<Props> = (props) => {
  const { name, color, selected, disabled } = props;

  const stops = Array.from(
    { length: 12 },
    (_, i) => `hsl(${i * (360 / 12)}, 100%, 50%)`
  ).join(', ');
  const wheel = `radial-gradient( circle closest-side, hsl(0, 0%, 100%), hsl(0, 0%, 0%) 90%), conic-gradient(${stops})`;

  return (
    <button
      className={`p-3 sm:p-7 flex flex-col gap-1 justify-center items-center rounded-3xl transform ring-1 ring-white/[.2] hover:scale-105 hover:bg-white/[.1] ${
        selected ? 'bg-white/[.25] font-black' : 'bg-white/[.03]'
      } transition-all ease-in-out active:scale-90`}
      title={name !== 'Custom' ? `Bibata ${name}` : 'Customize Bibata Colors'}
      disabled={selected && disabled}
      onClick={props.onClick}>
      <div
        className='w-14 sm:w-20 h-14 sm:h-20 rounded-full'
        style={
          color
            ? {
                backgroundColor: color?.base,
                border: `3px solid ${color?.outline}`
              }
            : {
                backgroundBlendMode: 'screen',
                background: wheel,
                border: `3px solid #ffffff`
              }
        }
      />
      <p className='mt-3 text-center text-xs sm:text-sm'>{name}</p>
    </button>
  );
};

type ColorPickerProps = {
  colorName: string;

  // eslint-disable-next-line no-unused-vars
  onClick?: (name: string, c: Color) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='w-full md:w-2/3 lg:w-1/2 sm:mx-32 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-7'>
          {Object.entries(COLORS).map(([name, color], i) => (
            <ColorPickerButton
              key={i}
              name={name}
              selected={props.colorName === name}
              disabled={true}
              color={color}
              onClick={() => {
                if (props.onClick) {
                  props.onClick(name, color);
                }
              }}
            />
          ))}

          <ColorPickerButton
            key='colorPicker'
            name={'Custom'}
            selected={props.colorName === 'Custom'}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <ColorPickerModal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        onColorPick={(c) => {
          if (props.onClick) {
            props.onClick('Custom', c);
          }
        }}
      />
    </>
  );
};
