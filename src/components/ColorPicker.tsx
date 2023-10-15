'use client';

import { Color, Colors } from 'bibata-live';

type ColorPickerProps = {
  colors: Colors;
  onClick?: (color: Color) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  return (
    <div className='w-1/3 grid grid-cols-3'>
      {Object.entries(props.colors).map(([name, color], i) => {
        return (
          <button key={i} onClick={() => props.onClick && props.onClick(color)}>
            <div className='container flex flex-col justify-center items-center'>
              <div className='px-6 py-2 rounded-3xl ring-1 ring-white/[.2] focus:ring-white focus:outline-none'>
                <div
                  className='mt-2 overflow-hidden w-16 h-16 rounded-full font-bold flex justify-center items-center text-center shadow-xl'
                  style={{ backgroundColor: `#${color.base}` }}></div>
                <div className='mt-2 text-center'>{name}</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
