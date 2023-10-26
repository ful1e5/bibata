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
      <g filter='url(#filter0_d_49_2)'>
        <path
          d='M39.6813 201.118L39.6797 201.01V54.0094C39.6797 46.3847 40.5169 39.0584 42.9989 32.8737C45.6064 26.3765 50.6633 19.8579 59.238 17.4932C67.0651 15.3348 74.4518 17.6379 79.8667 20.3314C85.4697 23.1186 91.0374 27.3403 96.4249 32.2619L205.838 129.251L205.889 129.296C213.989 136.544 217.319 147.769 217.584 156.728C217.826 164.894 215.419 179.458 201.726 185.187C196.333 187.444 189.745 187.706 185.325 187.815C182.751 187.879 179.972 187.881 177.242 187.883H177.175C174.363 187.885 171.524 187.887 168.589 187.943C156.587 188.169 144.885 189.307 135.27 193.645C125.719 197.954 117.295 205.94 109.225 214.846C107.774 216.448 106.112 218.334 104.44 220.233C102.144 222.84 99.8239 225.474 97.9863 227.441C94.8727 230.773 90.1675 235.601 84.5776 238.122C77.2998 241.406 70.105 240.319 64.7139 238.04C59.4844 235.83 55.1488 232.237 51.8473 228.649C45.6385 221.902 39.8325 211.498 39.6813 201.118Z'
          fill={props.outline}
        />
      </g>
      <path
        d='M54.5068 54.0092C54.5068 26.9331 66.9694 25.4005 86.5042 43.281L196.003 140.346C204.265 147.738 205.77 167.422 196.003 171.509C186.235 175.596 154.198 168.84 129.173 180.13C104.147 191.42 88.6033 220.04 78.4806 224.607C68.3579 229.174 54.6677 211.949 54.5068 200.902V54.0092Z'
        fill={props.base}
      />
      <g filter='url(#filter1_d_49_2)'>
        <path
          d='M180 27.5H164C137.766 27.5 116.5 48.7665 116.5 75V91C116.5 117.234 137.766 138.5 164 138.5H180C206.234 138.5 227.5 117.234 227.5 91V75C227.5 48.7665 206.234 27.5 180 27.5Z'
          fill={props.watch || props.base}
          stroke={props.outline}
          strokeWidth='15'
        />
        <path
          d='M172 83V43C182.609 43 192.783 47.2143 200.284 54.7157C207.786 62.2172 212 72.3913 212 83H172Z'
          fill='#F05125'
          fillOpacity='0.8'
        />
        <path
          d='M172 83H212C212 93.6087 207.786 103.783 200.284 111.284C192.783 118.786 182.609 123 172 123V83Z'
          fill='#FDB813'
          fillOpacity='0.8'
        />
        <path
          d='M172 83V123C161.391 123 151.217 118.786 143.716 111.284C136.214 103.783 132 93.6087 132 83H172Z'
          fill='#7FBB42'
          fillOpacity='0.8'
        />
        <path
          d='M172 83L132 83C132 72.3913 136.214 62.2172 143.716 54.7157C151.217 47.2143 161.391 43 172 43V83Z'
          fill='#32A0DA'
          fillOpacity='0.8'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_49_2'
          x='33.2797'
          y='15.36'
          width='190.72'
          height='236.35'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='5.12' />
          <feGaussianBlur stdDeviation='3.2' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_49_2'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_49_2'
            result='shape'
          />
        </filter>
        <filter
          id='filter1_d_49_2'
          x='103.88'
          y='20'
          width='136.24'
          height='136.24'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='5.12' />
          <feGaussianBlur stdDeviation='2.56' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_49_2'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_49_2'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};
