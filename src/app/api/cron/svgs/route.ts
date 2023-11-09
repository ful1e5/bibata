import { NextRequest, NextResponse } from 'next/server';
import { Redis } from 'ioredis';

import { FetchSVG } from '@utils/figma/fetch-svgs';

import { TYPES } from '@root/configs';
import { ApiError } from 'figma-api/lib/utils';

// eslint-disable-next-line no-unused-vars
export async function GET(_request: NextRequest) {
  const response = await update();
  return NextResponse.json(
    { fetchAt: Date.now(), ...response },
    { status: 200 }
  );
}

const update = async () => {
  const redis = new Redis();
  const fetcher = new FetchSVG();

  try {
    for (const type of TYPES) {
      const svgs = await fetcher.fetchSVGs({ type });
      redis
        .set(type, JSON.stringify(svgs))
        .then((v) => console.info(`Updated Type '${type}': ${v} `))
        .catch((e) => {
          console.error(e);
          return { error: JSON.stringify(e) };
        });

      let all_ids: string[] = [];
      for (let { ids } of svgs) {
        all_ids.push(ids.join(','));
      }
      const images = await fetcher.getSvgUrl(all_ids.join(','));

      if (images) {
        svgs.forEach(({ name, ids }) => {
          const urls = ids.map((id) => images[id]);
          if (urls) {
            redis
              .set(name, JSON.stringify(urls))
              .then((v) => console.info(`Updated '${name}': ${v} `))
              .catch((e) => {
                console.error(e);
                return { error: JSON.stringify(e) };
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
