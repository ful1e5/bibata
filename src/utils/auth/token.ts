import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

import { DBUser } from 'bibata-live/misc';

export const genAccessToken = (user?: DBUser) => {
  try {
    const token_id = v4();
    const payload = { ...user, token_id } || { token_id, role: 'ANONYMOUS' };
    return jwt.sign(payload, `${process.env.JWT_SECRET}`, {
      algorithm: 'HS256'
    });
  } catch (e) {
    console.error(e);
  }
};
