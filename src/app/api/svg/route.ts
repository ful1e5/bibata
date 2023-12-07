import { NextRequest, NextResponse } from 'next/server';

import { ImageRedis } from '@services/kv';

import { TYPES, VERSIONS } from '@root/configs';
import { RESPONSES as res } from '@api/config';

import { SVG } from 'bibata/app';

export async function GET(request: NextRequest) {
  if (request.method === 'GET') {
    const type = request.nextUrl.searchParams.get('type');
    const version = request.nextUrl.searchParams.get('v');

    if (!type) {
      return NextResponse.json(
        { error: "Invalid Request. The 'type' parameter is missing" },
        { status: 400 }
      );
    }

    if (!version || !VERSIONS.includes(version)) {
      return NextResponse.json(
        {
          error: `Sorry, unable to retrieve the v${version} Cursor Bitmaps. Please try again later.`
        },
        { status: 400 }
      );
    }

    if (TYPES.includes(type)) {
      try {
        const redis = new ImageRedis();
        const key = `${type}:${version}`;
        const data = (await redis.get(key)) as SVG[] | null;

        const error =
          !data || data.length === 0
            ? `Oops! It looks like there's a little hiccup fetching the ${type} v${version} SVG nodes right now.`
            : null;

        return NextResponse.json(
          { error, data },
          { status: error ? 404 : 200 }
        );
      } catch (e) {
        return res.internal_error(e);
      }
    } else {
      return NextResponse.json(
        { error: `No images found for '${type}'` },
        { status: 404 }
      );
    }
  } else {
    return res.invalid_method;
  }
}
