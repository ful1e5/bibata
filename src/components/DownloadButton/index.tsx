'use client';

import React, { useEffect, useRef, useState } from 'react';

import { CoreApi } from '@utils/core';
import { getDownloadCounts } from '@utils/sponsor/get-count';

import { DownloadCount } from './counts';
import { DownloadSponsor } from './sponsor';
import { DownloadSubButtons } from './sub-buttons';
import { DownloadError, ErrorLogs } from './error';
import { LockSVG, ProcessingSVG } from '@components/svgs';

import { Platform, Type } from '@prisma/client';
import { Color, Image } from 'bibata/app';
import { AuthToken } from 'bibata/core-api/types';

type Props = {
  disabled?: boolean;
  lock?: boolean;
  auth: AuthToken;
  version: string;
  config: {
    type: string;
    color: Color;
    size: number;
    images: Image[];
  };
};

type ProcessOptions = {
  platform: Platform;
  size: number;
};

export const DownloadButton: React.FC<Props> = (props) => {
  const { images, size, type, color } = props.config;
  const { id, token, role } = props.auth;

  const name = `Bibata-${type}${props.auth.role === 'PRO' ? '-Pro' : ''}`;

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
      id,
      role,
      token,
      text: opt.text,
      [opt.key]: opt.error
    });
  };

  const processImages = async (
    api: CoreApi,
    imgs: Image[],
    options: ProcessOptions
  ) => {
    for (const i of imgs) {
      setLoadingText(`Processing '${i.name}' ...`);

      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          name: i.name,
          frames: i.frames,
          delay: i.delay,
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
          Authorization: `Bearer ${token}`
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

    const api = new CoreApi();
    await api.refreshSession(token);
    const { count, total } = await getDownloadCounts(token);
    if ((total && count >= total) || (count === 0 && total === 0)) {
      setErrorLogs({ text: 'Download Limit Exceeded.' });
    } else {
      const n = `${name}${role === 'PRO' ? '-Pro' : ''}`;

      const downloadUrl = api.downloadUrl(platform, n, props.version);

      setLoadingText(`Preparing Requests ...`);
      const download = await api.downloadable(platform, n, props.version);

      if (!download?.error) {
        downloadFile(downloadUrl);
      } else {
        const upload = await processImages(api, images, { platform, size });

        if (upload?.error) {
          printError(upload.error);
          await api.refreshSession(token);
        } else {
          setLoadingText(
            `Packaging ${platform === 'win' ? 'Win Cursors' : 'XCursors'} ...`
          );

          const download = await api.downloadable(platform, n, props.version);

          if (download?.error) {
            printError(download.error);

            updateErrorLogs({
              key: 'download',
              error: download.error,
              text: 'Oops.. Packaging Failed! Try Again.'
            });

            await api.refreshSession(token);
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
    if (lock === false && !props.lock) {
      const api = new CoreApi();
      api.deleteSession();
    }
  }, [lock, props.lock, props.disabled, props.auth]); // eslint-disable-line react-hooks/exhaustive-deps

  const busy = loading || props.disabled;

  return (
    <>
      <div className='flex justify-center'>
        <button
          ref={buttonRef}
          title={
            props.lock
              ? 'Download locked while collecting cursor images.'
              : 'Download'
          }
          className='disabled:opacity-50 relative flex justify-center items-center gap-2 w-4/5 sm:w-1/3 lg:w-1/5 h-11 sm:h-16 rounded-2xl sm:rounded-3xl py-3 bg-green-600 hover:bg-green-500'
          disabled={props.disabled && !lock && !props.lock}
          onClick={() => !props.lock && setShowDropdown(!showDropdown)}>
          <p className='overflow-auto text-sm sm:text-lg font-semibold'>
            {!props.lock && busy ? 'Processing' : 'Download'}
          </p>

          {props.lock ? <LockSVG /> : busy && <ProcessingSVG />}
        </button>
      </div>

      {showDropdown && (
        <div className='flex justify-center' ref={dropdownRef}>
          <div className='absolute clip-bottom h-2 w-4 bg-white/[.2]' />
          <div className='absolute w-full sm:w-1/2 lg:w-1/4 2xl:w-1/5 h-auto mt-2 z-10 px-6 sm:px-0'>
            <div className='bg-[#2e2e2e] text-white border border-white/[.2] rounded-xl shadow-xl relative'>
              {loading ? (
                <>
                  <div className='flex p-6 justify-center items-center'>
                    <div className='-ml-1 mr-3 h-5 w-5'>
                      <ProcessingSVG />
                    </div>
                    <p>{loadingText}</p>
                  </div>
                </>
              ) : (
                <>
                  <DownloadError
                    logs={errorLogs}
                    onClick={() => setErrorLogs({ text: '' })}
                  />
                  <DownloadSubButtons
                    disabled={busy}
                    version={props.version}
                    onClick={(p) => handleDownload(p)}
                  />
                </>
              )}

              <DownloadSponsor show={!props.disabled} />
              <DownloadCount token={token} show={!props.disabled} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
