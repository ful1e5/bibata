import * as Figma from 'figma-api';
import { NextRequest, NextResponse } from 'next/server';

import { handleErrorWithFigma } from '@utils/figma/handle-error';

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

        if (color && typeof color === 'object') {
          Object.entries(color).forEach(([match, replace]) => {
            img = img.replace(new RegExp(`#${match}`, 'ig'), `#${replace}`);
          });
        }

        if (display) {
          img = img.replace(
            'width="256" height="256"',
            `preserveAspectRatio="xMaxYMid meet" width="100%" height="100%"`
          );
        } else if (size !== 0) {
          img = img.replace(
            'width="256" height="256"',
            `preserveAspectRatio="xMaxYMid meet" width="${size}" height="${size}"`
          );
        }

        return new Response(img, {
          headers: {
            'content-type': 'image/svg+xml',
            'Cache-Control':
              'public, max-age=360, s-maxage=360, stale-while-revalidate=360'
          }
        });
      }
    } catch (e) {
      handleErrorWithFigma(e);
    }
  } else {
    return NextResponse.json({
      status: 404,
      error: `The Neccessary 'id=${id}' slug was not found`
    });
  }
}