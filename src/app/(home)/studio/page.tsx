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
import { getDownloadCounts } from '@utils/sponsor/get-count';

import { useLocalStorage } from '@hooks/useLocalStorage';
import { Image } from 'bibata-live/core-api/types';
import { Color } from 'bibata-live/app';
import { DownloadCounts } from 'bibata-live/misc';

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

  const [token, setToken] = useState<string>();
  const [counts, setCounts] = useState<DownloadCounts | null>(null);

  const resetBuildSession = () => {
    setImages([]);
    setImagesCount(0);
    getSession().then((session) => setToken(session?.accessToken));
    getDownloadCounts(token).then((c) => setCounts(c));
  };

  useEffect(() => {
    resetBuildSession();
  }, []);

  return (
    <main className='container m-auto p-7'>
      <GroupedButtons
        list={TYPES}
        value={type}
        onClick={(v) => {
          setType(v);
          resetBuildSession();
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
            resetBuildSession();
          }}
        />
      </div>

      <div className='my-10'>
        <DownloadButton
          token={token}
          disabled={
            !counts || imagesCount === 0 || imagesCount !== images.length
          }
          counts={counts}
          config={{
            size: cursorSize,
            delay: animationDelay,
            color,
            images,
            type
          }}
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
