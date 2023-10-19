import { NextRequest, NextResponse } from 'next/server';

import { ApiError } from 'figma-api/lib/utils';

import { FetchSVG } from '@utils/figma/fetch-svgs';

const MAX_RETRIES = 5;
let retryCount = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const p = request.nextUrl.searchParams;
  let display = false;
  let color: { [key: string]: string } = {};
  let size: number = 0;

  if (p.has('display')) {
    display = true;
  }

  if (!display) {
    if (p.has('size')) {
      size = Number(p.get('size')) || 0;
    }
  }

  if (p.has('color')) {
    color = JSON.parse(p.get('color') || '');
  }

  const api = new FetchSVG();
  const options = { color, size, display };

  if (id) {
    try {
      return await api.fetchImage(id, options);
    } catch (_e) {
      const e = _e as ApiError;

      if (e?.response?.data) {
        const res = e.response.data;

        if (res.status == 429 && retryCount < MAX_RETRIES) {
          const waitTime = Math.pow(2, retryCount) * 5000;
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          retryCount++;
          return await api.fetchImage(id, options);
        }

        return NextResponse.json({
          status: res.status,
          error: `[Figma API] ${res.err}`
        });
      } else {
        return NextResponse.json({
          status: 429,
          error: '[Figma API] Connection timeout!'
        });
      }
    }
  } else {
    return NextResponse.json({
      status: 404,
      error: `The Neccessary 'id=${id}' slug was not found`
    });
  }
}
