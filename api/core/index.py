import os
from typing import List

from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_file, session

from core.builder.compress import FileResponse, png_compress, win_compress, x11_compress
from core.builder.cursor import store_cursors
from core.utils.parser import parse_download_params, parse_upload_formdata
from core.utils.token import decode_auth_header
from core.utils.wrappers import auth_required, destroy_build_session, session_keys

load_dotenv()

app = Flask(__name__)
logger = app.logger

app.secret_key = os.getenv("FLASK_SECRET")
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"


@app.route("/api/core/session", methods=["GET"])
def get_session():
    auth = decode_auth_header(logger)

    if isinstance(auth, tuple):
        return auth[0], auth[1]
    else:
        session.setdefault(session_keys["build"], auth.id)
        return jsonify({"id": auth.id, "role": auth.role})


@app.route("/api/core/session", methods=["DELETE"])
def destroy_session():
    k = session_keys["build"]
    id = session.get(k, None)

    if id:
        destroy_build_session(str(id))

    return jsonify({"id": id})


@app.route("/api/core/upload", methods=["POST"])
@auth_required
def upload_images():
    errors: List[str] = []

    k = session_keys["build"]
    id = str(session.get(k))

    data = parse_upload_formdata(request, logger)

    if data.errors:
        errors.extend(data.errors)
        return jsonify({"id": id, "file": None, "error": errors}), 400

    name, errs = store_cursors(id, data, logger)
    errors.extend(errs)

    if errors:
        return jsonify({"id": id, "file": None, "error": errors}), 400
    else:
        return jsonify({"id": id, "file": name, "error": None})


@app.route("/api/core/download", methods=["GET"])
def download():
    errors: List[str] = []

    s = session_keys["build"]
    id = str(session.get(s))

    param = parse_download_params(request, logger)

    if param.errors:
        errors.extend(param.errors)
        return jsonify({"id": id, "error": errors}), 400

    res: FileResponse
    if param.platform == "win":
        res = win_compress(id, param, logger)
    elif param.platform == "png":
        res = png_compress(id, param, logger)
    else:
        res = x11_compress(id, param, logger)

    if res.errors:
        errors.extend(res.errors)
        return jsonify({"id": id, "error": errors}), 400
    else:
        return send_file(res.file, as_attachment=True)
