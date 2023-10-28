from functools import wraps
from shutil import rmtree

from flask import jsonify, request, session

from api.builder.config import gtmp
from api.utils.token import decode_token

session_keys = {"build": "cbuid"}


def auth_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        unauth = jsonify({"status": 401, "error": ["Unauthorized."]})
        invalid = jsonify({"status": 401, "error": ["Invalid Access Token"]})
        invalid_session = jsonify({"status": 401, "error": ["Invalid Session"]})
        expired = jsonify({"status": 401, "error": ["Expired Access Token"]})

        k = session_keys["build"]
        id: str = session.get(k, None)

        if id:
            auth_header = request.headers.get("Authorization")
            if auth_header and auth_header.startswith("Bearer "):
                token = auth_header[len("Bearer ") :]  # noqa: E203
                auth = decode_token(token)
                if auth == "expired":
                    return expired, 401
                elif auth == "invalid":
                    return invalid, 401
                else:
                    if auth.id != id:
                        return invalid_session, 401
                    else:
                        return f(*args, **kwargs)
            else:
                return unauth, 401

        else:
            return unauth, 401

    return wrapper


def destroy_build_session(sid: str):
    try:
        rmtree(gtmp(sid))
    except FileNotFoundError:
        pass
    finally:
        session.pop(session_keys["build"])
