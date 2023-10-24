'use client';

import useSWR from 'swr';

import { useEffect } from 'react';

import { Color, SVG } from 'bibata-live';
import { Image } from 'bibata-live/core';

import { CursorCard as Card } from './card';
import { CursorsError as Error } from './error';
import { CursorsLoading as Loading } from './loading';
import { CursorsTimeOut as Timeout } from './timeout';

type CursorsProps = {
  type: string;
  color: Color;
  delay: number;
  onLoad?: (image: Image) => void;
  onData?: (svgs: SVG[]) => void;
};

export const Cursors: React.FC<CursorsProps> = (props) => {
  const fetcher = (url: string) =>
    fetch(url, { next: { revalidate: 360 } })
      .then((res) => res.json())
      .then((json) => json);

  const { data: res, isLoading: isRequesting } = useSWR<{
    data: SVG[];
    error: string;
    status: number;
  }>(`/api/svg?type=${props.type}`, fetcher);

  useEffect(() => {
    if (props.onData && res?.data) {
      props.onData(res.data);
    }
  }, [props.onData]);

  if (isRequesting) return <Loading />;

  if (!res) return <Timeout />;

  if (res.error) return <Error status={res.status} error={res.error} />;

  const svgs = res.data as SVG[];

  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {svgs.map((e) => (
          <Card
            key={e.name}
            delay={props.delay}
            color={props.color}
            svg={e}
            onLoad={props.onLoad}
          />
        ))}
      </div>
    </div>
  );
};
