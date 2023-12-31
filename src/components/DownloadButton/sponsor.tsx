'use client';

import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import Tooltip from '@components/Tooltip';

import { getLuckySponsor, url } from '@utils/sponsor/lucky-sponsor';

import { LuckySponsor } from 'bibata/misc';

type Props = {
  show: boolean;
};

export const DownloadSponsor: React.FC<Props> = (props) => {
  const { data, isLoading } = useSWR<LuckySponsor>(url, () =>
    getLuckySponsor()
  );

  if (isLoading) {
    return (
      <div className='flex flex-col py-1 justify-center items-center gap-3'>
        <strong className='mt-2 font-extrabold text-white/[.9]'>
          Sponsored By
        </strong>
        <div className='opacity-90 animate-pulse flex flex-row px-2 py-4 justify-center items-center gap-3 rounded-xl ring-1 ring-white/[.3] hover:bg-white/[.1]'>
          <div className='w-10 h-10 bg-white/[.5] rounded-2xl' />

          <div className='flex flex-col justify-center items-center gap-2 px-2'>
            <div className='h-2 w-16 bg-white/[.5] rounded-full' />
            <div className='bg-green-400/[.5] h-4 w-24 px-2 rounded-md' />
          </div>
        </div>
      </div>
    );
  }

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

          <Tooltip tooltip={tooltip}>
            <div className='flex flex-row p-2 justify-center items-center gap-3 rounded-xl ring-1 ring-white/[.3] hover:bg-white/[.1]'>
              <div className='w-10 h-10 overflow-hidden rounded-2xl ring-1 ring-white/[.2] hover:ring-blue-400 hover:ring-2'>
                <Link href={data.sponsors[0].url} target='_blank'>
                  <img
                    width={100}
                    height={100}
                    src={sponsor.avatarUrl}
                    alt={login}
                  />
                  <div className='w-full h-full animate-pulse bg-white/[.4]'></div>
                </Link>
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
