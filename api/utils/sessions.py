from functools import wraps
from shutil import rmtree

from flask import jsonify, session

from api.builder.config import gtmp

session_keys = {"build": "cbuid"}


def build_session_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        s = session_keys["build"]
        if session.get(s):
            return f(*args, **kwargs)
        else:
            return jsonify({"error": ["Invalid Request. Token not found or expired."]})

    return wrapper


def destroy_build_session(sid: str):
    try:
        rmtree(gtmp(sid))
    except FileNotFoundError:
        pass
    finally:
        session.pop(session_keys["build"])
