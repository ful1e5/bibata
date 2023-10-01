'use client';

import useSWR from 'swr';

import { SVG } from '@utils/fetch-svgs';
import { useEffect, useState } from 'react';

function useSVG({ type }: { type: string }) {
  interface Response {
    data: SVG[];
    error: string;
    status: number;
  }

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((json) => json);

  return useSWR<Response>(`/api/svg?type=${type}`, fetcher);
}

function CursorImage({ svg }: { svg: SVG }) {
  const [svgCode, setSvgCode] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(svg.url || '')
      .then((res) => res.text())
      .then((t) => {
        const node = t.replace(
          'width="256" height="256"',
          `preserveAspectRatio="xMaxYMid meet" width="100%" height="100%"`
        );
        setSvgCode(node);
      })
      .then(() => setLoading(false));
  }, [svg.url]);

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
        <div
          style={{
            animation: 'fadeIn 2s',
            overflow: 'hidden'
          }}
          hidden={loading}
          dangerouslySetInnerHTML={{ __html: svgCode }}
        />
      </div>
      <div
        style={{
          margin: '10px 10px 0px 10px',
          border: '0.5px solid rgba(255, 0, 0, 0.8)'
        }}>
        {svg.node.name}
      </div>
    </div>
  );
}

export default function Cursors({ type }: { type: string }) {
  const { data: res, isLoading } = useSVG({ type });

  if (isLoading) return <div>Loading SVG files...</div>;
  if (!res) return <p>Fetch Timeout</p>;

  if (res.error) {
    return (
      <p>
        Error({res.status}): {res.error}
      </p>
    );
  }

  const data = res.data as SVG[];

  const svgs = data.sort((a, b) =>
    a.node.name.toLowerCase() < b.node.name.toLowerCase() ? -1 : 1
  );

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {svgs.map((e) => (
        <CursorImage key={e.node.id} svg={e} />
      ))}
    </div>
  );
}
