import { SPONSOR_API_ENDPOINT } from '@root/configs';

export const isSponsor = async (login: string) => {
  return await fetch(`${SPONSOR_API_ENDPOINT}?login=${login}`, {
    next: { revalidate: 360 }
  })
    .then((res) => res.json())
    .then((json) => json.is_sponsor);
};
