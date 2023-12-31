'use client';

import React from 'react';

import { HeroesCard as Card } from './card';
import { HeroesSponsors as Sponsors } from './sponsors';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const HeroesElements: React.FC<Props> = (_props) => {
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
            role='One-time Sponsor'
            classes='p-5'
          />
          <Card
            imgUrl='https://avatars.githubusercontent.com/u/107184?v=4'
            link='https://github.com/linuxmint'
            name='Linux Mint'
            role='One-time Sponsor'
            classes='p-10'
          />

          <Sponsors />

          <Card
            imgUrl='https://avatars.githubusercontent.com/u/43558271?v=4'
            link='https://github.com/Silicasandwhich'
            name='Daniel Brown'
            role='Contributor'
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
