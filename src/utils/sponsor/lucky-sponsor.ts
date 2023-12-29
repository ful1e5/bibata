import { SPONSOR_API_ENDPOINT } from '@root/configs';

import { LuckySponsor } from 'bibata/misc';

export const url = `${SPONSOR_API_ENDPOINT}?single=true`;
export const getLuckySponsor = async () => {
  const res = await fetch(url);

  const data = await res.json();
  return data as LuckySponsor;
};
