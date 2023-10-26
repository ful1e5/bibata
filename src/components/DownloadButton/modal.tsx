import { useState } from 'react';

import { ErrorSVG, ProcessingSVG } from './svgs';

import { CoreApi } from '@utils/core';
import { Image, Platform } from 'bibata-live/core';

type DownloadConfig = {
  size: number;
  delay: number;
  token?: string;
  images: Image[];
};

type Props = {
  onPrepare?: () => void;
  onDownload?: (new_build?: boolean) => void;

  loading?: boolean;
  disabled?: boolean;

  config: DownloadConfig;

  downloadCount: number;
  totalCount?: number;
};

export const DownloadModal: React.FC<Props> = (props) => {
  const [errorText, setErrorText] = useState<string>('');
  const [loadingText, setLoadingText] = useState<string>('Preparing...');

  const { images, delay, token, size } = props.config;

  const processImages = async (api: CoreApi, p: Platform) => {
    for (const i of images) {
      setLoadingText(`Processing '${i.name}' ...`);

      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          name: i.name,
          platform: p,
          size: size,
          delay: delay,
          frames: i.frames
        })
      );

      const upload = await api.uploadImages(formData);
      if (upload?.error) {
        return upload;
      }
    }
  };

  const downloadFile = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);

    setErrorText('');
  };

  const handleDownload = async (p: Platform) => {
    props.onPrepare && props.onPrepare();
    const api = new CoreApi();
    await api.getSession(token);
    const downloadUrl = `${api.downloadUrl}?type=${p}`;

    setLoadingText(`Preparing Requests ...`);
    const download = await api.downloadable(p);

    if (!download?.error) {
      downloadFile(downloadUrl);
    } else {
      const upload = await processImages(api, p);

      if (upload?.error) {
        console.error(upload.error);
        setErrorText('Oops.. Processing Falied!');
      } else {
        setLoadingText(
          `Packaging ${p == 'win' ? 'Win Cursors' : 'XCursors'} ...`
        );

        const download = await api.downloadable(p);

        if (download?.error) {
          console.error(download.error);
          setErrorText('Oops.. Packaging Failed!');
        } else {
          downloadFile(downloadUrl);
          props.onDownload && props.onDownload(true);
        }
      }
    }

    props.onDownload && props.onDownload();
  };

  return (
    <div className='absolute w-64 h-auto md:w-72 lg:w-96 mt-2 z-10 right-0'>
      <div className='bg-[#2e2e2e] text-white border border-white/[.2] rounded-xl shadow-xl relative'>
        {!props.disabled && props?.totalCount !== 0 && (
          <p className='font-bold text-white/[.2] text-xl text-center p-1 mt-2'>{`${props.downloadCount}/${props.totalCount}`}</p>
        )}
        {props.loading ? (
          <div className='flex p-6 justify-center items-center'>
            <div className='-ml-1 mr-3 h-5 w-5'>
              <ProcessingSVG />
            </div>
            <p>{loadingText}</p>
          </div>
        ) : (
          <>
            {errorText && (
              <div className='flex p-6 justify-center items-center'>
                <div className='-ml-1 mr-3 h-7 w-7'>
                  <ErrorSVG />
                </div>
                <p>{errorText}</p>
              </div>
            )}
            <div className='p-4 grid grid-flow-row gap-4 diviide-y-2 divide-white/[.1] text-left'>
              <button
                disabled={props.loading}
                className='bg-white/[.1] rounded-xl p-4 text-left font-bold'
                onClick={() => handleDownload('x11')}>
                XCursors (.tar.gz)
              </button>
              <button
                disabled={props.loading}
                className='bg-white/[.1] rounded-xl p-4 text-left font-bold'
                onClick={() => handleDownload('win')}>
                Windows (.zip)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
