'use client';

import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import Tooltip from '@components/Tooltip';

import { getLuckySponsor } from '@utils/sponsor/lucky-sponsor';

import { SPONSOR_API_ENDPOINT } from '@root/configs';

import { LuckySponsor } from 'bibata/misc';

type Props = {
  show: boolean;
};

export const DownloadSponsor: React.FC<Props> = (props) => {
  const { data, isLoading } = useSWR<LuckySponsor>(
    `${SPONSOR_API_ENDPOINT}?single=true`,
    () => getLuckySponsor()
  );

  if (isLoading)
    return <div className='h-1 w-full bg-purple-500/[.8] animate-pulse' />;

  if (!data) return <></>;
  const sponsor = data.sponsors[0];
  const login = `@${sponsor.login}`;

  const tooltip = `${login} and ${data.others} other${
    data.others > 1 ? 's' : ''
  } contribute ${
    data.total_dollar
  }$ per month to support and boost the project's development while enabling downloads.`;

  return (
    <>
      {props.show && (
        <div className='flex flex-col py-1 justify-center items-center gap-3'>
          <strong className='mt-2 font-extrabold text-white/[.9]'>
            Sponsored By
          </strong>

          <Tooltip content={tooltip}>
            <div className='flex flex-row p-2 justify-center items-center gap-3 rounded-xl ring-1 ring-white/[.3] hover:bg-white/[.1]'>
              <div className='w-10 h-10 overflow-hidden rounded-2xl ring-1 ring-white/[.2] hover:ring-blue-400 hober:ring-2'>
                <Link href={data.sponsors[0].url} target='_blank'>
                  <img
                    width={100}
                    height={100}
                    src={sponsor.avatarUrl}
                    alt={login}
                  />
                </Link>
                <div className='w-full h-full animate-pulse bg-white/[.4]'></div>
              </div>

              <div className='flex flex-col justify-center items-center gap-1 px-2'>
                <Link href={data.sponsors[0].url} target='_blank'>
                  <p className='hover:underline'>{sponsor.name || login}</p>
                </Link>
                <p className='font-black bg-green-400 px-2 rounded-lg text-black text-md'>
                  {sponsor.dollar}$ / month
                </p>
              </div>
            </div>
          </Tooltip>
        </div>
      )}
    </>
  );
};
