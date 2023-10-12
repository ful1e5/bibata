import uuid
from typing import List

from flask import Flask, jsonify, request, send_file, session
from flask_cors import CORS, cross_origin
from utils.sessions import build_session_required, destroy_build_session, session_keys

from api.builder.cursor import store_cursors
from api.builder.zip import get_zip
from api.utils.parser import parse_images_json

app = Flask(__name__)
app.secret_key = "super secret key"
CORS(app, supports_credentials=True)

logger = app.logger


@app.route("/api/")
def index():
    return jsonify({"name": "bibata.live/api", "status": "live"})


@app.route("/api/session", methods=["GET"])
@cross_origin(origins="*")
def get_session():
    s = session_keys["build"]
    sid: str = session.get(s, None)

    if not sid:
        sid = str(uuid.uuid4())
        session.setdefault(s, sid)

    return jsonify({"id": sid})


@app.route("/api/session", methods=["DELETE"])
def destroy_session():
    s = session_keys["build"]
    sid: str | None = None

    if session.get(s, None) is not None:
        sid = str(session.get(s))
        destroy_build_session(sid)

    return jsonify({"id": sid})


@app.route("/api/upload", methods=["POST"])
@build_session_required
def upload_images():
    s = session_keys["build"]
    sid: str = str(session.get(s))

    errors: List[str] = []
    fnames: List[str] = []

    if request.is_json:
        json = parse_images_json(request.data, logger)

        if json.images:
            names, errs = store_cursors(sid, json, logger)
            errors.extend(errs)
            if len(errs) == 0:
                fnames.extend(names)

    return jsonify(
        {
            "status": errors and 400 or 200,
            "id": sid,
            "files": fnames,
            "error": errors or None,
        }
    )


@app.route("/api/download", methods=["GET"])
@build_session_required
def download():
    errors: List[str] = []

    s = session_keys["build"]
    sid: str = str(session.get(s))

    zip = get_zip(sid, logger)
    if zip.errors:
        errors.extend(zip.errors)

    if errors:
        return jsonify(
            {
                "status": errors and 400 or 200,
                "id": sid,
                "error": errors or None,
            }
        )
    else:
        return send_file(zip.file, as_attachment=True)
