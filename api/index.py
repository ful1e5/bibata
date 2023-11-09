import os
from typing import List

from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_file, session

# from flask_cors import CORS, cross_origin
from utils.wrappers import auth_required, destroy_build_session, session_keys

from api.builder.compress import FileResponse, win_compress, x11_compress
from api.builder.cursor import store_cursors
from api.utils.parser import parse_download_params, parse_upload_formdata
from api.utils.token import decode_auth_header

load_dotenv()

app = Flask(__name__)
logger = app.logger

app.secret_key = os.getenv("FLASK_SECRET")
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
# CORS(app, supports_credentials=True)


@app.route("/api/session", methods=["GET"])
# @cross_origin(origins="*")
def get_session():
    auth = decode_auth_header()

    if isinstance(auth, tuple):
        return auth[0], auth[1]
    else:
        session.setdefault(session_keys["build"], auth.id)
        return jsonify({"id": auth.id, "role": auth.role})


@app.route("/api/session", methods=["DELETE"])
def destroy_session():
    k = session_keys["build"]
    id = session.get(k, None)

    if id:
        destroy_build_session(str(id))

    return jsonify({"id": id})


@app.route("/api/upload", methods=["POST"])
@auth_required
def upload_images():
    errors: List[str] = []

    k = session_keys["build"]
    id = str(session.get(k))

    data = parse_upload_formdata(request, logger)

    if data.errors:
        errors.extend(data.errors)
        return jsonify({"status": 400, "id": id, "file": None, "error": errors}), 400

    name, errs = store_cursors(id, data, logger)
    errors.extend(errs)

    if errors:
        return jsonify({"status": 400, "id": id, "file": None, "error": errors}), 400
    else:
        return jsonify({"status": 200, "id": id, "file": name, "error": None})


@app.route("/api/download", methods=["GET"])
def download():
    errors: List[str] = []

    s = session_keys["build"]
    id = str(session.get(s))

    param = parse_download_params(request, logger)

    if param.errors:
        errors.extend(param.errors)
        return jsonify({"status": 400, "id": id, "error": errors}), 400

    res: FileResponse
    if param.platform == "win":
        res = win_compress(id, param, logger)
    else:
        res = x11_compress(id, param, logger)

    if res.errors:
        errors.extend(res.errors)
        return jsonify({"status": 400, "id": id, "error": errors}), 400
    else:
        return send_file(res.file, as_attachment=True)
