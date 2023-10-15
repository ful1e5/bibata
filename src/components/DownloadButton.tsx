'use client';

import { useEffect, useRef, useState } from 'react';

import { CoreImage, CorePlatform } from 'bibata-live';
import { CoreApi } from '@utils/core';

interface DownaloadButtonProps {
  size: number;
  disabled?: boolean;
  images: Set<CoreImage>;
}

export function DownloadButton(props: DownaloadButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [subLoadingText, setSubLoadingText] = useState<string>('Preparing...');

  const processImages = async (api: CoreApi, p: CorePlatform) => {
    for (const i of Array.from(props.images)) {
      setSubLoadingText(`Processing '${i.name}' ...`);

      const res = await fetch(i.url);
      const svg = await res.text();
      const svgBuffer = Buffer.from(svg, 'utf8');
      const blob = new Blob([svgBuffer], { type: 'image/svg+xml' });

      const formData = new FormData();
      formData.append('file', blob, `${i.name}.${p}`);
      formData.append('data', JSON.stringify({ size: props.size }));

      const upload = await api.uploadImages(formData);
      if (upload.error) {
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

  const handleDownload = async (p: CorePlatform) => {
    setLoading(true);
    const api = new CoreApi();
    const downloadUrl = `${api.downloadUrl}?type=${p}`;

    setSubLoadingText(`Preparing Requests ...`);
    await api.getSession();

    const download = await api.downloadable(p);

    if (!download?.error) {
      downloadFile(downloadUrl);
    } else {
      const upload = await processImages(api, p);

      if (upload?.error) {
        console.error(upload.error);
        setErrorText('Oops.. Processing Falied!');
      } else {
        setSubLoadingText(
          `Packaging ${p == 'win' ? 'Win Cursors' : 'XCursors'} ...`
        );

        const download = await api.downloadable(p);

        if (download?.error) {
          console.error(download.error);
          setErrorText('Oops.. Packaging Failed!');
        } else {
          downloadFile(downloadUrl);
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

  return (
    <div className='relative inline-block' ref={dropdownRef}>
      <button
        className={`disabled:opacity-40 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-7 rounded-xl inline-flex items-center`}
        disabled={props.disabled}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}>
        {loading || props.disabled ? (
          <svg
            className='animate-spin -ml-1 mr-3 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
          </svg>
        ) : (
          <svg
            className='fill-current w-4 h-4 mr-4'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'>
            <path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z' />
          </svg>
        )}
        <span className='text-lg'>
          {loading || props.disabled ? 'Processing...' : 'Download'}
        </span>
        <svg
          className='fill-current h-6 w-6 ml-2'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>

      {/* dropdown content goes here */}
      {showDropdown && (
        <div className='absolute w-64 h-auto md:w-72 lg:w-96 mt-2 z-10 right-0'>
          <div className='bg-[#2e2e2e] text-white border border-white/[.2] rounded-xl shadow-xl relative'>
            {loading ? (
              <div className='flex p-6 justify-center items-center'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                <p>{subLoadingText}</p>
              </div>
            ) : (
              <>
                {errorText && (
                  <div className='flex p-6 justify-center items-center'>
                    <svg
                      className='-ml-1 mr-3 h-7 w-7'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 16 16'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'>
                      <path
                        d='m10.25 5.75-4.5 4.5m0-4.5 4.5 4.5'
                        fill='red'></path>
                      <circle cx='8' cy='8' r='6.25'></circle>
                    </svg>
                    <p>{errorText}</p>
                  </div>
                )}
                <div className='p-4 grid grid-flow-row gap-4 diviide-y-2 divide-white/[.1] text-left'>
                  <button
                    disabled={loading}
                    className='bg-white/[.1] rounded-xl p-4 text-left font-bold'
                    onClick={() => handleDownload('x11')}>
                    XCursors (.tar.gz)
                  </button>
                  <button
                    disabled={loading}
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
  );
}
