import os
from typing import List

from flask import Flask, jsonify, request, send_file, session

# from flask_cors import CORS, cross_origin
from utils.wrappers import auth_required, destroy_build_session, session_keys

from api.builder.compress import FileResponse, win_compress, x11_compress
from api.builder.cursor import store_cursors
from api.utils.parser import parse_download_params, parse_upload_formdata
from api.utils.token import decode_token, refresh_token

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET")
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
# CORS(app, supports_credentials=True)

logger = app.logger


@app.route("/api/session", methods=["GET"])
# @cross_origin(origins="*")
def get_session():
    k = session_keys["build"]
    id: str = session.get(k, None)

    unauth = jsonify({"status": 401, "error": ["Unauthorized."]})
    invalid = jsonify({"status": 401, "error": ["Invalid Access Token"]})
    expired = jsonify({"status": 401, "error": ["Expired Access Token"]})

    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        access_token = auth_header[len("Bearer ") :]  # noqa: E203
        try:
            auth = decode_token(access_token)
            if auth == "invalid":
                return invalid, 401
            elif auth == "expired":
                return expired, 401
            else:
                id, token = refresh_token(id, auth)
                session.setdefault(k, id)
                return jsonify({"id": id, "token": token})
        except Exception as e:
            logger.error(e)
            return jsonify({"status": 500, "error": ["Internal Error."]}), 500
    else:
        return unauth, 401


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
        res = win_compress(id, logger)
    else:
        res = x11_compress(id, logger)

    if res.errors:
        errors.extend(res.errors)
        return jsonify({"status": 400, "id": id, "error": errors}), 400
    else:
        return send_file(res.file, as_attachment=True)
