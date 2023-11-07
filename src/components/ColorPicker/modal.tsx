import { useState } from 'react';
import Wheel from '@uiw/react-color-wheel';

import { CursorPreview } from './preview';

import { Color } from 'bibata/app';
import { generateRandomColors } from '@utils/randomColors';

type ColorWheelCardProps = {
  title: string;
  value: string;
  children?: React.ReactNode;
  onChange?: (c: string) => void;
};

const ColorWheelCard: React.FC<ColorWheelCardProps> = (props) => {
  const isHexCharacter = (char: string) => {
    const hexRegex = /^[0-9A-Fa-f]$/;
    return hexRegex.test(char);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='font-bold'>{props.title}</div>
      <div className='mt-2 p-2'>{props.children}</div>
      <input
        type='text'
        minLength={1}
        maxLength={7}
        className='w-full mt-2 p-1 bg-transparent text-center border border-white/[.1] hover:border-white focus:outline-none rounded'
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
  onColorPick: (color: Color) => void;
};

export const ColorPickerModal: React.FC<ColorPickerModalProps> = (props) => {
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

  return (
    <>
      {props.isOpen && (
        <div
          onClick={(e) => e.target === e.currentTarget && props.onClose()}
          className='z-20 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80'>
          <div className='bg-[#333333] w-full md:w-1/2 xl:w-1/3 max-h-full overflow-y-auto p-4 m-4 rounded-3xl shadow-lg'>
            <div className='flex justify-between'>
              <div>
                <button
                  className='px-6 py-4 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-400'
                  onClick={refreshColors}>
                  Refresh
                </button>
              </div>
              <button
                className='px-6 py-4 bg-gray-500 text-white rounded-xl font-bold hover:bg-gray-400'
                onClick={props.onClose}>
                X
              </button>
            </div>
            <div className='h-96 md:h-72 mt-2'>
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
                  width={100}
                  height={100}
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
                  width={100}
                  height={100}
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
                  width={100}
                  height={100}
                  color={watchColor}
                  onChange={(cr) => {
                    setWatchColor(cr.hex);
                  }}
                />
              </ColorWheelCard>
            </div>
            <div className='mt-11 flex justify-center'>
              <button
                className='w-1/2 py-4 bg-green-600 text-white font-bold rounded-xl text-xl hover:bg-green-500'
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
