import prisma from './prisma';

import { DBUser } from 'bibata-live/misc';

export const upsertUser = async (user: DBUser) => {
  return await prisma.user.upsert({
    where: { userId: user.userId },
    update: { role: user.role },
    create: { ...user }
  });
};
