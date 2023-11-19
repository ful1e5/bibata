import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

import { RESPONSES as res } from '@api/config';

type Param = { params: { id: string } };

type Body = {
  colors: {
    [key: string]: string;
  };
  frames: string[];
};

export async function POST(request: NextRequest, { params }: Param) {
  if (request.method === 'POST') {
    const id = params.id;
    const p = request.nextUrl.searchParams;

    const body = (await request.json()) as Body;

    let size: number = 256;
    if (p.has('size')) size = Number(p.get('size')) || size;

    if (id) {
      try {
        const colors = body.colors;
        const frames = body.frames;
        if (!frames) return res.image_not_found;

        const data: string[] = [];

        for (let i = 0; i < body.frames.length; i++) {
          let img = body.frames[i];
          if (img) {
            if (colors && typeof colors === 'object') {
              Object.entries(colors).forEach(([match, replace]) => {
                img = img!.replace(new RegExp(match, 'ig'), replace);
              });
            }

            const buffer = await sharp(Buffer.from(img))
              .resize(size, size)
              .png()
              .toBuffer()
              .catch((e) => {
                return NextResponse.json({
                  error: `Unable to convert to PNG`,
                  stack: e
                });
              });

            if (buffer) {
              data.push(`data:image/png;base64,${buffer.toString('base64')}`);
            } else {
              return NextResponse.json({
                error: `Unable to convert 'frames[${i}]' to PNG`
              });
            }
          }
        }

        if (data) {
          return NextResponse.json({ data });
        } else {
          return res.image_not_found;
        }
      } catch (e) {
        return res.internal_error(e);
      }
    } else {
      return NextResponse.json({ error: 'SVG id not found' }, { status: 404 });
    }
  } else {
    return res.invalid_method;
  }
}
