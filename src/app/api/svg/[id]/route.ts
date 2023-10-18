import * as Figma from 'figma-api';
import { ApiError } from 'figma-api/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

interface ParamColor {
  [key: string]: string;
}

const MAX_RETRIES = 5;
let retryCount = 0;

const getImage = async (
  id: string,
  options: { color: ParamColor; size: number; display: boolean }
) => {
  const { color, size, display } = options;

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
        'width="100%" height="100%"'
        // `preserveAspectRatio="xMaxYMid meet" width="100%" height="100%"`
      );
    } else if (size !== 0) {
      img = img.replace(
        'width="256" height="256"',
        `preserveAspectRatio="xMaxYMid meet" width="${size}" height="${size}"`
      );
    }
  }

  return new NextResponse(img, {
    headers: {
      'content-type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};

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

  const options = { color, size, display };
  if (id) {
    try {
      return await getImage(id, options);
    } catch (_e) {
      const e = _e as ApiError;

      if (e?.response?.data) {
        const res = e.response.data;

        if (res.status == 429 && retryCount < MAX_RETRIES) {
          const waitTime = Math.pow(2, retryCount) * 1000;
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          retryCount++;
          return await getImage(id, options);
        }
        return NextResponse.json({
          status: res.status,
          error: `[Figma API] ${res.err}`
        });
      } else {
        return NextResponse.json({
          status: 429,
          error:
            '[Figma API] Connection timeout and maximum retrieval rate excited.'
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
