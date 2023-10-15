'use client';

import { useEffect, useState } from 'react';

import { Color, CoreImage } from 'bibata-live';

import { Cursors } from '@components/Cursors';
import { ColorPicker } from '@components/ColorPicker';
import { DownloadButton } from '@components/DownloadButton';
import {
  GroupedButtons,
  SmallGroupedButtons
} from '@components/GroupedButtons';

import { CoreApi } from '@utils/core';
import { TYPES, PREBUILT_COLORS, SIZES } from '@root/configs';

export default function CustomizePage() {
  const core = new CoreApi();

  const [type, setType] = useState<string>(TYPES[0]);
  const [color, setColor] = useState<Color>(PREBUILT_COLORS['Amber']);
  const [cursorSize, setCursorSize] = useState<number>(SIZES[0]);

  const [images, setImages] = useState<Set<CoreImage>>(new Set());
  const [imagesCount, setImagesCount] = useState<number>(0);

  const destroyBuildSession = async () => {
    await core.destroySession();
  };

  useEffect(() => {
    destroyBuildSession();
  }, [cursorSize]);

  useEffect(() => {
    setImages(new Set());
    setImagesCount(0);
    destroyBuildSession();
  }, [type, color]);

  return (
    <main
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px'
      }}>
      <div className='flex items-center justify-center'>
        <GroupedButtons list={TYPES} value={type} onClick={(v) => setType(v)} />
      </div>

      <div className='mt-10 flex items-center justify-center '>
        <SmallGroupedButtons
          list={SIZES}
          values={cursorSize}
          onClick={(s) => setCursorSize(s)}
        />
      </div>

      <div className='mt-10 flex items-center justify-center '>
        <ColorPicker colors={PREBUILT_COLORS} onClick={(c) => setColor(c)} />
      </div>

      <div className='h-24 flex items-center justify-center'>
        <DownloadButton
          images={images}
          size={cursorSize}
          disabled={imagesCount === 0 || imagesCount !== images.size}
        />
      </div>

      <Cursors
        type={type}
        color={color}
        onLoad={(i) => setImages(new Set(images.add(i)))}
        onData={(svgs) => setImagesCount(svgs.length)}
      />
    </main>
  );
}
