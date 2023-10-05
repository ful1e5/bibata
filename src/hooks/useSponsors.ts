import useSWR from 'swr';

export interface Sponsor {
  login: string;
  url: string;
}

export const useSponsors = (author: string) => {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((json) => json.data);

  return useSWR<Sponsor[]>(
    `https://sponsor-spotlight.vercel.app/api/fetch?login=${author}`,
    fetcher
  );
};
