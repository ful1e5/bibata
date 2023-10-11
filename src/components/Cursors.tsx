'use client';

import useSWR from 'swr';
import * as Figma from 'figma-api';

import { useEffect, useState } from 'react';

import { Color, CoreImage } from 'bibata-live';

type CursorOnLoad = (images: CoreImage) => void;
type SVG = Figma.Node<keyof Figma.NodeTypes>;
interface Response {
  data: SVG[];
  error: string;
  status: number;
}

interface CursorCardProps {
  svg: SVG;
  color: Color;
  sizes: number[];
  onLoad?: CursorOnLoad;
}

function CursorCard(props: CursorCardProps) {
  const [loading, setLoading] = useState(true);

  const c = JSON.stringify({
    '00ff00': props.color.base,
    '0000ff': props.color.outline,
    ff0000: props.color.watch || props.color.base
  });

  useEffect(() => {
    setLoading(true);
  }, []);

  const url = `/api/svg/${props.svg.id}?color=${c}`;

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
          } transition-opacity duration-500`}>
          <img
            className={'object-none w-full h-full top-0 p-4 absolute '}
            alt={props.svg.name}
            src={`${url}&display`}
            hidden={loading}
            loading='lazy'
            onLoad={() => {
              setLoading(false);
              if (props.onLoad) {
                props.onLoad({ name: props.svg.name, url });
              }
            }}
          />
        </div>
      </div>
      <div className='text-center'>
        <p className='mb-2'>{props.svg.name}</p>
      </div>
    </div>
  );
}

interface CursorsProps {
  type: string;
  color: Color;
  sizes: number[];
  onLoad?: CursorOnLoad;
  onData?: (svgs: SVG[]) => void;
}

export default function Cursors(props: CursorsProps) {
  const fetcher = (url: string) =>
    fetch(url, { next: { revalidate: 60 } })
      .then((res) => res.json())
      .then((json) => json);

  const { data: res, isLoading: isRequesting } = useSWR<Response>(
    `/api/svg?type=${props.type}`,
    fetcher
  );

  if (isRequesting) {
    const cards = Array.from(new Array(12), (_, i) => i + 1);
    return (
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          {cards.map(() => (
            <div className='overflow-hidden rounded-xl bg-white/[0.05] border-white/[.1] border'>
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

  if (props.onData) {
    props.onData(svgs);
  }

  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {svgs.map((e) => (
          <CursorCard
            color={props.color}
            svg={e}
            sizes={props.sizes}
            onLoad={props.onLoad}
          />
        ))}
      </div>
    </div>
  );
}
