import os
import uuid
from dataclasses import dataclass
from typing import Literal, Union

import jwt

SECRET = os.environ.get("JWT_SECRET", "jwtsecret")


@dataclass
class AuthToken:
    id: str
    role: Literal["USER", "PRO", "ADMIN", "ANONYMOUS"]


def as_token(data) -> Union[None, AuthToken]:
    if type(data) is dict:
        id = data.get("token_id")
        role = data.get("role")
        if not role or not id:
            return None
        return AuthToken(id=id, role=role)
    else:
        return None


def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET, algorithms=["HS256"])
        auth = as_token(payload)
        if auth:
            return auth
        else:
            return "invalid"
    except jwt.ExpiredSignatureError:
        return "expired"
    except jwt.InvalidTokenError:
        return "invalid"
    except Exception:
        return "invalid"


def refresh_token(id: Union[str, None], token: AuthToken):
    id = id or str(uuid.uuid4())
    payload = {"token_id": id, "role": token.role}
    return id, jwt.encode(payload, SECRET, algorithm="HS256")
