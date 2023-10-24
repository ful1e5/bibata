'use client';

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

import { Cursors } from '@components/Cursors';
import { ColorPicker } from '@components/ColorPicker';
import { DownloadButton } from '@components/DownloadButton';
import {
  GroupedButtons,
  SmallGroupedButtons
} from '@components/GroupedButtons';

import { TYPES, PREBUILT_COLORS, SIZES } from '@root/configs';
import { getSponsorshipGoals } from '@utils/sponsor/get-count';

import { Color } from 'bibata-live';
import { Goals } from 'bibata-live/misc';
import { Image } from 'bibata-live/core';
import { Session } from 'next-auth';
import { useLocalStorage } from '@hooks/useLocalStorage';

export default function StudioPage() {
  const [type, setType] = useLocalStorage<string>('type', TYPES[0]);
  const [cursorSize, setCursorSize] = useLocalStorage<number>(
    'cursorSize',
    SIZES[0]
  );

  const [colorName, setColorName] = useLocalStorage<string>(
    'colorName',
    'Amber'
  );
  const [color, setColor] = useLocalStorage<Color>(
    'color',
    PREBUILT_COLORS[colorName]
  );

  const [animationDelay, setAnimationDelay] = useState<number>(100);

  const [images, setImages] = useState<Image[]>([]);
  const [imagesCount, setImagesCount] = useState<number>(0);

  const [session, setSession] = useState<Session | null>(null);
  const [goals, setGoals] = useState<Goals | null>(null);

  useEffect(() => {
    getSession().then((auth) => setSession(auth));
    getSponsorshipGoals().then((goals) => setGoals(goals));
  }, []);

  const resetImages = () => {
    setImages([]);
    setImagesCount(0);
  };

  return (
    <main className='container m-auto p-7'>
      <GroupedButtons
        list={TYPES}
        value={type}
        onClick={(v) => {
          setType(v);
          resetImages();
        }}
      />

      <div className='mt-10'>
        <SmallGroupedButtons
          list={SIZES}
          values={cursorSize}
          onClick={(s) => setCursorSize(s)}
        />
      </div>

      <div className='mt-10'>
        <ColorPicker
          colorName={colorName}
          colors={PREBUILT_COLORS}
          onClick={(n, c) => {
            setColorName(n);
            setColor(c);
            resetImages();
          }}
        />
      </div>

      <div className='my-10'>
        <DownloadButton
          token={session?.accessToken}
          totalCount={goals?.monthlySponsorshipInCents! * 10}
          delay={animationDelay}
          images={images}
          size={cursorSize}
          disabled={
            !goals || imagesCount === 0 || imagesCount !== images.length
          }
        />
      </div>

      <Cursors
        type={type}
        color={color}
        delay={animationDelay}
        onData={(svgs) => setImagesCount(svgs.length)}
        onLoad={(i) => {
          const l = images;
          const isAvailable = l.some((e) => e.name === i.name);
          if (!isAvailable) {
            l.push(i);
            setImages([...l]);
          }
        }}
      />
    </main>
  );
}