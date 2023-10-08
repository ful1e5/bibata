import { NextRequest, NextResponse } from 'next/server';

import { FetchSVG } from '@utils/figma/fetch-svgs';
import { handleErrorWithFigma } from '@utils/figma/handle-error';
import { TYPES } from '@root/configs';

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type');

  const api = new FetchSVG();

  if (type) {
    if (TYPES.includes(type)) {
      try {
        const svgs = await api.fetchSVGs({ type });
        return NextResponse.json({ error: null, data: svgs });
      } catch (e) {
        handleErrorWithFigma(e);
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
