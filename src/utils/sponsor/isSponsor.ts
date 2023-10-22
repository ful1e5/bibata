export const isSponsor = async (login: string) => {
  const res = await fetch(
    `https://sponsor-spotlight.vercel.app/api/fetch?login=${login}`,
    {
      next: { revalidate: 360 }
    }
  );
  const data = await res.json();
  return data.is_sponsor as boolean;
};
