'use client';

import React, { useEffect, useRef, useState } from 'react';

import { CoreApi } from '@utils/core';
import { getDownloadCounts } from '@utils/sponsor/get-count';

import { DownloadCount } from './Counts';
import { DownloadSponsor } from './Sponsor';
import { DownloadSubButtons } from './SubButtons';
import { DownloadError, ErrorLogs } from './Error';
import { ProcessingSVG } from './svgs';

import { Color } from 'bibata/app';
import { Image } from 'bibata/core-api/types';
import { Platform, Type } from '@prisma/client';

type Props = {
  disabled?: boolean;
  token: string;
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
  const configRef = useRef(props.config);
  const tokenRef = useRef(props.token);

  const api = new CoreApi();
  const { images, size, delay, type, color } = configRef.current;
  const name = `Bibata-${type}`;

  const [loading, setLoading] = useState<boolean>(false);
  const [lock, setLock] = useState<boolean>(false);

  const [loadingText, setLoadingText] = useState<string>('Preparing...');
  const [errorLogs, setErrorLogs] = useState<ErrorLogs>({ text: '' });

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const printError = async (e: any) => {
    if (process.env.NODE_ENV === 'development') console.error(e);
  };

  const updateErrorLogs = async (opt: {
    text: string;
    key: string;
    error: any;
  }) => {
    setErrorLogs({
      ...errorLogs,
      id: api.jwt?.id,
      role: api.jwt?.role,
      text: opt.text,
      [opt.key]: opt.error
    });
  };

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
        updateErrorLogs({
          key: 'upload',
          error: upload.error,
          text: 'Oops.. Processing Falied! Try Again.'
        });
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
    setErrorLogs({ text: '' });
  };

  const storeToDB = async (platform: string) => {
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
          baseColor: color.base,
          outlineColor: color.outline,
          watchBGColor: color.watch || color.base
        })
      });
    } catch (e) {
      updateErrorLogs({
        key: 'count',
        error: e,
        text: 'Unexpected Internal Error.'
      });
      printError(e);
    }
  };

  const handleDownload = async (platform: Platform) => {
    setLoading(true);
    setLock(true);

    setErrorLogs({ text: '' });

    api.refreshSession(tokenRef.current);
    const { count, total } = await getDownloadCounts(api.jwt?.token);
    if ((total && count >= total) || (count === 0 && total === 0)) {
      setErrorLogs({ text: 'Download Limit Exceeded.' });
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
          printError(upload.error);
          await api.refreshSession();
        } else {
          setLoadingText(
            `Packaging ${platform === 'win' ? 'Win Cursors' : 'XCursors'} ...`
          );

          const download = await api.downloadable(platform, name);

          if (download?.error) {
            printError(download.error);

            updateErrorLogs({
              key: 'download',
              error: download.error,
              text: 'Oops.. Packaging Failed! Try Again.'
            });

            await api.refreshSession();
          } else {
            await storeToDB(platform);
            downloadFile(downloadUrl);
          }
        }
      }
    }

    setLoading(false);
    setLock(false);
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

  useEffect(() => {
    if (!lock) {
      configRef.current = props.config;
      tokenRef.current = props.token;
    }
  }, [lock, props.disabled, props.token]); // eslint-disable-line react-hooks/exhaustive-deps

  const busy = loading || props.disabled;

  return (
    <>
      <div className='flex justify-center'>
        <button
          ref={buttonRef}
          className='disabled:opacity-50 relative flex justify-center items-center gap-2 w-3/4 sm:w-1/3 lg:w-1/5 h-16 rounded-3xl py-3 bg-green-600 hover:bg-green-500'
          disabled={props.disabled && !lock}
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
                  <DownloadError
                    logs={errorLogs}
                    onClick={() => setErrorLogs({ text: '' })}
                  />
                  <DownloadSubButtons
                    disabled={props.disabled || loading}
                    onClick={(p) => handleDownload(p)}
                  />
                </>
              )}

              <DownloadSponsor show={!props.disabled} />
              <DownloadCount token={api.jwt?.token} show={!props.disabled} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
