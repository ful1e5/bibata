import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname;
  const token = await getToken({ req });
  const isAuth = !!token;

  if (isAuth) {
    if (p.startsWith('/login')) {
      return NextResponse.redirect(new URL('/studio', req.url));
    }

    if (p === '/') {
      return NextResponse.redirect(new URL('/studio', req.url));
    }
  }
}

export const config = { matcher: ['/', '/login'] };
