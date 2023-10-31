'use client';

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

import { TYPES, PREBUILT_COLORS, SIZES } from '@root/configs';
import { useLocalStorage as useStorage } from '@hooks/useLocalStorage';

import { TypePicker } from '@components/TypePicker';
import { SizePicker } from '@components/SizePicker';
import { ColorPicker } from '@components/ColorPicker';
import { DownloadButton } from '@components/DownloadButton';
import { Cursors } from '@components/Cursors';

<<<<<<< HEAD
import { TYPES, PREBUILT_COLORS, SIZES } from '@root/configs';
=======
import { CoreApi } from '@utils/core';
import { genAccessToken } from '@utils/auth/token';
>>>>>>> dev-1
import { getDownloadCounts } from '@utils/sponsor/get-count';

import { Image } from 'bibata-live/core-api/types';
<<<<<<< HEAD
import { Color } from 'bibata-live/app';
=======
>>>>>>> dev-1
import { DownloadCounts } from 'bibata-live/misc';

export default function StudioPage() {
  const api = new CoreApi();

  const [type, setType] = useStorage<string>('type', TYPES[0]);
  const [cursorSize, setCursorSize] = useStorage('cursorSize', SIZES[0]);

  const [colorName, setColorName] = useStorage('colorName', 'Amber');
  const [color, setColor] = useStorage('color', PREBUILT_COLORS[colorName]);

  const [animationDelay, setAnimationDelay] = useState<number>(100);

  const [images, setImages] = useState<Image[]>([]);
  const [imagesCount, setImagesCount] = useState(0);

<<<<<<< HEAD
  const [token, setToken] = useState<string>();
=======
  const [token, setToken] = useState<string>(genAccessToken());
>>>>>>> dev-1
  const [counts, setCounts] = useState<DownloadCounts | null>(null);

  const resetBuildSession = () => {
    setImages([]);
    setImagesCount(0);
<<<<<<< HEAD
    getSession().then((session) => setToken(session?.accessToken));
    getDownloadCounts(token).then((c) => setCounts(c));
=======
    getSession().then((session) =>
      session?.accessToken
        ? setToken(session.accessToken)
        : setToken(genAccessToken())
    );
>>>>>>> dev-1
  };

  useEffect(() => {
    resetBuildSession();
    getDownloadCounts(token).then((c) => setCounts(c));
  }, []);

  useEffect(() => {
    getDownloadCounts(token).then((c) => setCounts(c));
    api.refreshSession(token);
  }, [token]);

  return (
    <main className='container m-auto p-7'>
      <TypePicker
        list={TYPES}
        value={type}
        onClick={(v) => {
          setType(v);
          resetBuildSession();
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
            setColorName(n);
            setColor(c);
            resetBuildSession();
          }}
        />
      </div>

      <div className='my-10'>
        <DownloadButton
          api={api}
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
