import { ApiError } from 'figma-api/lib/utils';
import { NextResponse } from 'next/server';

export const handleErrorWithFigma = (_e: any) => {
  // @ts-ignore
  let e: ApiError = _e;

  if (e?.response?.data) {
    const res = e.response.data;
    return NextResponse.json({
      status: res.status,
      error: `[Figma API] ${res.err}`
    });
  } else {
    return NextResponse.json({
      status: 500,
      error: `[Figma API] Connect Timeout Error`
    });
  }
};
