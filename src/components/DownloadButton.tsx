'use client';

import { download } from '@utils/download';
import { useEffect, useRef, useState } from 'react';

import { CoreImage, CorePlatform } from 'bibata-live';
import { CoreApi } from '@utils/core';

interface DownaloadButtonProps {
  sizes: number[];
  disabled?: boolean;
  images: Set<CoreImage>;
}

export function DownloadButton(props: DownaloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDownload = async (p: CorePlatform) => {
    const api = new CoreApi();
    download(api, props.images, p);
    setShowDropdown(false);
    setLoading(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
      setLoading(false);
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
        disabled={props.disabled}
        onClick={() => {
          setLoading(true);
          setShowDropdown(true);
        }}
        className={`${
          props.disabled
            ? `bg-gray-600 text-gray-300`
            : `bg-green-600 hover:bg-green-500 text-white`
        }  font-bold py-2 px-4 rounded-xl inline-flex items-center`}>
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
            className='fill-current w-4 h-4 mr-2'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'>
            <path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z' />
          </svg>
        )}
        <span>{loading ? 'Processing...' : 'Download'}</span>
        {!loading && (
          <svg
            className='fill-current h-6 w-6'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'>
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        )}
      </button>

      {/* dropdown content goes here */}
      {showDropdown && (
        <div className='absolute w-64 h-auto md:w-72 lg:w-96 mt-2 z-10 right-0'>
          <div className='p-5 bg-[#2e2e2e] text-white border border-white/[.2] rounded-xl shadow-xl relative'>
            <b className='font-black text-xl'>Packages</b>
            <div className='grid grid-flow-row gap-5 mt-6 text-left'>
              <button
                onClick={() => handleDownload('x11')}
                className='text-left'>
                XCursors (.tar.gz)
              </button>
              <button
                onClick={() => handleDownload('win')}
                className='text-left'>
                Windows (.zip)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
