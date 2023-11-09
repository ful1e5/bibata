import { NextRequest, NextResponse } from 'next/server';

import { Redis } from 'ioredis';
import { FetchSVG } from '@utils/figma/fetch-svgs';

import { RESPONSES as res } from '@api/config';

type Param = { params: { name: string } };

const NOT_FOUND = NextResponse.json(
  { error: 'Image not found' },
  { status: 404 }
);

export async function GET(request: NextRequest, { params }: Param) {
  if (request.method === 'GET') {
    const name = params.name;
    const p = request.nextUrl.searchParams;

    let display = false;
    let color: { [key: string]: string } = {};
    let size: number = 0;

    if (p.has('display')) display = true;

    if (!display) {
      if (p.has('size')) size = Number(p.get('size')) || 0;
    }

    if (p.has('color')) color = JSON.parse(p.get('color') || '');

    const options = { color, size, display };

    if (name) {
      try {
        const redis = new Redis({ connectTimeout: 10000 });
        const api = new FetchSVG();

        const raw = await redis.get(name);
        if (!raw) return NOT_FOUND;

        const urls: string[] = JSON.parse(raw);
        if (!urls) return NOT_FOUND;

        const data: string[] = [];

        for (const url of urls) {
          const img = await api.generateImage(url, options);
          data.push(img);
        }

        if (data) {
          return NextResponse.json({ data });
        } else {
          return NOT_FOUND;
        }
      } catch (e) {
        return NextResponse.json({ error: JSON.stringify(e) }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'SVG id not found' }, { status: 404 });
    }
  } else {
    return res.invalid_method;
  }
}
