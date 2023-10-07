from functools import wraps

from flask import jsonify, session

session_keys = {"build": "cbuid"}


def build_session_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        s = session_keys["build"]
        if session.get(s):
            return f(*args, **kwargs)
        else:
            return jsonify({"errors": ["Invalid build session"]})

    return wrapper
