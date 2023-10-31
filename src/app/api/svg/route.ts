import { NextRequest, NextResponse } from 'next/server';

import { FetchSVG } from '@utils/figma/fetch-svgs';
import { figmaAPIError } from '@utils/figma/handle-error';

import { RESPONSES as res } from '@api/config';
import { TYPES } from '@root/configs';

export async function GET(request: NextRequest) {
  if (request.method === 'GET') {
    const type = request.nextUrl.searchParams.get('type');

    const api = new FetchSVG();

    if (type) {
      if (TYPES.includes(type)) {
        try {
          const svgs = await api.fetchSVGs({ type });
          return NextResponse.json({ error: null, data: svgs });
        } catch (e) {
          return figmaAPIError(e);
        }
      } else {
        return NextResponse.json(
          { error: `No images found for '${type}'` },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid Request. The 'type' parameter is missing" },
        { status: 400 }
      );
    }
  } else {
    return res.invalid_method;
  }
}
