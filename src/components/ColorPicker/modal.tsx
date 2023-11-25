'use client';

import React, { useEffect, useState } from 'react';
import Wheel from '@uiw/react-color-wheel';

import { CursorPreview } from './preview';

import { generateRandomColors } from '@utils/randomColors';

import { Color } from 'bibata/app';

type ColorWheelCardProps = {
  title: string;
  value: string;
  children?: React.ReactNode;

  // eslint-disable-next-line no-unused-vars
  onChange?: (c: string) => void;
};

const ColorWheelCard: React.FC<ColorWheelCardProps> = (props) => {
  const isHexCharacter = (char: string) => {
    const hexRegex = /^[0-9A-Fa-f]$/;
    return hexRegex.test(char);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='font-bold text-xs sm:text-md'>{props.title}</div>
      <div className='text-xl sm:text mt-2 p-2'>{props.children}</div>
      <input
        type='text'
        minLength={1}
        maxLength={7}
        className='w-4/5 sm:w-full text-xs sm:text-md mt-2 p-1 bg-white/[.05] text-center border border-white/[.1] hover:border-white focus:outline-none rounded-2xl'
        value={props.value}
        placeholder='e.g., #ff0000'
        onChange={(e) => {
          const inputValue = e.target.value;
          if (props.onChange) {
            for (let i = 0; i < inputValue.length; i++) {
              if (isHexCharacter(inputValue[i])) {
                props.onChange(inputValue);
              }
            }
          }
        }}
      />
    </div>
  );
};

type ColorPickerModalProps = {
  isOpen: boolean;

  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onColorPick: (color: Color) => void;
};

export const ColorPickerModal: React.FC<ColorPickerModalProps> = (props) => {
  const [wheelSize, setWheelSize] = useState(() => {
    try {
      return window.innerWidth <= 500 ? 50 : 90;
    } catch {
      return 90;
    }
  });

  const defaultColor = generateRandomColors();
  const [baseColor, setBaseColor] = useState<string>(defaultColor[0]);
  const [outlineColor, setOutlineColor] = useState<string>(defaultColor[1]);
  const [watchColor, setWatchColor] = useState<string>(defaultColor[2]);

  const refreshColors = () => {
    const color = generateRandomColors();
    setBaseColor(color[0]);
    setOutlineColor(color[1]);
    setWatchColor(color[2]);
  };

  const handleColorPick = () => {
    const color: Color = {
      base: baseColor,
      outline: outlineColor,
      watch: watchColor
    };
    props.onColorPick(color);
    props.onClose();
  };

  useEffect(() => {
    if (window !== undefined) {
      const handleResize = () => {
        setWheelSize(window.innerWidth <= 500 ? 50 : 90);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <>
      {props.isOpen && (
        <div
          onClick={(e) => e.target === e.currentTarget && props.onClose()}
          className='z-20 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80'>
          <div className='bg-[#333333] w-full md:w-1/2 xl:w-1/3 max-h-full overflow-y-auto p-4 m-4 rounded-3xl shadow-lg'>
            <div className='flex justify-between text-xs'>
              <div>
                <button
                  className='p-2 bg-[#93f5d2] text-black rounded-2xl font-bold hover:bg-[#d9c57f] active:bg-[#ffc68f]'
                  onClick={refreshColors}>
                  Magic
                </button>
              </div>
              <button
                className='p-2 bg-gray-500 text-white rounded-full font-bold hover:bg-gray-400'
                onClick={props.onClose}>
                X
              </button>
            </div>
            <div className='h-72 sm:h-96 md:h-72 mt-2'>
              <CursorPreview
                base={baseColor}
                outline={outlineColor}
                watch={watchColor}
              />
            </div>
            <div className='mt-8 grid grid-cols-3 gap-10'>
              <ColorWheelCard
                title='Base'
                value={baseColor}
                onChange={(c) => setBaseColor(c)}>
                <Wheel
                  width={wheelSize}
                  height={wheelSize}
                  color={baseColor}
                  onChange={(cr) => {
                    setBaseColor(cr.hex);
                  }}
                />
              </ColorWheelCard>

              <ColorWheelCard
                title='Outline'
                value={outlineColor}
                onChange={(c) => setOutlineColor(c)}>
                <Wheel
                  width={wheelSize}
                  height={wheelSize}
                  color={outlineColor}
                  onChange={(cr) => {
                    setOutlineColor(cr.hex);
                  }}
                />
              </ColorWheelCard>

              <ColorWheelCard
                title='Watch BG'
                value={watchColor}
                onChange={(c) => setWatchColor(c)}>
                <Wheel
                  width={wheelSize}
                  height={wheelSize}
                  color={watchColor}
                  onChange={(cr) => {
                    setWatchColor(cr.hex);
                  }}
                />
              </ColorWheelCard>
            </div>
            <div className='mt-11 flex justify-center'>
              <button
                className='w-1/2 py-4 bg-green-600 text-white font-bold rounded-3xl text-xl hover:bg-green-500'
                onClick={handleColorPick}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
