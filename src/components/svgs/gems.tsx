'use client';

import React from 'react';

type Props = {
  gems: string;
};

// eslint-disable-next-line no-unused-vars
export const GemsSVG: React.FC<Props> = (props) => {
  if (props.gems === 'Amber') {
    return (
      <svg
        className='fill-current h-7 sm:h-16'
        viewBox='0 0 500 500'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g filter='url(#filter0_d_137_31)'>
          <path
            d='M462.058 211.823L387.969 439.868C386.7 443.787 384.229 447.067 381.051 449.367C377.881 451.676 373.988 453.005 369.873 453.005H130.105C125.99 453.005 122.096 451.676 118.927 449.367C115.749 447.058 113.295 443.787 112.017 439.868L37.9109 211.764C36.6585 207.862 36.7266 203.789 37.9365 200.074C39.1378 196.343 41.5063 192.977 44.8376 190.566L238.828 49.621C242.168 47.2098 246.078 46 249.997 46C253.917 46 257.836 47.2098 261.167 49.621L455.157 190.566C458.497 192.994 460.857 196.343 462.067 200.074C463.277 203.806 463.345 207.904 462.067 211.823H462.058Z'
            fill='#F4B573'
          />
          <path
            d='M363.798 232.007L345.139 289.406L320.329 365.787H179.665L177.135 358L170.915 338.855L166.494 325.249L136.197 232.007L249.997 149.321L303.528 188.223L313.965 195.806L328.662 206.473L363.798 232.007Z'
            fill='#FFD1A0'
          />
          <path
            d='M462.058 211.823L387.969 439.868C386.7 443.787 384.229 447.067 381.051 449.367L320.321 365.779L363.789 231.999L462.058 200.074C463.268 203.806 463.336 207.904 462.058 211.823Z'
            fill='#F1A350'
          />
          <path
            d='M381.059 449.376C377.89 451.685 373.996 453.014 369.881 453.014H130.105C125.99 453.014 122.096 451.685 118.927 449.376L179.657 365.787H320.321L381.051 449.376H381.059Z'
            fill='#DE974B'
          />
          <path
            d='M249.997 46V149.321L136.197 232.007L37.9365 200.083C39.1378 196.351 41.5064 192.986 44.8377 190.575L238.828 49.621C242.168 47.2098 246.078 46 249.997 46Z'
            fill='#E1A05B'
          />
          <path
            d='M363.798 232.007L345.139 289.406L268.767 365.787H179.665L177.135 358L328.662 206.473L363.798 232.007Z'
            fill='#FFEFDE'
          />
          <path
            d='M313.965 195.806L170.915 338.855L166.494 325.249L303.528 188.223L313.965 195.806Z'
            fill='#FFEFDE'
          />
        </g>
        <defs>
          <filter
            id='filter0_d_137_31'
            x='17'
            y='36'
            width='466'
            height='447.014'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='10' />
            <feGaussianBlur stdDeviation='10' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_137_31'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_137_31'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    );
  } else if (props.gems === 'Ice') {
    return (
      <svg
        className='fill-current h-7 sm:h-16'
        viewBox='0 0 500 500'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g filter='url(#filter0_d_137_19)'>
          <path
            d='M462.991 138.65V361.35C462.991 366.223 462.037 371.003 460.231 375.433C458.374 380.017 455.605 384.226 452.035 387.795L387.778 452.052C384.217 455.613 380.008 458.382 375.425 460.24C370.986 462.046 366.215 463 361.341 463H138.65C133.777 463 128.997 462.046 124.567 460.24C120.119 458.45 116.038 455.784 112.545 452.384L112.205 452.052L80.0763 419.924L47.6327 387.472C44.2163 383.979 41.5666 379.881 39.7689 375.442C37.9542 370.994 37 366.223 37 361.341V138.65C37 133.768 37.9542 128.989 39.7604 124.567C41.6177 119.983 44.3867 115.774 47.948 112.213L112.205 47.9565C115.774 44.3867 119.983 41.6177 124.567 39.7604C129.006 37.9542 133.777 37 138.65 37H361.35C366.223 37 371.003 37.9542 375.433 39.7604C380.017 41.6263 384.226 44.3952 387.787 47.9565L452.043 112.213C455.605 115.774 458.374 119.983 460.24 124.567C462.046 128.997 463 133.777 463 138.65H462.991Z'
            fill='#AFBFFF'
          />
          <path
            d='M381.721 164.354V335.637L335.637 381.721H164.355C164.27 381.635 164.176 381.542 164.082 381.448C159.124 376.49 154.778 372.144 150.689 368.055C140.056 357.422 131.196 348.579 118.271 335.637V164.354C136.265 146.36 146.352 136.273 164.355 118.271H335.637C348.57 131.212 357.423 140.056 368.055 150.688L381.713 164.346L381.721 164.354Z'
            fill='#E7E7E7'
          />
          <path
            d='M164.355 118.271L126.194 156.431L121.56 161.066L118.279 164.346L39.7607 124.567C41.6181 119.983 44.387 115.774 47.9483 112.213L112.205 47.9566C115.775 44.3868 119.983 41.6178 124.567 39.7605L164.363 118.271H164.355Z'
            fill='#82A5FF'
          />
          <path
            d='M164.355 381.721L124.559 460.231C120.111 458.442 116.03 455.775 112.537 452.376L112.196 452.044L80.0681 419.915L47.6245 387.463C44.2081 383.97 41.5584 379.872 39.7607 375.433L118.271 335.637L164.355 381.721Z'
            fill='#82A5FF'
          />
          <path
            d='M460.231 124.567L381.721 164.363L335.637 118.279L375.425 39.7605C380.008 41.6263 384.217 44.3953 387.779 47.9566L452.035 112.213C455.596 115.774 458.365 119.983 460.231 124.567Z'
            fill='#82A5FF'
          />
          <path
            d='M460.231 375.425C458.374 380.008 455.605 384.217 452.035 387.787L387.778 452.043C384.217 455.605 380.008 458.374 375.425 460.231L335.628 381.721L338.909 378.441L343.543 373.806L381.704 335.646L460.214 375.442L460.231 375.425Z'
            fill='#82A5FF'
          />
          <path
            d='M375.424 460.231C370.985 462.037 366.214 462.991 361.341 462.991H138.65C133.776 462.991 128.997 462.037 124.566 460.231L164.363 381.721H335.645L375.441 460.231H375.424Z'
            fill='#5F8BFF'
          />
          <path
            d='M381.721 187.196V308.578L308.578 381.721H187.196L381.721 187.196Z'
            fill='#F2F2F2'
          />
          <path
            d='M381.448 164.09L164.09 381.448C159.132 376.49 154.787 372.144 150.697 368.055L368.055 150.697L381.448 164.09Z'
            fill='#F2F2F2'
          />
        </g>
        <defs>
          <filter
            id='filter0_d_137_19'
            x='17'
            y='27'
            width='466'
            height='466'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='10' />
            <feGaussianBlur stdDeviation='10' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_137_19'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_137_19'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    );
  } else if (props.gems === 'Classic') {
    return (
      <svg
        className='fill-current h-7 sm:h-16'
        viewBox='0 0 500 500'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_137_42)'>
          <g filter='url(#filter0_d_137_42)'>
            <path
              d='M463 249.726C463 253.201 461.816 256.658 459.43 259.48L261.117 481.599C258.788 484.127 255.805 485.671 252.68 486.229C250.909 486.551 249.091 486.551 247.32 486.229C244.129 485.661 241.08 484.061 238.731 481.428L40.8447 259.802C38.2784 256.932 37 253.334 37 249.726C37 246.118 38.2879 242.529 40.8447 239.66L238.731 18.0426C241.08 15.41 244.119 13.8097 247.32 13.2415C249.091 12.9195 250.909 12.9195 252.68 13.2415C255.814 13.8002 258.797 15.3343 261.127 17.8816L459.24 239.764C461.74 242.624 463 246.184 463 249.735V249.726Z'
              fill='#BAB8BC'
            />
            <path
              d='M333.645 249.726L252.68 486.23C250.909 486.551 249.091 486.551 247.32 486.23L166.355 249.726H333.655H333.645Z'
              fill='#DEDBE3'
              fillOpacity='0.62'
            />
            <path
              d='M333.645 249.726H166.346L247.32 13.2415C249.091 12.9195 250.909 12.9195 252.68 13.2415L292.528 129.642L299.772 150.797L304.147 163.581L326.316 228.315L333.645 249.735V249.726Z'
              fill='#767272'
            />
            <path
              d='M463 249.726C463 253.201 461.816 256.658 459.43 259.48L261.118 481.599C258.788 484.127 255.805 485.671 252.68 486.23L333.645 249.726H463Z'
              fill='#474549'
            />
            <path
              d='M247.32 486.23C244.129 485.661 241.08 484.061 238.731 481.428L40.8447 259.802C38.2784 256.932 37 253.334 37 249.726H166.355L247.32 486.23Z'
              fill='#646268'
            />
            <path
              d='M326.316 228.315L304.896 249.726H217.993L304.148 163.581L326.316 228.315Z'
              fill='#DFDFDF'
            />
            <path
              d='M299.772 150.797L200.834 249.726H172.453L292.528 129.642L299.772 150.797Z'
              fill='#DFDFDF'
            />
          </g>
        </g>
        <defs>
          <filter
            id='filter0_d_137_42'
            x='17'
            y='3'
            width='466'
            height='513.471'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='10' />
            <feGaussianBlur stdDeviation='10' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_137_42'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_137_42'
              result='shape'
            />
          </filter>
          <clipPath id='clip0_137_42'>
            <rect width='500' height='500' fill='white' />
          </clipPath>
        </defs>
      </svg>
    );
  } else {
    return (
      <svg
        className='fill-current h-7 sm:h-16'
        viewBox='0 0 500 500'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g filter='url(#filter0_d_137_161)'>
          <path
            d='M360.537 359.208L139.471 359.208L250 185.896L289.865 248.398L300.881 265.677L307.356 275.815L346.692 337.499L360.537 359.208Z'
            fill='url(#paint0_linear_137_161)'
          />
          <path
            d='M461.055 412.671L360.538 359.208L250 185.888V79.8491C254.721 79.8491 259.441 82.0643 262.346 86.5202L460.74 397.599C463.833 402.54 463.569 408.24 461.055 412.671Z'
            fill='url(#paint1_linear_137_161)'
          />
          <path
            d='M461.055 412.671C458.601 417.024 453.966 420.151 448.232 420.151H51.7758C46.0334 420.151 41.4071 417.016 38.9448 412.671L139.471 359.208H360.537L461.055 412.671Z'
            fill='url(#paint2_linear_137_161)'
          />
          <path
            d='M250 79.8491V185.896L139.472 359.217L38.9452 412.671C36.4148 408.198 36.1677 402.455 39.3456 397.48L237.57 86.665C240.475 82.1154 245.238 79.8491 250 79.8491Z'
            fill='url(#paint3_linear_137_161)'
          />
          <path
            d='M346.693 337.5L324.984 359.208H223.963L307.356 275.815L346.693 337.5Z'
            fill='white'
            fillOpacity='0.07'
          />
          <path
            d='M300.881 265.677L207.341 359.208H179.055L289.865 248.398L300.881 265.677Z'
            fill='white'
            fillOpacity='0.07'
          />
        </g>
        <defs>
          <filter
            id='filter0_d_137_161'
            x='17.0044'
            y='69.8491'
            width='465.996'
            height='380.302'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='10' />
            <feGaussianBlur stdDeviation='10' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_137_161'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_137_161'
              result='shape'
            />
          </filter>
          <linearGradient
            id='paint0_linear_137_161'
            x1='250'
            y1='180.5'
            x2='244'
            y2='359'
            gradientUnits='userSpaceOnUse'>
            <stop stopColor='#4A2F98' stopOpacity='0.59' />
            <stop offset='1' stopColor='#7D6B4B' stopOpacity='0.62' />
          </linearGradient>
          <linearGradient
            id='paint1_linear_137_161'
            x1='277.264'
            y1='53.6163'
            x2='443.828'
            y2='395.264'
            gradientUnits='userSpaceOnUse'>
            <stop stopColor='#3C2013' />
            <stop offset='0.46875' stopColor='#0D2B0D' />
            <stop offset='1' stopColor='#0D4935' />
          </linearGradient>
          <linearGradient
            id='paint2_linear_137_161'
            x1='69.8041'
            y1='409.322'
            x2='401.228'
            y2='397.82'
            gradientUnits='userSpaceOnUse'>
            <stop stopColor='#462770' />
            <stop offset='0.462682' stopColor='#201965' />
            <stop offset='1' stopColor='#085B4C' />
          </linearGradient>
          <linearGradient
            id='paint3_linear_137_161'
            x1='54.8945'
            y1='389.3'
            x2='260.224'
            y2='142.649'
            gradientUnits='userSpaceOnUse'>
            <stop stopColor='#40225C' />
            <stop offset='0.588187' stopColor='#68294E' />
            <stop offset='1' stopColor='#563D0F' />
          </linearGradient>
        </defs>
      </svg>
    );
  }
};