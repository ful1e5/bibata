'use client';

import useSWR from 'swr';

import { useEffect } from 'react';

import { fetchX } from '@utils/fetchX';

import { CursorCard as Card } from './card';
import { CursorsError as Error } from './error';
import { CursorsLoading as Loading } from './loading';
import { CursorsTimeOut as Timeout } from './timeout';

import { Color, SVG } from 'bibata/app';
import { Image } from 'bibata/core-api/types';

type Response = {
  data: SVG[];
  error: string;
  status: number;
};

type Props = {
  type: string;
  color: Color;
  delay: number;
  onLoad?: (image: Image) => void;
  onData?: (svgs: SVG[]) => void;
};

export const Cursors: React.FC<Props> = (props) => {
  const fetcher = async (url: string) => {
    const res = await fetchX(url, { group: 'images-info' });
    return (await res.json()) as Response;
  };

  const {
    data: res,
    isLoading,
    isValidating
  } = useSWR(`/api/svg?type=${props.type}`, fetcher);

  useEffect(() => {
    if (props.onData && res?.data) {
      props.onData(res.data);
    }
  }, [props.onData]);

  if (isLoading || isValidating) return <Loading />;

  if (!res) return <Timeout />;

  if (res.error) return <Error message={res.error} />;

  const svgs = res.data as SVG[];

  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {svgs.map((e) => (
          <Card
            key={`${e.ids}-${e.name}-${props.type}`}
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
