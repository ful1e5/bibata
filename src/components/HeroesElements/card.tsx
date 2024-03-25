'use client';

import React from 'react';

import Link from 'next/link';

type Props = {
  imgUrl: string;
  link: string;
  name: string;
  role: string;
  special?: boolean;
  classes?: string;
};

export const HeroesCard: React.FC<Props> = (props) => {
  return (
    <Link target='_blank' href={props.link}>
      <span className='relative w-full mt-10 p-5 rounded-3xl bg-gradient-radial from-10% from-blue-300/[.03] via-40% via-orange-300/[.03] to-60% flex'>
        {props.special && (
          <div className='absolute blur-sm sm:blur-md scale-105 opacity-50 w-52 sm:w-72 h-5/6 translate-y-1 rounded-3xl bg-[linear-gradient(to_right,theme(colors.blue.600),theme(colors.orange.600),theme(colors.pink.600),theme(colors.blue.600))] bg-[length:200%_auto] animate-gradient' />
        )}
        <div className='w-52 sm:w-72 bg-zinc-800 rounded-3xl overflow-hidden text-center drop-shadow-lg border border-white/[.1] '>
          <img
            alt={props.name}
            className={`saturate-150 brightness-105 ${props.classes || ''} `}
            src={props.imgUrl}
          />
          <div className='p-2 text-white'>
            <h4 className='font-light'>{props.name}</h4>
            <p className={`mt-1 text-lg font-bold uppercase`}>{props.role}</p>
          </div>
        </div>
      </span>
    </Link>
  );
};
