'use client';

import useSWR from 'swr';

import { SVG } from '@utils/fetch-svgs';

function SVGElement({ svg }: { svg: SVG }) {
  return (
    <>
      <img id={svg.node.id} src={svg.url || ''} />
    </>
  );
}

interface Response {
  data: SVG[];
  error: string;
  status: number;
}

export default function SVGs({ type }: { type: string }) {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((json) => json);

  const { data: res, isLoading } = useSWR<Response>(
    `/api/svg?type=${type}`,
    fetcher
  );

  if (isLoading) return <div>Loading SVG files...</div>;
  if (!res) return <p>No SVG data</p>;

  return res.error ? (
    <p>
      Error({res.status}): {res.error}
    </p>
  ) : (
    <>
      {res.data.map((e) => (
        <SVGElement svg={e} />
      ))}
    </>
  );
}
