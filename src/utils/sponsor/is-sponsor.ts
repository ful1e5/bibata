export const isSponsor = async (login: string) => {
  return await fetch(
    `https://sponsor-spotlight.vercel.app/api/fetch?login=${login}`,
    { next: { revalidate: 360 } }
  )
    .then((res) => res.json())
    .then((json) => json.is_sponsor);
};
