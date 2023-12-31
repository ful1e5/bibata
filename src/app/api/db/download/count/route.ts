import { NextRequest, NextResponse } from 'next/server';

import { getUserTotalDownloads } from '@services/user';

import { getIndex } from '@services/download';
import { decodeAuthToken } from '@utils/auth/token';

import { RESPONSES as res } from '@api/config';
import { DB_SEEDS, SPONSOR_API_ENDPOINT } from '@root/configs';

import { Goals, JWTToken } from 'bibata/misc';

export async function GET(request: NextRequest) {
  if (request.method === 'GET') {
    let auth: JWTToken | undefined;

    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    try {
      const sponsor_data = (await fetch(`${SPONSOR_API_ENDPOINT}?goals=true`)
        .then((r) => r.json())
        .then((json) => json.goals)) as Goals;

      const sponsorCount = NextResponse.json({
        total: DB_SEEDS.DOWNLOADS_PER_CENTS(
          sponsor_data.monthlySponsorshipInCents
        ),
        count: await getIndex(null),
        role: 'ANONYMOUS'
      });

      if (!token) return sponsorCount;

      try {
        auth = decodeAuthToken(token);
        if (!auth?.id) return sponsorCount;

        const roles = ['USER', 'PRO', 'ADMIN'];

        if (roles.includes(auth.role)) {
          let total = await getUserTotalDownloads(auth.id);

          if (total === undefined) return sponsorCount;

          return NextResponse.json({
            total,
            count: await getIndex(auth.id),
            role: auth.role
          });
        } else {
          return sponsorCount;
        }
      } catch {
        return sponsorCount;
      }
    } catch (e) {
      console.error(e);
      return NextResponse.json({ total: 0, count: 0, error: e });
    }
  } else {
    return res.invalid_method;
  }
}
