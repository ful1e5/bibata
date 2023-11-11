import { NextRequest, NextResponse } from 'next/server';
import { Redis } from 'ioredis';

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
  const redis = new Redis({ connectTimeout: 10000 });

  const deleteOldImageUrls = async () => {
    const keys = await redis.keys('i-*');
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`Deleted ${keys.length} URLs.`);
    }
  };

  const fetcher = new FetchSVG();
  await deleteOldImageUrls();
  try {
    for (const type of TYPES) {
      const svgs = await fetcher.fetchSVGs({ type });
      redis.del(type);
      redis
        .set(type, JSON.stringify(svgs))
        .then((v) => console.info(`Updated Type '${type}': ${v} `))
        .catch((e) => {
          if (e) {
            console.error(e);
            return { error: JSON.stringify(e) };
          }
        });

      let all_node_ids: string[] = [];
      for (let { node_ids } of svgs) {
        all_node_ids.push(node_ids.join(','));
      }
      const images = await fetcher.getSvgUrl(all_node_ids.join(','));

      if (images) {
        svgs.forEach(({ id, name, node_ids }) => {
          const urls = node_ids.map((nid) => images[nid]);
          if (urls) {
            redis
              .set(id, JSON.stringify(urls))
              .then((v) => console.info(`Updated '${name}': ${v} `))
              .catch((e) => {
                if (e) {
                  console.error(e);
                  return { error: JSON.stringify(e) };
                }
              });
          } else {
            const error = `[Figma API] Unable to fetch '${name}' locations.`;
            console.error(error);
            return { error };
          }
        });
      } else {
        return { error: `[Figma API] Unable to fetch '${type}' locations.` };
      }
    }

    redis.quit();
    return;
  } catch (_e) {
    // @ts-ignore
    let e: ApiError = _e;

    if (e?.response?.data) {
      const res = e.response.data;
      return {
        error: `[Figma API] ${res.err}`,
        status: res.status || 400
      };
    } else {
      // @ts-ignore
      const error = await _e.toJSON();
      return {
        error: `[Figma API] ${error.message}`,
        stack: error.stack,
        status: 504
      };
    }
  }
};
