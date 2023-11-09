'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { CoreApi } from '@utils/core';
import { getDownloadCounts } from '@utils/sponsor/get-count';
import { bugReportTemplate } from '@utils/bug-report';

import { DownloadCount } from './Counts';
import { DownloadSponsor } from './Sponsor';
import { DownloadSubButtons } from './SubButtons';
import { ErrorSVG, ProcessingSVG } from './svgs';

import { BUG_REPORT_ENDPOINT } from '@root/configs';

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
  const [errorText, setErrorText] = useState<string>('');
  const [errorLogs, setErrorLogs] = useState<any>(null);

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const print_error = async (e: any) => {
    if (process.env.NODE_ENV === 'development') console.error(e);
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
      setErrorLogs(e);
      print_error(e);
    }
  };

  const handleDownload = async (platform: Platform) => {
    setLoading(true);
    setLock(true);
    setErrorLogs(null);

    api.refreshSession(tokenRef.current);
    const { count, total } = await getDownloadCounts(api.jwt?.token);
    if ((total && count >= total) || (count === 0 && total === 0)) {
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
          print_error(upload.error);
          setErrorLogs(upload.error);
          setErrorText('Oops.. Processing Falied! Try Again.');
          await api.refreshSession();
        } else {
          setLoadingText(
            `Packaging ${platform == 'win' ? 'Win Cursors' : 'XCursors'} ...`
          );

          const download = await api.downloadable(platform, name);

          if (download?.error) {
            print_error(download.error);
            setErrorLogs(download.error);
            setErrorText('Oops.. Packaging Failed! Try Again.');
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
      api.deleteSession();
      configRef.current = props.config;
      tokenRef.current = props.token;
    }
  }, [lock, props.token]);

  const busy = loading || props.disabled;

  return (
    <>
      <div className='flex justify-center'>
        <button
          ref={buttonRef}
          className='disabled:opacity-50 relative flex justify-center items-center gap-2 w-1/2 sm:w-1/3 lg:w-1/5 h-16 rounded-3xl py-3 bg-green-600 hover:bg-green-500'
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
                  {errorText && (
                    <div className='flex p-6 justify-center items-center fill-red-300 text-red-300'>
                      <div className='mr-1 mt-1 h-7 w-7'>
                        <ErrorSVG />
                      </div>
                      <p className='font-bold'>{errorText}</p>
                    </div>
                  )}

                  {errorLogs && (
                    <div className='-mt-4 mb-3 flex justify-center'>
                      <Link
                        className='bg-red-500 hover:bg-red-400 px-4 py-2 rounded-xl '
                        target='_blank'
                        href={BUG_REPORT_ENDPOINT(
                          errorText,
                          bugReportTemplate(errorText, errorLogs)
                        )}>
                        Report Bug
                      </Link>
                    </div>
                  )}

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
