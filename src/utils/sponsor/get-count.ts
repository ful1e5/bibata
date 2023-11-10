import { DownloadCounts } from 'bibata/misc';

export const getDownloadCounts = async (token?: string) => {
  // eslint-disable-next-line no-undef
  let headers: HeadersInit | undefined = undefined;
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`
    };
  }
  const res = await fetch('/api/db/download/count', { headers });

  const data = await res.json();
  return data as DownloadCounts;
};
