import { PrismaClient } from '@prisma/client';

import { DBUser } from 'bibata-live/misc';

const prisma = new PrismaClient();

export const addUser = async (user: DBUser) => {
  await prisma.user.upsert({
    where: { userId: user.userId },
    update: { role: user.role },
    create: { ...user }
  });
};
