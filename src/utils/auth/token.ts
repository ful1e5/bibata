import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';

import { User } from '@prisma/client';
import { JWTToken } from 'bibata-live/misc';

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
export const genAccessToken = (user?: User) => {
  const token_id = v4();

  let payload = { token_id, role: 'ANONYMOUS' };
  if (user) payload = { ...user, token_id };

  return jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET, {
    algorithm: 'HS256'
  });
};

export const decodeAuthToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded as JWTToken;
  } catch (e) {
    console.error(e);
  }
};
