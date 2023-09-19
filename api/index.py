from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/api/")
def index():
    return jsonify(
        {
            "name": "bibata.live/api",
            "status": "live",
        }
    )
