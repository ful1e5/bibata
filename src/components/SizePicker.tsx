'use client';

import React, { useState } from 'react';

interface Props {
  list: number[];
  default: number;

  onChange: (v: number) => void; // eslint-disable-line no-unused-vars
}

export const SizePicker: React.FC<Props> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [size, setSize] = useState(props.default);
  const [errorText, setErrorText] = useState('');

  const handleChange = () => {
    if (size > 256) {
      setErrorText('Cursor size should be less than 256 pixels');
    } else if (size < 16) {
      setErrorText('Cursor size should be greater than 16 pixels.');
    } else {
      setErrorText('');
      props.onChange(size);
      setEditMode(false);
    }
  };

  return (
    <>
      <div className='mt-2 flex flex-col justify-center items-center gap-1'>
        <div className='flex justify-center items-center gap-2 relative'>
          <div>
            {editMode ? (
              <input
                autoFocus={true}
                type='number'
                maxLength={3}
                min={16}
                max={256}
                className={`remove-arrow text-lg md:text-xl w-40 py-2 text-center border border-white/[.1] hover:border-white focus:outline-none rounded-full ${
                  errorText ? 'bg-red-300/[.2]' : 'bg-white/[.05] '
                }`}
                value={size}
                placeholder='28'
                onChange={(e) => {
                  const inputValue = Number(e.target.value);
                  setSize(inputValue);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleChange();
                  } else if (e.key === 'Escape') {
                    setSize(props.default);
                    setEditMode(false);
                  }
                }}
              />
            ) : (
              <span
                onClick={() => setEditMode(!editMode)}
                className='text-lg md:text-xl font-bold transition py-2 pl-16 pr-12 text-left bg-white/[.01] border border-white/[.2] hover:border-white text-white rounded-full'>
                {props.default}px
              </span>
            )}

            <div className='absolute inset-y-2 pl-5 flex items-center pointer-events-none text-white/[.8]'>
              <svg
                className='w-4 fill-current'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'>
                <path d='M16 16h-8v-8h8v8zm-10-7.172v-2.828h2.828l-3.414-3.414 2.586-2.586h-8v8l2.586-2.586 3.414 3.414zm2.828 9.172h-2.828v-2.828l-3.414 3.414-2.586-2.586v8h8l-2.586-2.586 3.414-3.414zm9.172-2.828v2.828h-2.828l3.414 3.414-2.586 2.586h8v-8l-2.586 2.586-3.414-3.414zm-2-15.172l2.586 2.586-3.414 3.414h2.828v2.828l3.414-3.414 2.586 2.586v-8h-8z' />
              </svg>
            </div>
          </div>

          {size !== props.default ? (
            <button
              type='submit'
              className='p-3 bg-green-500 hover:bg-green-400 rounded-full'
              onClick={() => handleChange()}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 fill-current'
                viewBox='0 0 24 24'>
                <path d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z' />
              </svg>
            </button>
          ) : (
            <button
              className={`p-3 bg-red-100 hover:bg-white/[.8] rounded-full text-red-800 ${
                editMode ? '' : 'hidden'
              }`}
              onClick={() => setEditMode(!editMode)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-3 fill-current'
                viewBox='0 0 24 24'>
                <path d='M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z' />
              </svg>
            </button>
          )}
        </div>
        {errorText && (
          <p className='text-red-200 text-xs md:text-sm'>{errorText}</p>
        )}

        <div
          className={`w-full md:w-2/3 lg:w-1/2 sm:mx-32 grid grid-cols-7 gap-3 text-[9px] sm:text-sm duration-300 transition ${
            editMode ? 'translate-y-2 opacity-100' : 'scale-0 opacity-0 h-0'
          }`}>
          {props.list.map((t) => {
            const selected = props.default === t;
            return (
              <button
                key={t}
                onClick={() => {
                  setSize(t);
                  handleChange();
                }}
                className={`p-1 py-2 sm:p-3 rounded-full text-center transition ring-1 ring-white/[.2] hover:scale-110 hover:bg-white/[.1] hover:text-white ${
                  selected
                    ? 'bg-green-50 text-green-950 font-black '
                    : 'bg-white/[.03]'
                }`}>
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
