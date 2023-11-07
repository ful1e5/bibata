import useSWR from 'swr';
import { useEffect, useState } from 'react';

import Tooltip from '@components/Tooltip';

import { DB_SEEDS } from '@root/configs';
import { getDownloadCounts } from '@utils/sponsor/get-count';

import { DownloadCounts } from 'bibata-live/misc';
import { InfoSVG } from './svgs';

type Props = {
  token?: string;
  show: boolean;
};

export const DownloadCount: React.FC<Props> = (props) => {
  const fetcher = () => {
    try {
      return getDownloadCounts(props.token);
    } catch {
      return { total: 0, count: 0 };
    }
  };

  const { data, isLoading } = useSWR<DownloadCounts>(
    '/api/db/download/count',
    fetcher
  );
  const [noDownloads, setNoDownloads] = useState(false);

  useEffect(() => {
    if (data) {
      if (data.count >= data.total!) {
        setNoDownloads(true);
      }
    }
  }, [data]);

  if (isLoading)
    return <div className='h-1 w-full bg-purple-500/[.5] animate-pulse' />;

  if (!data) return <></>;

  return (
    <>
      {props.show && (data!.total || data.total === 0) && (
        <div className='flex flex-row py-1 mt-1 justify-center items-center gap-1'>
          <p
            className={`${
              noDownloads ? 'text-red-100/[.8]' : 'text-green-100/[.8]'
            } font-extrabold text-center text-md p-1`}>
            {`${data.count}/${data.total}`}
          </p>
          <Tooltip
            content={
              noDownloads
                ? `Help @ful1e5 to reach his monthly GitHub Sponsorship goal for unlimited downloads.
                   Download Counts = ${DB_SEEDS.DOWNLOAD_MULTIPLIER} x (Monthly Sponsorship in Cents)`
                : `Download Counts = ${DB_SEEDS.DOWNLOAD_MULTIPLIER} x (Monthly Sponsorship in Cents)`
            }>
            <InfoSVG />
          </Tooltip>
        </div>
      )}
    </>
  );
};
