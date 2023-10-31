import { Role } from '@prisma/client';

import prisma from './prisma';

export type AddUserData = {
  id?: string;
  userId: string;
  login: string;
  name: string | null;
  email: string | null;
  url: string;
  avatarUrl: string;

  role: Role;
  index?: number;
  totalDownloadCount: number | null;
};

export const upsertUser = async (user: AddUserData) => {
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
