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

import { genAccessToken } from '@utils/auth/token';

import { Image } from 'bibata/core-api/types';

export default function StudioPage() {
  const [type, setType] = useStorage<string>('type', TYPES[0]);
  const [cursorSize, setCursorSize] = useStorage('cursorSize', SIZES[0]);

  const [colorName, setColorName] = useStorage('colorName', 'Amber');
  const [color, setColor] = useStorage('color', PREBUILT_COLORS[colorName]);

  // eslint-disable-next-line no-unused-vars
  const [animationDelay, setAnimationDelay] = useState<number>(15);

  const [images, setImages] = useState<Image[]>([]);
  const [imagesCount, setImagesCount] = useState(0);

  const { data: session, status, update } = useSession();
  const [token, setToken] = useState(genAccessToken());

  const resetImages = () => {
    setImages([]);
    setImagesCount(0);
  };

  useEffect(() => {
    if (status !== 'loading') {
      if (session?.accessToken) {
        setToken(session.accessToken);
      } else {
        setToken(genAccessToken());
      }
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
        }}
      />

      <div className='mt-10'>
        <SizePicker
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
            resetImages();
            setColorName(n);
            setColor(c);
          }}
        />
      </div>

      <div className='my-10'>
        <DownloadButton
          token={token}
          disabled={
            imagesCount === 0 ||
            images.length === 0 ||
            imagesCount !== images.length
          }
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
