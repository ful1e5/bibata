'use client';

import React from 'react';

import Link from 'next/link';

type Props = {};

type CardProps = {
  imgUrl: string;
  link: string;
  name: string;
  role: string;
  special?: boolean;
  classes?: string;
};

// eslint-disable-next-line no-unused-vars
export const Heroes: React.FC<Props> = (_props) => {
  const Card: React.FC<CardProps> = (props) => {
    return (
      <Link target='_blank' href={props.link}>
        <span className='relative w-full mt-10 p-5 rounded-3xl bg-gradient-radial from-10% from-blue-300/[.03] via-40% via-orange-300/[.03] to-60% flex'>
          {props.special && (
            <div className='absolute blur-sm scale-105 opacity-50 w-52 sm:w-72 h-3/4 rounded-3xl bg-[linear-gradient(to_right,theme(colors.blue.600),theme(colors.orange.600),theme(colors.pink.600),theme(colors.blue.600))] bg-[length:200%_auto] animate-gradient' />
          )}
          <div className='w-52 sm:w-72 bg-black rounded-3xl overflow-hidden text-center drop-shadow-md backdrop-blur-md'>
            <img
              className={`saturate-150 brightness-105 ${props.classes || ''} `}
              src={props.imgUrl}
            />
            <div className='p-2 text-white'>
              <h4 className='font-bold'>{props.name}</h4>
              <p className={`mt-1 text-xs tracking-tighter uppercase`}>
                {props.role}
              </p>
            </div>
          </div>
        </span>
      </Link>
    );
  };

  const List: React.FC = () => {
    const counts = Array.from(new Array(5), (_, i) => i + 1);
    return (
      <>
        {counts.map((key) => (
          <div className='inline-flex' key={key}>
            <Card
              imgUrl='https://avatars.githubusercontent.com/u/24286590?v=4'
              link='https://github.com/ful1e5'
              name='Abdulkaiz Khatri'
              role='Founder'
              special={true}
            />
            <Card
              imgUrl='https://avatars.githubusercontent.com/u/9919?v=4'
              link='https://github.com/github'
              name='GitHub'
              role='Sponsor'
              classes='p-5'
            />
            <Card
              imgUrl='https://avatars.githubusercontent.com/u/107184?v=4'
              link='https://github.com/linuxmint'
              name='Linux Mint'
              role='Sponsor'
              classes='p-10'
            />

            <Card
              imgUrl='https://avatars.githubusercontent.com/u/5437803?v=4'
              link='https://github.com/yochananmarqos'
              name='Mark Wagie'
              role='Contributor'
            />
            <Card
              imgUrl='https://avatars.githubusercontent.com/u/22453358?v=4'
              link='https://github.com/shatur'
              name='Hennadii Chernyshchyk'
              role='Contributor'
            />
            <Card
              imgUrl='https://avatars.githubusercontent.com/u/584751?v=4'
              link='https://github.com/peterwu'
              name='Peter Wu'
              role='Contributor'
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className='relative flex flex-rows overflow-x-hidden'>
      <div className='animate-marquee whitespace-nowrap'>
        <List />
      </div>

      <div className='absolute top-0 animate-marquee2 whitespace-nowrap'>
        <List />
      </div>
    </div>
  );
};
