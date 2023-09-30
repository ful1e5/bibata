'use client';

import { useState } from 'react';

import UserProfile from '@components/UserProfile';
import SVGs from '@components/SVGs';

import { BIBATA_TYPES } from '@utils/constants';

export default function CreatePage() {
  const [type, setType] = useState('Modern');

  return (
    <div>
      <header>
        <h1>Bibata Live</h1>
        <UserProfile />
      </header>

      <form>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {BIBATA_TYPES.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </form>
      <SVGs type={type} />
    </div>
  );
}
