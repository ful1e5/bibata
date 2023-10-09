import { NextRequest, NextResponse } from 'next/server';

import { PLATFORMS } from '@root/configs';

export async function GET(
  request: NextRequest,
  { params }: { params: { platform: string } }
) {
  const platform = params.platform;
  const platforms = Object.keys(PLATFORMS);

  if (platforms.includes(platform)) {
    return NextResponse.json({
      success: true
    });
  } else {
    return NextResponse.json({
      status: 400,
      error: `Unsupported platform. The route must be one of '[${platforms.join(
        ', '
      )}]', but '${platform}' was provided`
    });
  }
}
