'use client';

import { useEffect, useState } from 'react';

import Cursors from '@components/Cursors';

import { TYPES, PREBUILT_COLORS, SIZES } from '@root/configs';
import DropdownSelection from '@components/DropdownSelection';
import { DownloadButton } from '@components/DownloadButton';
import {
  GroupedButtons,
  SmallGroupedButtons
} from '@components/GroupedButtons';
import { CoreApi } from '@utils/core';
import { CoreImage } from 'bibata-live';

export default function CustomizePage() {
  const core = new CoreApi();
  const colors = Object.keys(PREBUILT_COLORS);

  const [type, setType] = useState<string>(TYPES[0]);
  const [color, setColor] = useState<string>(colors[0]);
  const [cursorSizes, setCursorSizes] = useState<number[]>([SIZES[0]]);

  const [images, setImages] = useState<Set<CoreImage>>(new Set());
  const [imagesCount, setImagesCount] = useState<number>(0);

  useEffect(() => {
    const destroyBuildSession = async () => {
      await core.destroySession();
    };

    destroyBuildSession();
  }, []);

  useEffect(() => {
    setImages(new Set());
    setImagesCount(0);
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

      <div className='h-44 sm:h-52 flex items-center justify-center '>
        <SmallGroupedButtons
          list={SIZES}
          values={cursorSizes}
          onClick={(s) => setCursorSizes([...s])}
        />
      </div>

      <div className='h-24 flex items-center justify-center'>
        <DropdownSelection
          value={color}
          list={colors}
          onChange={(e) => setColor(e.target.value)}
        />

        <DownloadButton
          images={images}
          sizes={cursorSizes}
          disabled={imagesCount === 0 || imagesCount !== images.size}
        />
      </div>

      <Cursors
        type={type}
        sizes={cursorSizes}
        color={PREBUILT_COLORS[color]}
        onLoad={(i) => setImages(new Set(images.add(i)))}
        onData={(svgs) => setImagesCount(svgs.length)}
      />
    </main>
  );
}
