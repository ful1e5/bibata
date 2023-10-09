'use client';

import useSWR from 'swr';
import * as Figma from 'figma-api';

import { useEffect, useState } from 'react';
import Image from 'next/legacy/image';

import { Color } from 'bibata-live';

type SVG = Figma.Node<keyof Figma.NodeTypes>;

interface CursorImageProp {
  svg: SVG;
  color: Color;
}

function CursorImage(props: CursorImageProp) {
  const [loading, setLoading] = useState(true);

  const c = JSON.stringify({
    '00ff00': props.color.base,
    '0000ff': props.color.outline,
    ff0000: props.color.watch || props.color.base
  });
  const url = `/api/svg/${props.svg.id}?color=${c}&display`;
  useEffect(() => {
    setLoading(true);
  }, [props.svg.id, props.color]);

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
          } transition-opacity duration-500 z-2`}>
          <img
            className={'object-none w-full h-full top-0 absolute '}
            alt={props.svg.name}
            src={url}
            hidden={loading}
            loading='lazy'
            onLoad={() => {
              setLoading(false);
              console.log(`loading Complete ${props.svg.name}`);
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
}

interface Response {
  data: SVG[];
  error: string;
  status: number;
}

export default function Cursors(props: CursorsProps) {
  const fetcher = (url: string) =>
    fetch(url, { next: { revalidate: 60 } })
      .then((res) => res.json())
      .then((json) => json);

  const { data: res, isLoading } = useSWR<Response>(
    `/api/svg?type=${props.type}`,
    fetcher
  );

  if (isLoading) return <div>Loading SVG files...</div>;
  if (!res) return <p>Fetch Timeout</p>;

  if (res.error) {
    return (
      <p>
        Error({res.status}): {res.error}
      </p>
    );
  }

  const svgs = res.data as SVG[];

  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {svgs.map((e) => (
          <CursorImage key={e.id} svg={e} color={props.color} />
        ))}
      </div>
    </div>
  );
}
