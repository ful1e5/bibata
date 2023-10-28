import os
import uuid
from dataclasses import dataclass
from logging import Logger
from typing import Literal, Union

import jwt
import requests
from requests.adapters import HTTPAdapter, Retry

SECRET = os.environ.get("JWT_SECRET", "jwtsecret")


@dataclass
class AuthToken:
    id: str
    role: Literal["USER", "PRO", "ADMIN"]


def as_auth_token(data) -> Union[None, AuthToken]:
    if type(data) is dict:
        id = data.get("id")
        role = data.get("role")
        if not role or not id:
            return None
        return AuthToken(id=id, role=role)
    else:
        return None


def decode_auth_token(token: str):
    try:
        payload = jwt.decode(token, SECRET, algorithms=["HS256"])
        auth = as_auth_token(payload)
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


def fetch(url: str, headers=None):
    session = requests.Session()
    retry = Retry(connect=5, backoff_factor=5)
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("http://", adapter)
    session.mount("https://", adapter)

    return session.get(url, headers=headers)


def gen_user_token(id: Union[str, None]):
    id = id or str(uuid.uuid4())
    payload = {"id": id, "role": "USER"}
    return id, jwt.encode(payload, SECRET, algorithm="HS256")


def gen_token(id: Union[str, None], jwt_token: str, logger: Logger):
    user_payload = gen_user_token(id)

    try:
        payload = jwt.decode(jwt_token, SECRET, algorithms=["HS256"])
        role = payload.get("role")

        id = id or str(uuid.uuid4())
        payload = {"id": id, "role": role}
        return id, jwt.encode(payload, SECRET, algorithm="HS256")

    except jwt.ExpiredSignatureError:
        return user_payload
    except jwt.InvalidTokenError:
        return user_payload
