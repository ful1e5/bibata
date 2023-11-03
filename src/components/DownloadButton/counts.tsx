import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { getDownloadCounts } from '@utils/sponsor/get-count';

import { DownloadCounts } from 'bibata-live/misc';

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
      if (data.total === data.count) {
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
        <p
          className={`${
            noDownloads
              ? 'bg-red-400/[.03] text-red-100/[.8]'
              : 'bg-green-400/[.03] text-green-100/[.8]'
          } font-bold text-center text-xl p-1`}>
          {`${data.count}/${data.total}`}
        </p>
      )}
    </>
  );
};
