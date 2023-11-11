from functools import wraps
from shutil import rmtree

from flask import g, jsonify, session

from core.builder.config import gtmp
from core.utils.token import decode_auth_header

session_keys = {"build": "cbuid"}


def auth_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        k = session_keys["build"]
        id: str = session.get(k, None)

        invalid_session = jsonify({"status": 401, "error": ["Invalid Session"]})
        unauth = jsonify({"status": 401, "error": ["Unauthorized."]})

        if id:
            auth = decode_auth_header()
            if isinstance(auth, tuple):
                return auth[0], auth[1]
            else:
                if auth.id != id:
                    return invalid_session, 401
                else:
                    g.auth = auth
                    return f(*args, **kwargs)
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
