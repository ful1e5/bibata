import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';

import { Role, User } from '@prisma/client';
import { AuthToken } from 'bibata/core-api/types';
import { JWTToken } from 'bibata/misc';

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
export const genAccessToken = (user?: User) => {
  const token_id = v4();
  let payload = { token_id, role: 'ANONYMOUS' };
  if (user) payload = { token_id, ...user };

  const token = jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET, {
    algorithm: 'HS256',
    noTimestamp: true
  });

  return {
    id: payload.token_id,
    role: payload.role as Role,
    token
  } as AuthToken;
};

export const decodeAuthToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded as JWTToken;
  } catch (e) {
    console.error(e);
  }
};
