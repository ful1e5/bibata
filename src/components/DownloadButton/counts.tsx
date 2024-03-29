'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import Tooltip from '@components/Tooltip';
import { InfoSVG } from '@components/svgs';

import { DB_SEEDS } from '@root/configs';

import { getDownloadCounts } from '@utils/sponsor/get-count';

import { DownloadCounts } from 'bibata/misc';

type Props = {
  token: string;
  show: boolean;
};

const numberWithCommas = (x: number | null) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const DownloadCount: React.FC<Props> = (props) => {
  const fetcher = () => {
    try {
      return getDownloadCounts(props.token);
    } catch {
      return { total: 0, count: 0, role: 'ANONYMOUS', error: null };
    }
  };

  const { data, isLoading } = useSWR<DownloadCounts>(
    '/api/db/download/count',
    fetcher
  );
  const [noDownloads, setNoDownloads] = useState(false);
  const [pro, setPro] = useState(false);

  useEffect(() => {
    if (data) {
      if (data.count >= data.total!) {
        setNoDownloads(true);
      }

      if (data.role === 'PRO' || data.role == 'ADMIN') {
        setPro(true);
      }
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className='py-3 animate-pulse flex justify-center items-center '>
        <div className='h-5 w-28 bg-white/[.2] rounded-lg' />
      </div>
    );
  }

  if (!data) return <></>;

  return (
    <>
      {props.show && (
        <div className='flex flex-row py-1 mt-1 justify-center items-center gap-1'>
          <p
            className={`${
              noDownloads ? 'text-red-100/[.8]' : 'text-green-100/[.8]'
            } font-extrabold text-center text-sm p-1`}>
            {`${numberWithCommas(data.count)}`}/
            {pro ? <> &#8734;</> : numberWithCommas(data.total) || 0}
          </p>
          {!pro && (
            <Tooltip
              tooltip={
                noDownloads
                  ? `Help @ful1e5 to reach his monthly GitHub Sponsorship goal for unlimited downloads.
                   Download Counts = ${DB_SEEDS.DOWNLOAD_MULTIPLIER} x (Monthly Sponsorship in Cents)`
                  : `Download Counts = ${DB_SEEDS.DOWNLOAD_MULTIPLIER} x (Monthly Sponsorship in Cents)`
              }>
              <InfoSVG />
            </Tooltip>
          )}
        </div>
      )}
    </>
  );
};
