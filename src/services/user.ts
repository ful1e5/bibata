import prisma from './prisma';

import { DBUser } from 'bibata-live/db';

export const upsertUser = async (user: DBUser) => {
  return await prisma.user.upsert({
    where: { userId: user.userId },
    update: { role: user.role },
    create: { ...user }
  });
};

export const getUserTotalDownloads = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { totalDownloadCount: true }
  });
  return user?.totalDownloadCount;
};
