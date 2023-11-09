import { DownloadCounts } from 'bibata/misc';

export const getDownloadCounts = async (token?: string) => {
  let headers = undefined;
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`
    };
  }
  const res = await fetch('/api/db/download/count', { headers });

  const data = await res.json();
  return data as DownloadCounts;
};
