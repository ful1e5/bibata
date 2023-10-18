from dataclasses import dataclass
from logging import Logger
from typing import List

from flask import Request, json


@dataclass
class UploadFormData:
    name: str
    frames: List[str]
    platform: str
    size: int
    errors: List[str]


def parse_upload_formdata(request: Request, logger: Logger):
    errors: List[str] = []

    name: str = ""
    size: int = 0
    platform: str = ""
    frames: List[str] = []

    try:
        form_data = request.form.get("data")

        if not form_data:
            raise ValueError("JSON data Not Found at 'data' key in FormData request.")
        else:
            data = json.loads(form_data)
            s = data.get("size", None)
            if not s:
                raise ValueError("'size' Not Found in JSON 'data' ")
            if type(s) is not int:
                raise ValueError("Invalid 'size' type. It must be type 'number'")
            else:
                size = s

            p = data.get("platform", None)
            if not p:
                raise ValueError("'platform' Not Found in JSON 'data' ")
            if p != "win" and p != "x11":
                raise ValueError(
                    "Invalid 'platform' type. It must be type 'win' or 'x11'"
                )
            else:
                platform = p

            n = data.get("name", None)
            if not n:
                raise ValueError("'name' Not Found in JSON 'data' ")
            if type(n) is not str:
                raise ValueError("Invalid 'name' type. It must be type 'string'")
            else:
                name = n

            f = data.get("frames", None)
            if not f:
                raise ValueError("'frames' Not Found in JSON 'data' ")
            if type(f) is not list:
                raise ValueError("Invalid 'frames' type. It must be type 'string[]'")
            else:
                for i, v in enumerate(f):
                    if type(v) is not str:
                        raise ValueError(
                            f"Invalid 'frames[{i}]' type. It must  be type 'string'"
                        )
                    else:
                        frames.append(v)

    except Exception as e:
        errors.append(str(e))

    return UploadFormData(
        name=name,
        frames=frames,
        size=size,
        platform=platform,
        errors=errors,
    )


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
