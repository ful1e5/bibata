import uuid
from typing import List

from flask import Flask, jsonify, request, send_file, session
from flask_cors import CORS, cross_origin
from utils.sessions import build_session_required, destroy_build_session, session_keys

from api.builder.compress import FileResponse, pack_win, pack_x11
from api.builder.cursor import store_cursors
from api.utils.parser import parse_download_params, parse_upload_formdata

app = Flask(__name__)
app.secret_key = "super secret key"
CORS(app, supports_credentials=True)

logger = app.logger


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
    errors: List[str] = []

    s = session_keys["build"]
    sid: str = str(session.get(s))

    data = parse_upload_formdata(request, logger)
    if data.errors:
        errors.extend(data.errors)
        return jsonify({"status": 400, "id": sid, "file": None, "error": errors})

    name, errs = store_cursors(sid, data, logger)
    errors.extend(errs)

    return jsonify(
        {
            "status": errors and 400 or 200,
            "id": sid,
            "file": errors and name or None,
            "error": errors or None,
        }
    )


@app.route("/api/download", methods=["GET"])
@build_session_required
def download():
    errors: List[str] = []

    s = session_keys["build"]
    sid: str = str(session.get(s))

    param = parse_download_params(request, logger)

    if param.errors:
        errors.extend(param.errors)
        return jsonify({"status": 400, "id": sid, "error": errors})

    res: FileResponse
    if param.platform == "win":
        res = pack_win(sid, logger)
    else:
        res = pack_x11(sid, logger)

    if res.errors:
        errors.extend(res.errors)
        return jsonify(
            {
                "status": 400,
                "id": sid,
                "error": errors,
            }
        )
    else:
        return send_file(res.file, as_attachment=True)
