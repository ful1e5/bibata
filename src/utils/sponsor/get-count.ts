import { Goals } from 'bibata-live/misc';

export const getSponsorshipGoals = async () => {
  const res = await fetch(
    'https://sponsor-spotlight.vercel.app/api/fetch?goals=true'
  );

  const data = await res.json();
  return data.goals as Goals;
};
