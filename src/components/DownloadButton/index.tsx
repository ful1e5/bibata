'use client';

import { useEffect, useRef, useState } from 'react';

import { Image } from 'bibata-live/core';

import { DownloadSVG, ProcessingSVG } from './svgs';
import { DownloadModal } from './modal';

type Props = {
  disabled?: boolean;

  size: number;
  delay: number;
  token?: string;
  images: Image[];

  totalCount?: number;
};

export const DownloadButton: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [downloadCount, setDownloadCount] = useState<number>(0);

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const config = {
    size: props.size,
    delay: props.delay,
    token: props.token,
    images: props.images
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='relative' ref={dropdownRef}>
        <button
          className='disabled:opacity-40 bg-green-600 hover:bg-green-500 rounded-2xl p-3'
          disabled={props.disabled}
          onClick={() => setShowDropdown(!showDropdown)}>
          <div className='flex justify-between items-center'>
            <span className='w-36'>
              <p className='text-lg font-semibold'>
                {loading || props.disabled ? 'Processing...' : 'Download'}
              </p>
            </span>

            <span className='mr-1 w-5'>
              {loading || props.disabled ? <ProcessingSVG /> : <DownloadSVG />}
            </span>
          </div>
        </button>

        {showDropdown && (
          <DownloadModal
            onPrepare={() => setLoading(true)}
            onDownload={(new_build) => {
              if (new_build) {
                setDownloadCount((i) => {
                  return i++;
                });
              }
              setLoading(false);
            }}
            loading={loading}
            disabled={props.disabled}
            config={config}
            downloadCount={downloadCount}
            totalCount={props.totalCount}
          />
        )}
      </div>
    </div>
  );
};
