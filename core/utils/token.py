import os
from dataclasses import dataclass
from logging import Logger
from typing import Literal, Union

import jwt
from flask import jsonify, request

SECRET = os.getenv("NEXT_PUBLIC_JWT_SECRET", "")


@dataclass
class AuthToken:
    id: str
    role: Literal["USER", "PRO", "ADMIN", "ANONYMOUS"]
    userId: Union[str, None] = None
    githubId: Union[str, None] = None
    login: Union[str, None] = None
    name: Union[str, None] = None
    url: Union[str, None] = None
    email: Union[str, None] = None
    avatarUrl: Union[str, None] = None
    totalDownloadCount: Union[int, None] = None


def as_token(data) -> Union[None, AuthToken]:
    if isinstance(data, dict):
        id = data.get("token_id")
        role = data.get("role")
        if not role or not id:
            return None
        return AuthToken(
            id=id,
            role=role,
            userId=data.get("id"),
            githubId=data.get("userId"),
            login=data.get("login"),
            name=data.get("name"),
            url=data.get("url"),
            email=data.get("email"),
            avatarUrl=data.get("avatarUrl"),
            totalDownloadCount=data.get("totalDownloadCount"),
        )
    else:
        return None


def decode_token(token: str, logger: Union[Logger, None] = None):
    def log_error(e):
        logger.error(e) if logger else None

    try:
        payload = jwt.decode(token, SECRET, algorithms=["HS256"])
        auth = as_token(payload)
        if auth:
            return auth
        else:
            return "invalid"
    except jwt.ExpiredSignatureError as e:
        log_error(e)
        return "expired"
    except jwt.InvalidTokenError as e:
        log_error(e)
        return "invalid"
    except Exception as e:
        log_error(e)
        return "invalid"


def decode_auth_header(logger: Union[Logger, None] = None):
    def log_error(e):
        logger.error(e) if logger else None

    unauth = jsonify({"status": 401, "error": ["Unauthorized"]})
    invalid = jsonify({"status": 401, "error": ["Invalid Token"]})
    expired = jsonify({"status": 401, "error": ["Expired Token"]})
    internal_error = jsonify({"status": 500, "error": ["Internal Authorization Error"]})

    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header[len("Bearer ") :]
        try:
            auth = decode_token(token, logger)
            if auth == "expired":
                return expired, 401
            elif auth == "invalid":
                return invalid, 401
            else:
                return auth
        except Exception as e:
            log_error(f"Exception on parsing: {e}\n token:{token}")
            return internal_error, 500

    else:
        return unauth, 401
