'use client';

import useSWR from 'swr';
import { useEffect, useState } from 'react';
import * as Figma from 'figma-api';

import { Color } from '@root/types';

type SVG = Figma.Node<keyof Figma.NodeTypes>;

interface CursorImageProp {
  svg: SVG;
  color: Color;
}

function CursorImage({ svg, color }: CursorImageProp) {
  const [loading, setLoading] = useState(true);

  const c = JSON.stringify({
    '00ff00': color.base,
    '0000ff': color.outline,
    ff0000: color.watch || color.base
  });

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
        maxWidth: '150px'
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '0.5px solid rgba(255, 0, 0, 0.8)',
          minHeight: '150px'
        }}>
        {loading && 'Loading...'}
        <img
          alt={svg.name}
          src={`/api/svg/${svg.id}?display&color=${c}`}
          style={{
            overflow: 'hidden'
          }}
          onLoad={() => setLoading(false)}
          hidden={loading}
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
