'use client';

import React, { useEffect, useState } from 'react';

import tinycolor from 'tinycolor2';
import Wheel from '@uiw/react-color-wheel';

import { CursorPreview } from './preview';
import { CloseSVG, RefreshSVG } from '@components/svgs';

import { generateRandomColors } from '@utils/randomColors';
import { WATCH_COLORS } from '@root/configs';

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
      <div className='font-bold text-xs sm:text-md text-center'>
        {props.title}
      </div>
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
      return window.innerWidth <= 500 ? 65 : 90;
    } catch {
      return 90;
    }
  });

  const [monochromeMode, setMonochromeMode] = useState(false);

  const defaultColor = generateRandomColors();
  const [baseColor, setBaseColor] = useState(defaultColor[0]);
  const [outlineColor, setOutlineColor] = useState(defaultColor[1]);
  const [watchBGColor, setWatchBGColor] = useState(defaultColor[2]);
  const [watchColor1, setWatchColor1] = useState(WATCH_COLORS.c1);
  const [watchColor2, setWatchColor2] = useState(WATCH_COLORS.c2);
  const [watchColor3, setWatchColor3] = useState(WATCH_COLORS.c3);
  const [watchColor4, setWatchColor4] = useState(WATCH_COLORS.c4);

  const watchColor = {
    bg: watchBGColor,
    c1: watchColor1,
    c2: watchColor2,
    c3: watchColor3,
    c4: watchColor4
  };

  const refreshColors = () => {
    const color = generateRandomColors();
    setBaseColor(color[0]);
    setOutlineColor(color[1]);
    setWatchBGColor(color[2]);

    monoWedgeColors(color[0], color[2]);
  };

  const monoWedgeColors = (b: string = baseColor, w: string = watchBGColor) => {
    if (monochromeMode) {
      const pallete = tinycolor.mix(b, w, 10).monochromatic(4);
      const colors = pallete.map((p) => p.toHexString());
      setWatchColor1(colors[1]);
      setWatchColor2(colors[2]);
      setWatchColor3(colors[3]);
      setWatchColor4(colors[0]);
    } else {
      setWatchColor1(WATCH_COLORS.c1);
      setWatchColor2(WATCH_COLORS.c2);
      setWatchColor3(WATCH_COLORS.c3);
      setWatchColor4(WATCH_COLORS.c4);
    }
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
        setWheelSize(window.innerWidth <= 500 ? 65 : 90);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    monoWedgeColors();
  }, [monochromeMode, baseColor]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {props.isOpen && (
        <div
          onClick={(e) => e.target === e.currentTarget && props.onClose()}
          className='z-20 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black backdrop-filter backdrop-blur-xl firefox:bg-opacity-80 bg-opacity-80'>
          <div className='w-full md:w-1/2 xl:w-1/3 max-h-full overflow-y-auto p-4 m-4 rounded-3xl shadow-lg bg-black ring-1 ring-white/[.06]'>
            <div className='flex justify-between text-xs'>
              <button
                className='p-2 bg-white/[.1] text-white rounded-lg sm:rounded-2xl hover:bg-green-400 active:bg-green-200 hover:text-black'
                onClick={refreshColors}>
                <RefreshSVG />
              </button>

              <button
                className={`py-2 px-5 rounded-lg sm:rounded-2xl text-xs sm:text-lg font-bold ${
                  monochromeMode
                    ? 'bg-white hover:bg-white/[.7] text-black'
                    : 'bg-white/[.2] hover:bg-white/[.6] hover:text-black'
                }`}
                onClick={() => setMonochromeMode((b) => !b)}>
                {monochromeMode ? 'Mono' : 'Default'}
              </button>

              <button
                className='p-3 bg-white/[.1] text-white rounded-xl font-bold hover:bg-white hover:text-black'
                onClick={props.onClose}>
                <CloseSVG />
              </button>
            </div>
            <div className='mt-5 p-5 h-48 sm:h-96 md:h-72'>
              <CursorPreview
                base={baseColor}
                outline={outlineColor}
                watch={watchColor}
              />
            </div>
            <div className='mt-3 grid grid-cols-3 gap-10'>
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
                title='Watch Background'
                value={watchBGColor}
                onChange={(c) => setWatchBGColor(c)}>
                <Wheel
                  width={wheelSize}
                  height={wheelSize}
                  color={watchBGColor}
                  onChange={(cr) => {
                    setWatchBGColor(cr.hex);
                  }}
                />
              </ColorWheelCard>

              {!monochromeMode && (
                <>
                  <ColorWheelCard
                    title='Watch Color 1'
                    value={watchColor1}
                    onChange={(c) => setWatchColor1(c)}>
                    <Wheel
                      width={wheelSize}
                      height={wheelSize}
                      color={watchColor1}
                      onChange={(cr) => {
                        setWatchColor1(cr.hex);
                      }}
                    />
                  </ColorWheelCard>

                  <ColorWheelCard
                    title='Watch Color 2'
                    value={watchColor2}
                    onChange={(c) => setWatchColor2(c)}>
                    <Wheel
                      width={wheelSize}
                      height={wheelSize}
                      color={watchColor2}
                      onChange={(cr) => {
                        setWatchColor2(cr.hex);
                      }}
                    />
                  </ColorWheelCard>

                  <ColorWheelCard
                    title='Watch Color 3'
                    value={watchColor3}
                    onChange={(c) => setWatchColor3(c)}>
                    <Wheel
                      width={wheelSize}
                      height={wheelSize}
                      color={watchColor3}
                      onChange={(cr) => {
                        setWatchColor3(cr.hex);
                      }}
                    />
                  </ColorWheelCard>

                  <span />

                  <ColorWheelCard
                    title='Watch Color 4'
                    value={watchColor4}
                    onChange={(c) => setWatchColor4(c)}>
                    <Wheel
                      width={wheelSize}
                      height={wheelSize}
                      color={watchColor4}
                      onChange={(cr) => {
                        setWatchColor4(cr.hex);
                      }}
                    />
                  </ColorWheelCard>

                  <span />
                </>
              )}
            </div>

            <div className='mt-11 flex justify-center'>
              <button
                className='w-36 py-3 bg-green-600 text-white font-bold rounded-2xl text-sm sm:text-md hover:bg-green-500'
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
