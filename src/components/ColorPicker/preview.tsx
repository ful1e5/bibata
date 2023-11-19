'use client';

import React from 'react';

type Props = {
  base: string;
  outline: string;
  watch?: string;
};

export const CursorPreview: React.FC<Props> = (props) => {
  return (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 256 256'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M141.269 109.497L162.13 110.056L147.596 95.0801L82.2756 27.7773C70.7037 15.8542 50.5001 24.0464 50.5001 40.6618L50.5 134.895L50.5 160.434L65.8046 139.989L89.6654 108.115L141.269 109.497Z'
        fill={props.base}
        stroke={props.outline}
        strokeWidth='17'
      />
      <circle
        cx='118'
        cy='162'
        r='70.5'
        fill={props.watch || props.base}
        stroke={props.outline}
        strokeWidth='17'
      />
      <g transform='translate(118 162)'>
        <g transform='scale(0.9)'>
          <g transform='translate(-50 -50)'>
            <g transform='rotate(0 50 50)'>
              <animateTransform
                attributeName='transform'
                type='rotate'
                repeatCount='indefinite'
                values='0 50 50;360 50 50'
                keyTimes='0;1'
                dur='0.7575757575757576s'
              />
              <path
                fillOpacity='0.8'
                fill='#f05125'
                d='M50 50L50 0A50 50 0 0 1 100 50Z'
              />
            </g>
            <g transform='rotate(0 50 50)'>
              <animateTransform
                attributeName='transform'
                type='rotate'
                repeatCount='indefinite'
                values='0 50 50;360 50 50'
                keyTimes='0;1'
                dur='1.0101010101010102s'
              />
              <path
                fillOpacity='0.8'
                fill='#fdb813'
                d='M50 50L50 0A50 50 0 0 1 100 50Z'
                transform='rotate(90 50 50)'
              />
            </g>
            <g transform='rotate(0 50 50)'>
              <animateTransform
                attributeName='transform'
                type='rotate'
                repeatCount='indefinite'
                values='0 50 50;360 50 50'
                keyTimes='0;1'
                dur='1.5151515151515151s'
              />
              <path
                fillOpacity='0.8'
                fill='#7fbb42'
                d='M50 50L50 0A50 50 0 0 1 100 50Z'
                transform='rotate(180 50 50)'
              />
            </g>
            <g transform='rotate(0 50 50)'>
              <animateTransform
                attributeName='transform'
                type='rotate'
                repeatCount='indefinite'
                values='0 50 50;360 50 50'
                keyTimes='0;1'
                dur='3.0303030303030303s'
              />
              <path
                fill-opacity='0.8'
                fill='#32a0da'
                d='M50 50L50 0A50 50 0 0 1 100 50Z'
                transform='rotate(270 50 50)'
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
