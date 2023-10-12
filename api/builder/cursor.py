import os
from logging import Logger
from typing import List

from clickgen.parser import open_blob
from clickgen.writer import to_win, to_x11

from api.builder.config import gsubtmp
from api.utils.parser import ImagesJson
from api.utils.topng import to_png


def store_cursors(sid: str, json: ImagesJson, logger: Logger):
    errors: List[str] = []
    names: List[str] = []

    tmp_dir = gsubtmp(sid)
    tmp_dir.mkdir(parents=True, exist_ok=True)

    for node in json.images:
        data = node.data
        name = node.name

        try:
            png = to_png(data)

            if not isinstance(png, bytes):
                errors.append(f"Failed to proceed PNG bytes for {name}")
            else:
                ext = ""
                cur = b""

                blob = open_blob(png, (100, 100))
                if json.platform == "win":
                    ext, cur = to_win(blob.frames)
                if json.platform == "x11":
                    cur = to_x11(blob.frames)

                f = tmp_dir / f"{name}{ext}"
                if f.exists():
                    os.remove(f)
                f.write_bytes(cur)

        except Exception:
            errors.append(f"Unable to build cursor '{name}'")
        names.append(name)

    return names, errors
