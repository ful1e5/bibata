import base64
from dataclasses import dataclass
from logging import Logger
from typing import List, Literal

from flask import Request, json


@dataclass
class UploadFormData:
    name: str
    frames: List[bytes]
    platform: str
    size: int
    delay: int
    errors: List[str]


def parse_upload_formdata(request: Request, logger: Logger):
    errors: List[str] = []

    name: str = ""
    size: int = 0
    delay: int = 0
    platform: str = ""
    frames: List[bytes] = []

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

            d = data.get("delay", None)
            if not d:
                raise ValueError("'delay' Not Found in JSON 'data' ")
            if type(d) is not int:
                raise ValueError("Invalid 'delay' type. It must be type 'number'")
            else:
                delay = d

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
                        base64_str = v[len("data:image/png;base64,") :]  # noqa: E203
                        frames.append(base64.b64decode(base64_str))

    except Exception as e:
        errors.append(str(e))

    return UploadFormData(
        name=name,
        frames=frames,
        size=size,
        delay=delay,
        platform=platform,
        errors=errors,
    )


@dataclass
class DownloadParams:
    name: str
    version: str
    platform: Literal["win", "x11"]
    errors: List[str]


def parse_download_params(request: Request, logger: Logger):
    platform: Literal["win", "x11"] = "x11"
    name: str = ""
    version: str = ""
    errors: List[str] = []

    try:
        p = request.args.get("platform")
        if not p:
            raise ValueError("'platform' Param Not Found.")

        if p != "win" and p != "x11":
            raise ValueError(
                f"Invalid Platform '{platform}'. It should be 'x11' or 'win'"
            )
        else:
            platform = p

        n = request.args.get("name")
        if not n:
            raise ValueError("'name' Param Not Found.")
        if type(n) is not str:
            raise ValueError(f"Invalid filename '{n}'. It should be type 'string'")
        else:
            name = n

        v = request.args.get("v")
        if not v:
            raise ValueError("'v' Param Not Found.")
        if type(v) is not str:
            raise ValueError(f"Invalid version '{v}'. It should be type 'string'")
        else:
            version = v

    except Exception as e:
        errors.append(str(e))

    return DownloadParams(platform=platform, name=name, version=version, errors=errors)
