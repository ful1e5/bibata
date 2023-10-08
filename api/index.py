import uuid
from typing import List

from flask import Flask, jsonify, request, send_file, session
from utils.sessions import build_session_required, destroy_build_session, session_keys

from api.build.cursor import store_cursors
from api.build.zip import get_zip
from api.utils.parser import parse_images_json

app = Flask(__name__)
app.secret_key = "super secret key"
logger = app.logger


@app.route("/api/")
def index():
    return jsonify({"name": "bibata.live/api", "status": "live"})


@app.route("/api/session", methods=["GET"])
def get_build_session():
    s = session_keys["build"]
    sid: str

    if session.get(s, None) is None:
        sid = str(uuid.uuid4())
        session.setdefault(s, sid)
    else:
        sid = str(session.get(s))

    return jsonify({"id": sid})


@app.route("/api/session", methods=["DELETE"])
def delete_build_session():
    s = session_keys["build"]
    sid: str | None = None

    if session.get(s, None) is not None:
        sid = str(session.get(s))
        destroy_build_session(sid)

    return jsonify({"id": sid})


@app.route("/api/upload", methods=["POST"])
@build_session_required
def set_cursor():
    s = session_keys["build"]
    sid: str = str(session.get(s))

    errors: List[str] = []
    fnames: List[str] = []

    if request.is_json:
        nodes, errors = parse_images_json(request.data)

        if nodes:
            names, errs = store_cursors(sid, nodes, logger)
            errors.extend(errs)
            fnames.extend(names)

    return jsonify({"id": sid, "files": fnames, "errors": errors})


@app.route("/api/download", methods=["GET"])
@build_session_required
def download_svg_code():
    s = session_keys["build"]
    sid: str = str(session.get(s))
    zip, errors = get_zip(sid)

    if errors:
        return jsonify({"id": sid, "errors": errors})
    else:
        return send_file(zip)
