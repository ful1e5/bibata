'use client';

import React from 'react';

type Props = {
  size?: number;
};

export const ProBadge: React.FC<Props> = (props) => {
  return (
    <svg
      width={props.size || 30}
      height={props.size || 30}
      viewBox='0 0 30 30'
      className='fill-current'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M23.1 4.33333H4.9C3.46406 4.33333 2.3 5.52724 2.3 7V11C2.3 12.4728 3.46406 13.6667 4.9 13.6667H23.1C24.5359 13.6667 25.7 12.4728 25.7 11V7C25.7 5.52724 24.5359 4.33333 23.1 4.33333ZM4.9 3C2.74609 3 1 4.79086 1 7V11C1 13.2091 2.74609 15 4.9 15H23.1C25.2539 15 27 13.2091 27 11V7C27 4.79086 25.2539 3 23.1 3H4.9Z'
      />
      <path d='M8.06728 5.74074C8.55403 5.74074 8.98251 5.83025 9.35271 6.00926C9.72291 6.1821 10.0074 6.4321 10.2062 6.75926C10.4119 7.08025 10.5147 7.45062 10.5147 7.87037C10.5147 8.28395 10.4085 8.64815 10.1959 8.96296C9.98342 9.27778 9.68521 9.52161 9.30129 9.69444C8.91738 9.86728 8.47519 9.9537 7.97473 9.9537H6.88469C6.85042 9.9537 6.83328 9.96914 6.83328 10V12.0833C6.83328 12.1265 6.81957 12.1605 6.79214 12.1852C6.76472 12.2099 6.72702 12.2222 6.67903 12.2222H5.05425C5.00626 12.2222 4.96856 12.2099 4.94113 12.1852C4.91371 12.1605 4.9 12.1265 4.9 12.0833V5.87963C4.9 5.83642 4.91371 5.80247 4.94113 5.77778C4.96856 5.75309 5.00626 5.74074 5.05425 5.74074H8.06728ZM7.7485 8.56482C8.00216 8.56482 8.2044 8.50617 8.35522 8.38889C8.5129 8.26543 8.59174 8.10494 8.59174 7.90741C8.59174 7.7037 8.5129 7.54012 8.35522 7.41667C8.2044 7.29321 8.00216 7.23148 7.7485 7.23148H6.88469C6.85042 7.23148 6.83328 7.24691 6.83328 7.27778V8.51852C6.83328 8.54938 6.85042 8.56482 6.88469 8.56482H7.7485Z' />
      <path d='M14.8812 12.2222C14.792 12.2222 14.7338 12.1883 14.7063 12.1204L13.5752 9.76852C13.5615 9.74383 13.5409 9.73148 13.5135 9.73148H13.0816C13.0473 9.73148 13.0301 9.74691 13.0301 9.77778V12.0833C13.0301 12.1265 13.0164 12.1605 12.989 12.1852C12.9616 12.2099 12.9239 12.2222 12.8759 12.2222H11.2511C11.2031 12.2222 11.1654 12.2099 11.138 12.1852C11.1106 12.1605 11.0969 12.1265 11.0969 12.0833V5.87963C11.0969 5.83642 11.1106 5.80247 11.138 5.77778C11.1654 5.75309 11.2031 5.74074 11.2511 5.74074H14.367C14.8332 5.74074 15.2411 5.82716 15.5907 6C15.9472 6.17284 16.2214 6.41667 16.4134 6.73148C16.6122 7.04012 16.7116 7.39815 16.7116 7.80556C16.7116 8.21296 16.5985 8.57099 16.3723 8.87963C16.1529 9.1821 15.8478 9.40432 15.457 9.5463C15.4228 9.55864 15.4125 9.58025 15.4262 9.61111L16.7322 12.0556C16.7459 12.0926 16.7527 12.1142 16.7527 12.1204C16.7527 12.1512 16.739 12.1759 16.7116 12.1944C16.6842 12.213 16.6499 12.2222 16.6088 12.2222H14.8812ZM13.0816 7.23148C13.0473 7.23148 13.0301 7.24691 13.0301 7.27778V8.36111C13.0301 8.39198 13.0473 8.40741 13.0816 8.40741H14.0482C14.2676 8.40741 14.4458 8.35494 14.5829 8.25C14.7201 8.13889 14.7886 7.99691 14.7886 7.82407C14.7886 7.64506 14.7201 7.50309 14.5829 7.39815C14.4458 7.28704 14.2676 7.23148 14.0482 7.23148H13.0816Z' />
      <path d='M20.2104 12.3333C19.6414 12.3333 19.1375 12.2315 18.6987 12.0278C18.2668 11.8179 17.9309 11.5278 17.6909 11.1574C17.451 10.7809 17.331 10.3457 17.331 9.85185V8.11111C17.331 7.62963 17.451 7.2037 17.6909 6.83333C17.9309 6.46296 18.2668 6.17593 18.6987 5.97222C19.1375 5.76852 19.6414 5.66667 20.2104 5.66667C20.7862 5.66667 21.2901 5.76852 21.722 5.97222C22.1608 6.17593 22.5001 6.46296 22.7401 6.83333C22.98 7.2037 23.1 7.62963 23.1 8.11111V9.85185C23.1 10.3457 22.98 10.7809 22.7401 11.1574C22.5001 11.5278 22.1608 11.8179 21.722 12.0278C21.2901 12.2315 20.7862 12.3333 20.2104 12.3333ZM20.2104 10.8426C20.4983 10.8426 20.728 10.7593 20.8994 10.5926C21.0776 10.4198 21.1667 10.1914 21.1667 9.90741V8.09259C21.1667 7.80864 21.0776 7.58333 20.8994 7.41667C20.728 7.24383 20.4983 7.15741 20.2104 7.15741C19.9293 7.15741 19.6996 7.24383 19.5214 7.41667C19.35 7.58333 19.2643 7.80864 19.2643 8.09259V9.90741C19.2643 10.1914 19.35 10.4198 19.5214 10.5926C19.6996 10.7593 19.9293 10.8426 20.2104 10.8426Z' />
    </svg>
  );
};