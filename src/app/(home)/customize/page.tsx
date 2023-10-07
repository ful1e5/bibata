'use client';

import { useState } from 'react';

import Cursors from '@components/Cursors';

import { BIBATA_TYPES, PREBUILT_COLORS } from '@root/configs';
import DropdownSelection from '@components/DropdownSelection';
import GroupedButtons from '@components/GroupedButtons';

export default function CustomizePage() {
  const colors = Object.keys(PREBUILT_COLORS);

  const [type, setType] = useState<string>(BIBATA_TYPES[0]);
  const [color, setColor] = useState<string>(colors[0]);

  return (
    <main
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px'
      }}>
      <div className='flex items-center justify-center'>
        <GroupedButtons
          list={BIBATA_TYPES}
          value={type}
          onClick={(v) => setType(v)}
        />
      </div>

      <div className='h-20 flex items-center justify-center'>
        <DropdownSelection
          value={color}
          list={colors}
          onChange={(e) => setColor(e.target.value)}
        />

        <button
          onClick={() => console.log('Downloading')}
          className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl inline-flex items-center'>
          <svg
            className='fill-current w-4 h-4 mr-2'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'>
            <path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z' />
          </svg>
          <span>Download</span>
        </button>
      </div>

      <Cursors type={type} color={PREBUILT_COLORS[color]} />
    </main>
  );
}
