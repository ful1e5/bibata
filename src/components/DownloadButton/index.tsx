'use client';

import { useEffect, useRef, useState } from 'react';

import { CoreApi } from '@utils/core';
import { ErrorSVG, DownloadSVG, ProcessingSVG } from './svgs';

import { Image, Platform } from 'bibata-live/core-api/types';
import { Color } from 'bibata-live/app';

type Props = {
  disabled?: boolean;
  token?: string;
  config: {
    color: Color;
    size: number;
    delay: number;
    images: Image[];
  };
  totalCount?: number;
};

type ProcessOptions = {
  platform: Platform;
  size: number;
  delay: number;
};

export const DownloadButton: React.FC<Props> = (props) => {
  const api = new CoreApi();

  const [loading, setLoading] = useState<boolean>(false);
  const [downloadCount, setDownloadCount] = useState<number>(0);

  const [loadingText, setLoadingText] = useState<string>('Preparing...');
  const [errorText, setErrorText] = useState<string>('');

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const configRef = useRef(props.config);

  const processImages = async (
    api: CoreApi,
    images: Image[],
    options: ProcessOptions
  ) => {
    for (const i of images) {
      setLoadingText(`Processing '${i.name}' ...`);

      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          name: i.name,
          frames: i.frames,
          ...options
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

  const handleDownload = async (platform: Platform) => {
    setLoading(true);

    const { images, size, color, delay } = props.config;

    await api.getSession(props.token);
    const downloadUrl = `${api.downloadUrl}?type=${platform}`;

    setLoadingText(`Preparing Requests ...`);
    const download = await api.downloadable(platform);

    if (!download?.error) {
      downloadFile(downloadUrl);
    } else {
      const upload = await processImages(api, images, {
        platform,
        size,
        delay
      });

      if (upload?.error) {
        console.error(upload.error);
        setErrorText('Oops.. Processing Falied!');
      } else {
        setLoadingText(
          `Packaging ${platform == 'win' ? 'Win Cursors' : 'XCursors'} ...`
        );

        const download = await api.downloadable(platform);

        if (download?.error) {
          console.error(download.error);
          setErrorText('Oops.. Packaging Failed!');
        } else {
          downloadFile(downloadUrl);

          const { base, outline, watch } = color;
          setDownloadCount((i) => i++);
        }
      }
    }

    setLoading(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!loading && !props.disabled && props.config !== configRef.current) {
      api.deleteSession();
    }
  }, [props.config]);

  return (
    <div className='flex items-center justify-center'>
      <div className='relative' ref={dropdownRef}>
        <button
          className='disabled:opacity-40 bg-green-600 hover:bg-green-500 rounded-2xl py-3 px-4 inline-flex items-center'
          disabled={props.disabled}
          onClick={() => setShowDropdown(!showDropdown)}>
          <span className='text-lg font-semibold'>
            {loading ? 'Processing' : 'Download'}
          </span>

          <span className='w-5 ml-2'>
            {loading ? <ProcessingSVG /> : <DownloadSVG />}
          </span>
        </button>

        {showDropdown && (
          <div className='absolute w-64 h-auto md:w-72 lg:w-96 mt-2 z-10 right-0'>
            <div className='bg-[#2e2e2e] text-white border border-white/[.2] rounded-xl shadow-xl relative'>
              {!props.disabled && props?.totalCount !== 0 && (
                <p className='font-bold text-white/[.2] text-xl text-center p-1 mt-2'>{`${downloadCount}/${props.totalCount}`}</p>
              )}
              {loading ? (
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
                      disabled={props.disabled || loading}
                      className='bg-white/[.1] rounded-xl p-4 text-left font-bold'
                      onClick={() => handleDownload('x11')}>
                      XCursors (.tar.gz)
                    </button>
                    <button
                      disabled={props.disabled || loading}
                      className='bg-white/[.1] rounded-xl p-4 text-left font-bold'
                      onClick={() => handleDownload('win')}>
                      Windows (.zip)
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
