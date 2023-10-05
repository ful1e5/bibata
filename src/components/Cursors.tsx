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

function CursorImage({ svg, color }: CursorImageProp) {
  const [loading, setLoading] = useState(true);

  const conSize = 150;
  const imgSize = (150 / 90) * 100;
  const c = JSON.stringify({
    '00ff00': color.base,
    '0000ff': color.outline,
    ff0000: color.watch || color.base
  });
  const url = `/api/svg/${svg.id}?color=${c}`;

  useEffect(() => {
    setLoading(true);
  }, [svg.id, color]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        margin: '10px',
        padding: '10px',
        border: '1px solid rgba(255, 0, 0, 0.8)',
        width: '100%',
        maxWidth: `${conSize}px`
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '0.5px solid rgba(255, 0, 0, 0.8)',
          minHeight: `${conSize}px`
        }}>
        {loading && 'Loading...'}
        <Image
          alt={svg.name}
          src={url}
          hidden={loading}
          width={loading ? 0 : imgSize}
          height={loading ? 0 : imgSize}
          loader={({ src }) => src}
          loading='lazy'
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <div
        style={{
          margin: '10px 10px 0px 10px',
          border: '0.5px solid rgba(255, 0, 0, 0.8)'
        }}>
        {svg.name}
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

export default function Cursors({ type, color }: CursorsProps) {
  const fetcher = (url: string) =>
    fetch(url, { next: { revalidate: 60 } })
      .then((res) => res.json())
      .then((json) => json);

  const { data: res, isLoading } = useSWR<Response>(
    `/api/svg?type=${type}`,
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
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {svgs.map((e) => (
        <CursorImage key={e.id} svg={e} color={color} />
      ))}
    </div>
  );
}
