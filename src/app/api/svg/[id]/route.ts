import { NextRequest, NextResponse } from 'next/server';

import { Redis } from 'ioredis';
import { FetchSVG } from '@utils/figma/fetch-svgs';

import { RESPONSES as res } from '@api/config';

type Param = { params: { id: string } };

const NOT_FOUND = NextResponse.json(
  { error: 'Image not found' },
  { status: 404 }
);

export async function GET(request: NextRequest, { params }: Param) {
  if (request.method === 'GET') {
    const id = params.id;
    const p = request.nextUrl.searchParams;

    let color: { [key: string]: string } = {};
    let size: number = 256;

    if (p.has('size')) size = Number(p.get('size')) || 256;

    if (p.has('color')) color = JSON.parse(p.get('color') || '');

    const options = { color, size };

    if (id) {
      try {
        const redis = new Redis({ connectTimeout: 10000 });
        const api = new FetchSVG();

        const raw = await redis.get(id);
        redis.quit();
        if (!raw) return NOT_FOUND;

        const urls: string[] = JSON.parse(raw);
        if (!urls) return NOT_FOUND;

        const data: string[] = [];

        for (const url of urls) {
          const img = await api.generateImage(url, options);
          data.push(`data:image/png;base64,${img!.toString('base64')}`);
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
