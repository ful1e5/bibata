import uuid
from pathlib import Path
from shutil import rmtree
from typing import List
from urllib.error import URLError
from zipfile import ZipFile

from flask import Flask, jsonify, request, send_file, session
from utils.sessions import build_session_required, session_keys
from utils.topng import to_png

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

        try:
            tmp_dir = Path("/tmp") / sid
            rmtree(tmp_dir)
        except FileNotFoundError:
            logger.info("Build Directory is empty")
        finally:
            session.pop(s)

    return jsonify({"id": sid})


@app.route("/api/upload", methods=["POST"])
@build_session_required
def set_cursor():
    s = session_keys["build"]
    sid: str = str(session.get(s))

    errors: List[str] = []
    svg_url: str = ""
    fname: str = ""

    if request.values.get("svg_url", None) is None:
        msg = "Parameter 'svg_url' required"
        errors.append(msg)
    else:
        svg_url = request.values.get("svg_url")

    if request.values.get("fname", None) is None:
        msg = "Parameter 'fname' required"
        errors.append(msg)
    else:
        fname = request.values.get("fname")

    tmp_dir = Path("/tmp") / sid
    tmp_dir.mkdir(parents=True, exist_ok=True)
    f = tmp_dir / f"{fname}.png"

    if f.exists():
        errors.append(f"Duplicate Request for '{fname}'")
    else:
        try:
            png = to_png(svg_url)
            if isinstance(png, bytes):
                f.write_bytes(png)
            else:
                errors.append(f"Failed to proceed PNG bytes for {fname}")
        except URLError:
            errors.append(f"Unable to fetch svg code from '{svg_url}'")

    return jsonify({"id": sid, "file": fname, "errors": errors})


@app.route("/api/download", methods=["GET"])
@build_session_required
def download_svg_code():
    s = session_keys["build"]
    sid: str = str(session.get(s))

    fname = f"images-{uuid.uuid4().hex[:8]}.zip"

    p = Path("/tmp") / sid
    fp = p / fname

    if len(list(p.glob("*"))) <= 0:
        return jsonify({"id": sid, "errors": ["Empty build directory"]})

    try:
        with ZipFile(fp, "w") as zip_file:
            for f in p.glob("*"):
                zip_file.write(f, f.name)
    except FileNotFoundError:
        return jsonify({"id": sid, "errors": ["Unable to process build files"]})

    return send_file(fp)
