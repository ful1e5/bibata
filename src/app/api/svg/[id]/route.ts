import { NextRequest, NextResponse } from 'next/server';

import * as Figma from 'figma-api';
import { ApiError } from 'figma-api/lib/utils';

interface ParamColor {
  [key: string]: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const p = request.nextUrl.searchParams;
  let display = false;
  let color: ParamColor = {};

  if (p.has('display')) {
    display = true;
  }

  if (p.has('color')) {
    color = JSON.parse(p.get('color') || '');
  }

  if (id) {
    try {
      const token = process.env.FIGMA_TOKEN as string;
      const api = new Figma.Api({ personalAccessToken: token });

      const key = process.env.FIGMA_FILE as string;

      const { images } = await api.getImage(key, {
        ids: id,
        scale: 1,
        format: 'svg'
      });

      let img = '';
      if (typeof images === 'object' && images[id]) {
        await fetch(images[id] || '', { next: { revalidate: 360 } })
          .then((res) => res.text())
          .then((t) => (img = t));

        if (display) {
          img = img.replace(
            'width="256" height="256"',
            `preserveAspectRatio="xMaxYMid meet" width="100%" height="100%"`
          );
        }

        if (color) {
          Object.entries(color).forEach(([match, replace]) => {
            img = img.replace(new RegExp(`#${match}`, 'ig'), `#${replace}`);
          });
        }

        return new Response(img, {
          headers: {
            'content-type': 'image/svg+xml',
            'Cache-Control': `public, immutable, no-transform, s-maxage=1, stale-while-revalidate=360`
          }
        });
      }
    } catch (_e) {
      // @ts-ignore
      let e: ApiError = _e;
      const res = e.response.data;
      return NextResponse.json({
        status: res.status,
        error: `[Figma API] ${res.err}`
      });
    }
  } else {
    return NextResponse.json({
      status: 404,
      error: `The Neccessary 'id=${id}' slug was not found`
    });
  }
}
