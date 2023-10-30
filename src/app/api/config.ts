import { NextResponse } from 'next/server';

export const RESPONSES = {
  unauth: NextResponse.json(
    { status: 401, error: 'Unauthorized' },
    { status: 401 }
  ),
  invalid_auth_token: NextResponse.json(
    { status: 401, error: 'Invalid Token' },
    { status: 401 }
  ),
  invalid_request: NextResponse.json(
    { status: 400, error: 'Invalid Request' },
    { status: 400 }
  ),
  invalid_method: NextResponse.json(
    { status: 405, error: 'Method not allowed' },
    { status: 405 }
  )
};
