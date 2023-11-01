'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { TYPES, PREBUILT_COLORS, SIZES } from '@root/configs';
import { useLocalStorage as useStorage } from '@hooks/useLocalStorage';

import { TypePicker } from '@components/TypePicker';
import { SizePicker } from '@components/SizePicker';
import { ColorPicker } from '@components/ColorPicker';
import { DownloadButton } from '@components/DownloadButton';
import { Cursors } from '@components/Cursors';

import { CoreApi } from '@utils/core';
import { genAccessToken } from '@utils/auth/token';
import { getDownloadCounts } from '@utils/sponsor/get-count';

import { Image } from 'bibata-live/core-api/types';
import { DownloadCounts } from 'bibata-live/misc';

const api = new CoreApi();

export default function StudioPage() {
  const [type, setType] = useStorage<string>('type', TYPES[0]);
  const [cursorSize, setCursorSize] = useStorage('cursorSize', SIZES[0]);

  const [colorName, setColorName] = useStorage('colorName', 'Amber');
  const [color, setColor] = useStorage('color', PREBUILT_COLORS[colorName]);

  const [animationDelay, setAnimationDelay] = useState<number>(100);

  const [images, setImages] = useState<Image[]>([]);
  const [imagesCount, setImagesCount] = useState(0);

  const { data: session, status, update } = useSession();
  const [token, setToken] = useState(genAccessToken());
  const [counts, setCounts] = useState<DownloadCounts | null>(null);

  const resetImages = () => {
    setImages([]);
    setImagesCount(0);
  };

  const refreshToken = () => {
    if (session?.accessToken) {
      setToken(session.accessToken);
    } else {
      setToken(genAccessToken());
    }
    api.refreshSession(token);
  };

  useEffect(() => {
    getDownloadCounts(token).then((c) => setCounts(c));
    refreshToken();
    if (status !== 'loading') {
      api.refreshSession(token);
    }
  }, [status, update]);

  return (
    <main className='container m-auto p-7'>
      <TypePicker
        list={TYPES}
        value={type}
        onClick={(v) => {
          resetImages();
          setType(v);
          refreshToken();
        }}
      />

      <div className='mt-10'>
        <SizePicker
          list={SIZES}
          values={cursorSize}
          onClick={(s) => {
            setCursorSize(s);
            api.refreshSession(token);
          }}
        />
      </div>

      <div className='mt-10'>
        <ColorPicker
          colorName={colorName}
          colors={PREBUILT_COLORS}
          onClick={(n, c) => {
            resetImages();
            setColorName(n);
            setColor(c);
            refreshToken();
          }}
        />
      </div>

      <div className='my-10'>
        <DownloadButton
          api={api}
          disabled={
            !counts ||
            imagesCount === 0 ||
            images.length === 0 ||
            imagesCount !== images.length
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
