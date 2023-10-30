import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

import { DBUser } from 'bibata-live/db';
import { JWTToken } from 'bibata-live/core-api/types';

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
export const genAccessToken = (user?: DBUser) => {
  try {
    const token_id = v4();

    let payload = { token_id, role: 'ANONYMOUS' };
    if (user) payload = { ...user, token_id };

    return jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET, {
      algorithm: 'HS256'
    });
  } catch (e) {
    console.error(e);
  }
};

export const decodeAuthToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded as JWTToken;
  } catch (e) {
    console.error(e);
  }
};
