import { NextRequest, NextResponse } from 'next/server';

import { ImageRedis } from '@services/kv';

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

  const version = request.nextUrl.searchParams.get('v');
  const type = request.nextUrl.searchParams.get('type');
  const response = await update(type, version);

  return NextResponse.json(
    { fetchAt: Date.now(), ...response },
    { status: 200 }
  );
}

const update = async (type: string | null, version: string | null) => {
  if (!type) {
    return { error: `Invalid type: ${type}` };
  }
  if (!TYPES.includes(type)) {
    return { error: `${type} is not available` };
  }

  const fetcher = new FetchSVG();

  try {
    const redis = new ImageRedis();

    const svgs = await fetcher.fetchSVGs({ type, version });
    if (!svgs) {
      return { error: 'Something went wrong. SVGs. not found' };
    }

    const key = `${type}:${version}`;
    await redis.del(key);
    await redis.saveSVGs(key, svgs);

    return;
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message, stack: e, status: 504 };
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
