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
  children?: React.ReactNode;
};

export const ColorPickerButton: React.FC<Props> = (props) => {
  const stops = Array.from(
    { length: 12 },
    (_, i) => `hsl(${i * (360 / 12)}, 100%, 50%)`
  ).join(', ');

  return (
    <button
      className={`container p-7 sm:p-6 flex flex-row sm:flex-col gap-4 sm:gap-0 justify-center items-center rounded-3xl ring-1 ${
        props.selected ? 'ring-white/[.3] bg-white/[.1]' : 'ring-white/[.2]'
      }`}
      title={
        props.name !== 'Custom'
          ? `Bibata ${props.name}`
          : 'Customize Bibata Colors'
      }
      disabled={props.selected && props.disabled}
      onClick={props.onClick}>
      <div
        className='w-4/5 sm:w-20 h-24 sm:h-20 rounded-full flex justify-center items-center'
        style={
          props.color
            ? {
                color: props.color.outline,
                backgroundColor: props.color.base
              }
            : {
                color: 'transparent',
                backgroundBlendMode: 'screen',
                background: `radial-gradient( circle closest-side, hsl(0, 0%, 100%), hsl(0, 0%, 0%) 90%), conic-gradient(${stops})`
              }
        }>
        <p className='overflow-auto sm:hidden text-lg font-bold'>
          {props.name}
        </p>
        {props.children}
      </div>
      <div className='mt-0 sm:mt-3 text-center hidden sm:block'>
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
        <div className='w-full md:w-2/3 lg:w-1/2 sm:mx-32 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-7'>
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
