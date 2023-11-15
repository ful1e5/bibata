import { NextRequest, NextResponse } from 'next/server';

import { ImageRedis } from '@services/redis';
import { FetchSVG } from '@utils/figma/fetch-svgs';

import { RESPONSES as res } from '@api/config';

type Param = { params: { id: string } };

export async function GET(request: NextRequest, { params }: Param) {
  if (request.method === 'GET') {
    const id = params.id;
    const p = request.nextUrl.searchParams;

    let color: { [key: string]: string } = {};
    if (p.has('color')) color = JSON.parse(p.get('color') || '');

    let size: number = 256;
    if (p.has('size')) size = Number(p.get('size')) || size;

    if (id) {
      try {
        const redis = new ImageRedis();
        const raw = await redis.get(id);

        if (!raw) return res.image_not_found;

        const urls: string[] = JSON.parse(raw);
        if (!urls) return res.image_not_found;

        const data: string[] = [];

        const api = new FetchSVG();
        for (const url of urls) {
          const img = await api.generateImage(url, { color, size });
          data.push(`data:image/png;base64,${img!.toString('base64')}`);
        }

        await redis.client.quit();
        if (data) {
          return NextResponse.json({ data });
        } else {
          return res.image_not_found;
        }
      } catch (e) {
        console.error(e);
        return res.internal_error;
      }
    } else {
      return NextResponse.json({ error: 'SVG id not found' }, { status: 404 });
    }
  } else {
    return res.invalid_method;
  }
}
