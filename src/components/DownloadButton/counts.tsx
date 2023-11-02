import useSWR from 'swr';

import { getDownloadCounts } from '@utils/sponsor/get-count';

import { DownloadCounts } from 'bibata-live/misc';

type Props = {
  token?: string;
  show: boolean;
};

export const DownloadCount: React.FC<Props> = (props) => {
  const fetcher = () => {
    return getDownloadCounts(props.token);
  };

  const { data, isLoading } = useSWR<DownloadCounts>(
    '/api/db/download/count',
    fetcher
  );

  if (isLoading)
    return <div className='h-2 w-full bg-yellow-400/[.5] animate-pulse' />;

  if (!data) return <></>;

  return (
    <>
      {props.show && data!.total && (
        <p className='font-bold text-center text-green-100/[.2] text-xl p-1 mb-2'>{`${data.count}/${data.total}`}</p>
      )}
    </>
  );
};
