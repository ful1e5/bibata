import { NextRequest, NextResponse } from 'next/server';
import { Redis } from 'ioredis';

import { RESPONSES as res } from '@api/config';
import { TYPES } from '@root/configs';
import { SVG } from 'bibata/app';

export async function GET(request: NextRequest) {
  if (request.method === 'GET') {
    const type = request.nextUrl.searchParams.get('type');

    if (type) {
      if (TYPES.includes(type)) {
        const redis = new Redis({ connectTimeout: 10000 });
        const data: SVG[] = await redis
          .get(type)
          .then((s) => JSON.parse(s || '[]'));
        redis.quit();

        const error = data.length === 0 ? 'Unable to fetch SVG nodes' : null;

        return NextResponse.json(
          { error, data },
          { status: error ? 404 : 200 }
        );
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
