import { NextRequest, NextResponse } from 'next/server';

import { ImageRedis } from '@services/redis';

import { TYPES } from '@root/configs';
import { RESPONSES as res } from '@api/config';

import { SVG } from 'bibata/app';

export async function GET(request: NextRequest) {
  if (request.method === 'GET') {
    const type = request.nextUrl.searchParams.get('type');

    if (type) {
      if (TYPES.includes(type)) {
        try {
          const redis = new ImageRedis();
          const data: SVG[] = await redis
            .get(type)
            .then((s) => JSON.parse(s || '[]'));

          const error =
            data.length === 0
              ? "Oops! It looks like there's a little hiccup fetching the SVG nodes right now."
              : null;

          await redis.client.quit();
          return NextResponse.json(
            { error, data },
            { status: error ? 404 : 200 }
          );
        } catch (e) {
          console.error(e);
          return res.internal_error;
        }
      } else {
        return NextResponse.json(
          { error: `No images found for '${type}'` },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid Request. The 'type' parameter is missing" },
        { status: 400 }
      );
    }
  } else {
    return res.invalid_method;
  }
}
