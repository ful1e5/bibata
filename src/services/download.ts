import prisma from './prisma';

import { DBDownload } from 'bibata-live/misc';

export const addDownload = async (data: DBDownload) => {
  return await prisma.download.create({
    data: {
      baseColor: data.baseColor,
      outlineColor: data.outlineColor,
      watchBGColor: data.watchBGColor,
      user: { connect: { userId: data.userId } }
    }
  });
};
