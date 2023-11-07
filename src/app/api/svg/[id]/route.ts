import { NextRequest, NextResponse } from 'next/server';

import { FetchSVG } from '@utils/figma/fetch-svgs';
import { figmaAPIError } from '@utils/figma/handle-error';

import { RESPONSES as res } from '@api/config';

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

    const api = new FetchSVG();
    const options = { color, size, display };

    if (id) {
      try {
        return await api.fetchImage(id, options);
      } catch (e) {
        return figmaAPIError(e);
      }
    } else {
      return NextResponse.json({ error: `SVG id not found` }, { status: 404 });
    }
  } else {
    return res.invalid_method;
  }
}
