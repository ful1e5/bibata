'use client';

import { useEffect, useState } from 'react';

import { Color } from 'bibata-live';
import { Image } from 'bibata-live/core';

import { Cursors } from '@components/Cursors';
import { ColorPicker } from '@components/ColorPicker';
import { DownloadButton } from '@components/DownloadButton';
import {
  GroupedButtons,
  SmallGroupedButtons
} from '@components/GroupedButtons';

import { CoreApi } from '@utils/core';
import { TYPES, PREBUILT_COLORS, SIZES } from '@root/configs';
import { useSession } from 'next-auth/react';

export default function StudioPage() {
  const { data: session, status, update } = useSession();
  const core = new CoreApi();

  const [token, setToken] = useState<string>();

  const [type, setType] = useState<string>(TYPES[0]);
  const [color, setColor] = useState<Color>(PREBUILT_COLORS['Amber']);
  const [cursorSize, setCursorSize] = useState<number>(SIZES[0]);
  const [animationDelay, setAnimationDelay] = useState<number>(100);

  const [images, setImages] = useState<Image[]>([]);
  const [imagesCount, setImagesCount] = useState<number>(0);

  const refreshToken = async () => {
    const data = await core.getSession(session?.accessToken);
    setToken(data.token);
  };

  useEffect(() => {
    refreshToken();
  }, [status, update]);

  const resetImages = () => {
    setImages([]);
    setImagesCount(0);
  };

  return (
    <main className='container m-auto p-7'>
      <div className='flex items-center justify-center'>
        <GroupedButtons
          list={TYPES}
          value={type}
          onClick={async (v) => {
            setType(v);
            resetImages();
            await refreshToken();
          }}
        />
      </div>

      <div className='mt-10 flex items-center justify-center '>
        <SmallGroupedButtons
          list={SIZES}
          values={cursorSize}
          onClick={async (s) => {
            setCursorSize(s);
            await refreshToken();
          }}
        />
      </div>

      <div className='mt-10 flex items-center justify-center '>
        <ColorPicker
          colors={PREBUILT_COLORS}
          onClick={async (c) => {
            setColor(c);
            resetImages();
            await refreshToken();
          }}
        />
      </div>

      <div className='h-24 flex items-center justify-center'>
        <DownloadButton
          delay={animationDelay}
          images={images}
          size={cursorSize}
          disabled={
            !token || imagesCount === 0 || imagesCount !== images.length
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
