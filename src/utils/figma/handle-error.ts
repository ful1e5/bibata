import { NextResponse } from 'next/server';

import { ApiError } from 'figma-api/lib/utils';

export const figmaAPIError = (_e: any) => {
  // @ts-ignore
  let e: ApiError = _e;

  if (e?.response?.data) {
    const res = e.response.data;
    return NextResponse.json(
      { error: `[Figma API] ${res.err}` },
      { status: res.status || 400 }
    );
  } else {
    return NextResponse.json(
      { error: '[Figma API] Connection Timeout' },
      { status: 504 }
    );
  }
};
