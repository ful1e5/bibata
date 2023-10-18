'use client';

import useSWR from 'swr';

import { useEffect, useState } from 'react';

import { Color, CoreImage, SVG } from 'bibata-live';

type CursorOnLoad = (image: CoreImage) => void;

type CursorCardProps = {
  svg: SVG;
  color: Color;
  onLoad?: CursorOnLoad;
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (props.svg.isAnimated && loading === false) {
        if (frameIndex < frames.length - 1) {
          setFrameIndex(frameIndex + 1);
        } else {
          setFrameIndex(0);
        }
        setSvg(frames[frameIndex]);
      }
    }, 200);

    return () => clearInterval(intervalId);
  }, [loading, frameIndex]);

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
    <div className='mb-4 overflow-hidden rounded-xl bg-white/[0.05] border-white/[.1] border'>
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

type CursorsProps = {
  type: string;
  color: Color;
  onLoad?: CursorOnLoad;
  onData?: (svgs: SVG[]) => void;
};

export const Cursors: React.FC<CursorsProps> = (props) => {
  const fetcher = (url: string) =>
    fetch(url, { next: { revalidate: 60 } })
      .then((res) => res.json())
      .then((json) => json);

  const { data: res, isLoading: isRequesting } = useSWR<{
    data: SVG[];
    error: string;
    status: number;
  }>(`/api/svg?type=${props.type}`, fetcher);

  // useEffect(() => {
  //   if (props.onData && res?.data) {
  //     props.onData(res?.data);
  //   }
  // }, [res]);

  if (isRequesting) {
    const cards = Array.from(new Array(12), (_, i) => i + 1);
    return (
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          {cards.map((key) => (
            <div
              key={key}
              className='overflow-hidden rounded-xl bg-white/[0.05] border-white/[.1] border'>
              <div className={'w-full h-40 animate-pulse bg-white/[.2]'}></div>
              <div className='flex animate-pulse bg-white/[.1] h-12'></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!res) return <p>Fetch Timeout</p>;

  if (res.error) {
    return (
      <p>
        Error({res.status}): {res.error}
      </p>
    );
  }

  const svgs = res.data as SVG[];

  if (props.onData && res?.data) {
    props.onData(svgs);
  }
  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {svgs.map((e) => (
          <CursorCard
            key={e.name}
            color={props.color}
            svg={e}
            onLoad={props.onLoad}
          />
        ))}
      </div>
    </div>
  );
};
