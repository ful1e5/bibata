'use client';

import React, { memo, useEffect } from 'react';
import useSWR from 'swr';

import { CursorCard as Card } from './card';
import { CursorsError as Error } from './error';
import { CursorsLoading as Loading } from './loading';
import { CursorsTimeOut as Timeout } from './timeout';

import { Color, SVG, Image } from 'bibata/app';

type Response = {
  data: SVG[];
  error: string;
  stack: string;
};

type Props = {
  type: string;
  version: string;
  color: Color;

  onLoad?: (image: Image, loading: boolean) => void; // eslint-disable-line no-unused-vars
  onData?: (svgs: SVG[]) => void; // eslint-disable-line no-unused-vars
};

const Cursors: React.FC<Props> = memo((props) => {
  const fetcher = async (url: string) => {
    const res = await fetch(url, { next: { revalidate: 360 } });
    if (res) {
      return (await res.json()) as Response;
    }
  };

  const { data: res, isLoading } = useSWR(
    `/api/svg?type=${props.type}&v=${props.version}`,
    fetcher
  );

  useEffect(() => {
    if (!isLoading && res?.data && props.onData) {
      props.onData(res.data);
    }
  }, [isLoading, props, res]);

  if (isLoading) return <Loading />;

  if (!res) return <Timeout />;

  if (res.error)
    return (
      <Error
        message={res.error}
        stack={res.stack}
        type={props.type}
        version={props.version}
        color={props.color}
      />
    );

  const svgs = res.data as SVG[];

  return (
    <div className='container sm:px-4'>
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4'>
        {svgs.map((e) => (
          <Card key={e.id} color={props.color} svg={e} onLoad={props.onLoad} />
        ))}
      </div>
    </div>
  );
});

Cursors.displayName = 'Cursor';
export { Cursors };
