import { SPONSOR_API_ENDPOINT } from '@root/configs';

import { LuckySponsor } from 'bibata-live/misc';

export const getLuckySponsor = async () => {
  const res = await fetch(`${SPONSOR_API_ENDPOINT}?single=true`);

  const data = await res.json();
  return data as LuckySponsor;
};
