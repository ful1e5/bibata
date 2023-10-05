'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import UserProfile from '@components/UserProfile';
import Cursors from '@components/Cursors';

import { BIBATA_TYPES, PREBUILT_COLORS } from '@root/configs';
import { useSponsors } from '@hooks/useSponsors';

export default function CreatePage() {
  const author = 'ful1e5';
  const { data: session, status } = useSession();
  const [isSponsor, setIsSponsor] = useState(false);

  const {
    data: sponsors,
    error: _e,
    isLoading: loadingSponsors
  } = useSponsors(author);

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user?.login === author) {
        setIsSponsor(true);
      } else if (!loadingSponsors && sponsors && session.user?.login) {
        const unames = sponsors.map((s) => s.login);
        setIsSponsor(
          unames.includes(session.user?.login) || unames.includes(author)
        );
      }
    }
  }, [session, loadingSponsors]);

  const colors = Object.keys(PREBUILT_COLORS);

  const [type, setType] = useState<string>(BIBATA_TYPES[0]);
  const [color, setColor] = useState<string>(colors[0]);

  return (
    <>
      <h1>
        Bibata Live
        {isSponsor && ' (Pro)'}
      </h1>
      <UserProfile />

      <main
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '20px'
        }}>
        <div
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

          <button onClick={() => console.log('Downloading')}>Download</button>
        </div>

        <Cursors type={type} color={PREBUILT_COLORS[color]} />
      </main>
    </>
  );
}
