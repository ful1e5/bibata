import { NextRequest, NextResponse } from 'next/server';

import { ApiError } from 'figma-api/lib/utils';

import { fetchSVGs } from '@utils/fetch-svgs';

import { BIBATA_TYPES } from '@root/configs';

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type');

  if (type) {
    if (BIBATA_TYPES.includes(type)) {
      try {
        const svgs = await fetchSVGs({ type });
        return NextResponse.json({ error: null, data: svgs });
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
        error: `The specified 'type=${type}' was not found`
      });
    }
  } else {
    return NextResponse.json({
      status: 400,
      error: "Inavalid parameter, Unable to find parameter 'type'"
    });
  }
}
