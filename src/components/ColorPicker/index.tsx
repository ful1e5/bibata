'use client';

import React, { useState } from 'react';

import { ColorPickerModal } from './modal';
import { Color, Colors } from 'bibata-live/app';

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
      className={`container py-3 flex flex-col justify-center items-center rounded-3xl ring-1 ${
        props.selected ? 'ring-white/[.3] bg-white/[.1]' : 'ring-white/[.2]'
      }`}
      title={
        props.name !== 'Custom'
          ? `Bibata ${props.name}`
          : 'Customize Bibata Colors'
      }
      disabled={props.selected && props.disabled}
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
                backgroundColor: props.color.base
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
  colorName: string;
  onClick?: (name: string, c: Color) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='px-10 sm:p-0 w-full md:w-1/2 mx-3 sm:mx-32 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-7'>
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
