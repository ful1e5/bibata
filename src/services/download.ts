import { Platform, Type } from '@prisma/client';

import prisma from './prisma';

export type AddDownloadData = {
  id: string | null;
  data: {
    platform: Platform;
    type: Type;
    baseColor: string;
    outlineColor: string;
    watchBGColor: string;
  };
};

export const getIndex = async (id?: AddDownloadData['id']) => {
  const maxIndex = await prisma.download.findFirst({
    where: { userId: id },
    select: { index: true },
    orderBy: { index: 'desc' }
  });

  return maxIndex?.index || 0;
};

export const addDownload = async ({ id, data }: AddDownloadData) => {
  const index = (await getIndex(id)) + 1;
  if (id) {
    return await prisma.download.create({
      data: { index, ...data, user: { connect: { id } } }
    });
  } else {
    return await prisma.download.create({ data: { index, ...data } });
  }
};
