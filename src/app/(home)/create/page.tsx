'use client';

import { useState } from 'react';

import UserProfile from '@components/UserProfile';
import Cursors from '@components/Cursors';

import { BIBATA_TYPES, PREBUILT_COLORS } from '@root/configs';

export default function CreatePage() {
  const colors = Object.keys(PREBUILT_COLORS);

  const [type, setType] = useState<string>(BIBATA_TYPES[0]);
  const [color, setColor] = useState<string>(colors[0]);

  return (
    <>
      <h1>Bibata Live</h1>
      <UserProfile />

      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '20px'
        }}>
        <form
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {BIBATA_TYPES.map((t) => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
          </select>

          <select value={color} onChange={(e) => setColor(e.target.value)}>
            {colors.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
        </form>

        <Cursors type={type} />
      </div>
    </>
  );
}
