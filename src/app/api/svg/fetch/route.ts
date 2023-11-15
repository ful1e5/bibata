import { NextRequest, NextResponse } from 'next/server';

import { ImageRedis } from '@services/redis';

import { FetchSVG } from '@utils/figma/fetch-svgs';

import { TYPES } from '@root/configs';

import { ApiError } from 'figma-api/lib/utils';

export async function GET(request: NextRequest) {
  if (
    request.headers.get('Authorization') !==
    `Bearer ${process.env.SVG_FETCH_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const response = await update();

  return NextResponse.json(
    { fetchAt: Date.now(), ...response },
    { status: 200 }
  );
}

const update = async () => {
  const fetcher = new FetchSVG();
  try {
    const redis = new ImageRedis();
    await redis.rmOldUrls();

    for (const type of TYPES) {
      const svgs = await fetcher.fetchSVGs({ type });
      await redis.del(type);

      redis.saveSVGs(type, svgs);

      let all_node_ids: string[] = [];
      for (let { node_ids } of svgs) {
        all_node_ids.push(node_ids.join(','));
      }
      const images = await fetcher.getSvgUrl(all_node_ids.join(','));

      if (images) {
        for (let { id, name, node_ids } of svgs) {
          const urls = node_ids.map((nid) => images[nid]);
          if (urls) {
            await redis.saveUrls(id, name, urls);
          } else {
            return {
              error: `[Figma API] Unable to fetch '${name}' locations.`
            };
          }
        }
      } else {
        return { error: `[Figma API] Unable to fetch '${type}' locations.` };
      }
    }

    await redis.client.quit();
    return;
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message, status: 504 };
    }

    if (e instanceof ApiError) {
      if (e.response.data) {
        const res = e.response.data;
        return {
          error: `[Figma API] ${res.err}`,
          status: res.status || 400
        };
      }
    }

    return {
      error: 'Internal Server Error',
      stack: JSON.stringify(e),
      status: 504
    };
  }
};
