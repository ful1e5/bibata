import useSWR from 'swr';

import { SPONSOR_API_ENDPOINT } from '@root/configs';
import { getLuckySponsor } from '@utils/sponsor/lucky-sponsor';

import { LuckySponsor } from 'bibata-live/misc';
import Link from 'next/link';
import Tooltip from '@components/Tooltip';

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

  return (
    <>
      {props.show && (
        <div className='flex flex-col py-1 justify-center items-center gap-3'>
          <strong className='mt-2 font-extrabold text-white/[.9]'>
            Sponsored By
          </strong>

          <Link
            className='rounded-xl ring-1 ring-white/[.3] hover:bg-white/[.1]'
            href={data.sponsors[0].url}
            target='_blank'>
            <Tooltip
              content={`@${data.sponsors[0].login} and ${data.others} others enable this download and back the project's development.`}>
              <div className='inline-flex p-2 justify-center items-center gap-3'>
                <div className='w-10 h-10 overflow-hidden rounded-2xl ring-white/[.2] ring-1 '>
                  <img
                    src={data.sponsors[0].avatarUrl}
                    alt={`@${data.sponsors[0].login}`}
                  />
                  <div className='w-full h-full animate-pulse bg-white/[.4]'></div>
                </div>
                <p>{data.sponsors[0].name}</p>
              </div>
            </Tooltip>
          </Link>
        </div>
      )}
    </>
  );
};
