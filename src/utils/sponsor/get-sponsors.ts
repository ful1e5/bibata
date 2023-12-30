import { SPONSOR_API_ENDPOINT } from '@root/configs';

import { Sponsor } from 'bibata/misc';

export const url = `${SPONSOR_API_ENDPOINT}?tier=standard&include_max_tiers=true`;

export const getSponsors = async () => {
  const res = await fetch(url);

  const data = await res.json();
  return data.sponsors as Sponsor[];
};
