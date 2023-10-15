from dataclasses import dataclass
from logging import Logger
from typing import List

from flask import Request, json
from werkzeug.datastructures import FileStorage


@dataclass
class UploadFormData:
    size: int
    file: FileStorage
    errors: List[str]


def parse_upload_formdata(request: Request, logger: Logger):
    errors: List[str] = []
    file: FileStorage = FileStorage()
    size: int = 0

    try:
        f = request.files.get("file")
        form_data = request.form.get("data")

        if not f:
            raise ValueError("SVG file Not Found at 'file' key in FormData request.")
        else:
            file = f
            if not form_data:
                raise ValueError(
                    "JSON data Not Found at 'data' key in FormData request."
                )
            else:
                data = json.loads(form_data)
                s = data.get("size", None)
                if not s:
                    raise ValueError("'size' Not Found in JSON 'data' ")
                else:
                    size = s

    except Exception as e:
        errors.append(str(e))

    return UploadFormData(file=file, size=size, errors=errors)


@dataclass
class DownloadParams:
    platform: str
    errors: List[str]


def parse_download_params(request: Request, logger: Logger):
    type: str = ""
    errors: List[str] = []

    try:
        ptype = request.args.get("type")
        if not ptype:
            raise ValueError("'type' Param Not Found.")
        if ptype != "win" and ptype != "x11":
            raise ValueError(f"Invalid Platform '{ptype}'. It should be 'x11' or 'win'")
        else:
            type = ptype

    except Exception as e:
        errors.append(str(e))

    return DownloadParams(platform=type, errors=errors)
