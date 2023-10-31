import { NextRequest, NextResponse } from 'next/server';

import { getIndex } from '@services/download';
import { decodeAuthToken } from '@utils/auth/token';

import { RESPONSES as res } from '@api/config';

import { Goals, JWTToken } from 'bibata-live/misc';
import { getUserTotalDownloads } from '@services/user';
import { DB_SEEDS } from '@root/configs';

export async function GET(request: NextRequest) {
  if (request.method === 'GET') {
    let auth: JWTToken | undefined;

    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    const sponsor_data = (await fetch(
      'https://sponsor-spotlight.vercel.app/api/fetch?goals=true'
    )
      .then((r) => r.json())
      .then((json) => json.goals)) as Goals;

    const sponsorCount = NextResponse.json({
      total: DB_SEEDS.DOWNLOADS_PER_CENTS(
        sponsor_data.monthlySponsorshipInCents
      ),
      count: await getIndex(null)
    });

    if (!token) return sponsorCount;

    try {
      auth = decodeAuthToken(token);
      if (!auth?.id) return sponsorCount;

      const roles = ['USER', 'PRO', 'ADMIN'];

      if (roles.includes(auth.role)) {
        const total = await getUserTotalDownloads(auth.id);
        if (typeof total === undefined) return sponsorCount;

        return NextResponse.json({
          total,
          count: await getIndex(auth.id)
        });
      } else {
        return sponsorCount;
      }
    } catch {
      return sponsorCount;
    }
  } else {
    return res.invalid_method;
  }
}
