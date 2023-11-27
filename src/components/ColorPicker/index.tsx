'use client';

import React, { useState } from 'react';

import { ColorPickerModal } from './modal';

import { Color, Colors } from 'bibata/app';

type Props = {
  name: string;
  color?: Color;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const ColorPickerButton: React.FC<Props> = (props) => {
  const stops = Array.from(
    { length: 12 },
    (_, i) => `hsl(${i * (360 / 12)}, 100%, 50%)`
  ).join(', ');
  const wheel = `radial-gradient( circle closest-side, hsl(0, 0%, 100%), hsl(0, 0%, 0%) 90%), conic-gradient(${stops})`;

  return (
    <button
      className={`p-1.5 flex flex-col gap-1 justify-center items-center rounded-xl sm:rounded-2xl transform ${
        props.selected
          ? '-translate-y-4 scale-100 font-bold'
          : 'ring-1 ring-white/[.1] scale-95'
      } transition-all ease-in-out duration-100`}
      title={
        props.name !== 'Custom'
          ? `Bibata ${props.name}`
          : 'Customize Bibata Colors'
      }
      style={
        props.selected
          ? props.color
            ? {
                backgroundColor: props.color.base,
                color: props.color.outline,
                boxShadow: '0 4px 10px rgba(255, 255, 255, 0.2)'
              }
            : {
                backgroundColor: '#010101',
                color: '#ffffff',
                boxShadow:
                  '0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 15px rgba(0, 0, 0, 0.1), 0 9px 24px rgba(255, 0, 0, 0.5), 0 12px 30px rgba(0, 255, 0, 0.5), 0 15px 36px rgba(0, 0, 255, 0.5)'
              }
          : {}
      }
      disabled={props.selected && props.disabled}
      onClick={props.onClick}>
      <div
        className='w-full h-20 md:h-32 flex rounded-lg sm:rounded-xl justify-center items-center'
        style={
          props.color
            ? {
                color: props.color.outline,
                backgroundColor: props.color.base
              }
            : {
                color: 'transparent',
                backgroundBlendMode: 'screen',
                background: wheel
              }
        }>
        <p>{'o-o'}</p>
      </div>
      <div className='mt-0 sm:mt-3 text-center text-xs sm:text-sm'>
        {props.name}
      </div>
    </button>
  );
};

type ColorPickerProps = {
  colors: Colors;
  colorName: string;

  // eslint-disable-next-line no-unused-vars
  onClick?: (name: string, c: Color) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='w-full md:w-2/3 lg:w-1/2 sm:mx-32 grid grid-cols-4 gap-2 sm:gap-7'>
          {Object.entries(props.colors).map(([name, color], i) => (
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
