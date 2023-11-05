'use client';

import { useEffect, useRef, useState } from 'react';

import { CoreApi } from '@utils/core';
import { Platform, Type } from '@prisma/client';
import { getDownloadCounts } from '@utils/sponsor/get-count';

import { DownloadCount } from './Counts';
import { DownloadSubButtons } from './SubButtons';
import { ErrorSVG, ProcessingSVG } from './svgs';

import { Image } from 'bibata-live/core-api/types';
import { Color } from 'bibata-live/app';

type Props = {
  disabled?: boolean;
  api: CoreApi;
  config: {
    type: string;
    color: Color;
    size: number;
    delay: number;
    images: Image[];
  };
};

type ProcessOptions = {
  platform: Platform;
  size: number;
  delay: number;
};

export const DownloadButton: React.FC<Props> = (props) => {
  const api = props.api;
  const { images, size, delay, type, color } = props.config;
  const name = `Bibata-Live-${type}`;

  const [loading, setLoading] = useState<boolean>(false);

  const [loadingText, setLoadingText] = useState<string>('Preparing...');
  const [errorText, setErrorText] = useState<string>('');

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const processImages = async (imgs: Image[], options: ProcessOptions) => {
    for (const i of imgs) {
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

  const storeToDB = async (platform: string) => {
    const toHex = (s: string) => `#${s}`;

    try {
      await fetch('/api/db/download/store', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${api.jwt?.token}`
        },
        body: JSON.stringify({
          platform,
          type: type as Type,
          baseColor: toHex(color.base),
          outlineColor: toHex(color.outline),
          watchBGColor: toHex(color.watch || color.base)
        })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = async (platform: Platform) => {
    setLoading(true);

    const { count, total } = await getDownloadCounts(api.jwt?.token);
    if (count >= total! || (count === 0 && total === 0)) {
      setErrorText('Download Limit Exceeded.');
    } else {
      const downloadUrl = api.downloadUrl(platform, name);

      setLoadingText(`Preparing Requests ...`);
      const download = await api.downloadable(platform, name);

      if (!download?.error) {
        downloadFile(downloadUrl);
      } else {
        const upload = await processImages(images, {
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

          const download = await api.downloadable(platform, name);

          if (download?.error) {
            console.error(download.error);
            setErrorText('Oops.. Packaging Failed!');
          } else {
            await storeToDB(platform);
            downloadFile(downloadUrl);
          }
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const busy = loading || props.disabled;

  return (
    <>
      <div className='flex justify-center'>
        <button
          ref={buttonRef}
          className={`relative flex justify-center items-center gap-2 w-1/2 sm:w-1/3 lg:w-1/5 h-16 rounded-3xl py-3 bg-green-600 hover:bg-green-500 ${
            busy && 'opacity-60'
          }`}
          disabled={props.disabled}
          onClick={() => setShowDropdown(!showDropdown)}>
          <p className='overflow-auto text-lg font-semibold'>
            {busy ? 'Processing' : 'Download'}
          </p>

          {busy && <ProcessingSVG />}
        </button>
      </div>

      {showDropdown && (
        <div className='flex justify-center' ref={dropdownRef}>
          <div className='absolute w-full sm:w-1/2 lg:w-1/4 2xl:w-1/5 h-auto mt-2 z-10 px-6 sm:px-0'>
            <div className='bg-[#2e2e2e] text-white border border-white/[.2] rounded-xl shadow-xl relative'>
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
                    <div className='flex p-6 justify-center items-center fill-red-300 text-red-300'>
                      <div className='mr-1 mt-1 h-7 w-7'>
                        <ErrorSVG />
                      </div>
                      <p className='font-bold'>{errorText}</p>
                    </div>
                  )}
                  <DownloadSubButtons
                    disabled={props.disabled || loading}
                    onClick={(p) => handleDownload(p)}
                  />
                </>
              )}

              <DownloadCount token={api.jwt?.token} show={!props.disabled} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
