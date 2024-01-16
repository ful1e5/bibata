'use client';

import React from 'react';
import useSWR from 'swr';

import { HeroesCard as Card } from './card';

import { getSponsors, url } from '@utils/sponsor/get-sponsors';

import { Sponsor } from 'bibata/misc';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const HeroesSponsors: React.FC<Props> = (_props) => {
  const { data, isLoading } = useSWR<Sponsor[]>(url, () => getSponsors());
  const specialTier = [
    // "basic",
    // "standard",
    'professional',
    'premium',
    'elite',
    'diamond'
  ];

  if (isLoading || !data) return <></>;

  return (
    <>
      {data.map((e) => (
        <Card
          key={e.login}
          imgUrl={e.avatarUrl}
          link={e.url}
          name={e.name || `@${e.login}`}
          role={`${e.tier} Sponsor`}
          special={specialTier.includes[e.tier]}
        />
      ))}
    </>
  );
};
