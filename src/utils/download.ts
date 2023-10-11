import { CoreApi } from '@utils/core';

import { CoreImage, CorePlatform } from 'bibata-live';

export const download = async (
  api: CoreApi,
  images: Set<CoreImage>,
  platform: CorePlatform
) => {
  await api.getSession();
  const data = await api.uploadImages(images, platform);
  console.log(data);

  // await core.destroySession();
};
