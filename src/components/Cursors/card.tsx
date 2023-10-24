'use client';

import { useEffect, useState } from 'react';

import { Color, SVG } from 'bibata-live';
import { Image } from 'bibata-live/core';

type CursorCardProps = {
  svg: SVG;
  color: Color;
  delay: number;
  onLoad?: (image: Image) => void;
};

export const CursorCard: React.FC<CursorCardProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [svg, setSvg] = useState<string>('');
  const [frames, setFrames] = useState<string[]>([]);
  const [frameIndex, setFrameIndex] = useState<number>(0);

  const c = JSON.stringify({
    '00ff00': props.color.base,
    '0000ff': props.color.outline,
    ff0000: props.color.watch || props.color.base
  });

  const fetchSvgs = async () => {
    const l: string[] = [];
    for (const id of props.svg.ids) {
      const url = `/api/svg/${id}?color=${c}`;
      const response = await fetch(`${url}&display`, {
        next: { revalidate: 360 }
      });

      const frame = await response.text();
      l.push(frame);
    }
    return l;
  };

  useEffect(() => {
    setLoading(true);
    const fetchSvg = async () => {
      try {
        const list = await fetchSvgs();
        setFrames([...list]);
        setSvg(list[0]);
      } catch (error) {
        console.error('Error fetching SVG:', error);
      }
      setLoading(false);
    };

    fetchSvg();
  }, [props.color, props.svg]);

  // TODO: Fix Buggy Animation, Browser keep reloading when Any link is clicked
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (props.svg.isAnimated && loading === false) {
  //       if (frameIndex < frames.length - 1) {
  //         setFrameIndex(frameIndex + 1);
  //       } else {
  //         setFrameIndex(0);
  //       }
  //       setSvg(frames[frameIndex]);
  //     }
  //   }, props.delay);
  //
  //   return () => clearInterval(intervalId);
  // }, [loading, frameIndex]);

  useEffect(() => {
    if (props.onLoad && !loading && frames) {
      const codes: string[] = [];

      frames.forEach((f) =>
        codes.push(
          f.replace('width="100%" height="100%"', 'width="256" height="256"')
        )
      );

      props.onLoad({ name: props.svg.name, frames: codes });
    }
  }, [loading, frames]);

  return (
    <div className='mb-4 overflow-hidden rounded-3xl bg-white/[0.05] border-white/[.1] border'>
      <div className='w-full h-40 mb-4 relative'>
        <div
          className={`w-full h-full bg-gray-300/[.3] ${
            loading ? 'animate-pulse bg-white/[.2]' : 'bg-white/[.05]'
          }`}></div>
        <div
          className={`${
            !loading ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500 flex justify-center`}>
          <div
            className='object-none h-full p-4 top-0 absolute'
            hidden={loading}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      </div>
      <div className='text-center'>
        <p className='mb-2'>{props.svg.name}</p>
      </div>
    </div>
  );
};
