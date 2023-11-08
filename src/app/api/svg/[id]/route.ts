import { NextRequest, NextResponse } from 'next/server';

import { FetchSVG } from '@utils/figma/fetch-svgs';

import { RESPONSES as res } from '@api/config';
import { Redis } from 'ioredis';

type Param = { params: { id: string } };

export async function GET(request: NextRequest, { params }: Param) {
  if (request.method === 'GET') {
    const id = params.id;
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

    if (id) {
      try {
        const redis = new Redis();
        const api = new FetchSVG();

        const url = await redis.get(id);
        const img = await api.fetchImage(url!, options);

        if (img) {
          return new NextResponse(img, {
            headers: {
              'content-type': 'image/svg+xml',
              'Cache-Control': 'public, max-age=3600'
            }
          });
        } else {
          return NextResponse.json(
            { error: 'Image not found' },
            { status: 404 }
          );
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
