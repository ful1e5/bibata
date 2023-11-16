'use client';

import React, { useEffect } from 'react';
import useSWR from 'swr';

import { CursorCard as Card } from './card';
import { CursorsError as Error } from './error';
import { CursorsLoading as Loading } from './loading';
import { CursorsTimeOut as Timeout } from './timeout';

import { Color, SVG } from 'bibata/app';
import { Image } from 'bibata/core-api/types';

type Response = {
  data: SVG[];
  error: string;
};

type Props = {
  type: string;
  color: Color;
  delay: number;

  onLoad?: (image: Image) => void; // eslint-disable-line no-unused-vars
  onData?: (svgs: SVG[]) => void; // eslint-disable-line no-unused-vars
};

export const Cursors: React.FC<Props> = (props) => {
  const fetcher = async (url: string) => {
    const res = await fetch(url, { next: { revalidate: 360 } });
    return (await res.json()) as Response;
  };

  const { data: res, isLoading } = useSWR(
    `/api/svg?type=${props.type}`,
    fetcher
  );

  useEffect(() => {
    if (!isLoading && res?.data && props.onData) {
      props.onData(res.data);
    }
  }, [isLoading, props, res]);

  if (isLoading) return <Loading />;

  if (!res) return <Timeout />;

  if (res.error) return <Error message={res.error} />;

  const svgs = res.data as SVG[];

  return (
    <div className='container sm:px-4'>
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4'>
        {svgs.map((e) => (
          <Card
            key={e.id}
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
