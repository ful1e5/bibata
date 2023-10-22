import useSWR from 'swr';

export const useIsSponsor = (login: string) => {
  const fetcher = (url: string) =>
    fetch(url, { next: { revalidate: 360 } })
      .then((res) => res.json())
      .then((json) => json.is_sponsor);

  return useSWR<boolean>(
    `https://sponsor-spotlight.vercel.app/api/fetch?login=${login}`,
    fetcher
  );
};
