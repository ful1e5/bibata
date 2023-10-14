import os
from logging import Logger
from typing import List

import wand.color
import wand.image
from clickgen.parser import open_blob
from clickgen.writer import to_win, to_x11
from wand.api import library
from werkzeug.datastructures import FileStorage

from api.builder.config import gsubtmp


def store_cursors(sid: str, svg_file: FileStorage, logger: Logger):
    errors: List[str] = []

    tmp_dir = gsubtmp(sid)
    tmp_dir.mkdir(parents=True, exist_ok=True)

    if not svg_file.filename:
        errors.append(
            "Reupload file with platform as extension, Example 'left_ptr.win' or 'left_ptr.x11'"
        )

        return None, errors

    if svg_file.mimetype != "image/svg+xml":
        errors.append(
            f"Inavlid file type. Only SVG file allowed got `{svg_file.mimetype}`"
        )
        return None, errors

    fnames = svg_file.filename.split(".")
    name, platform = fnames[0], fnames[1]

    try:
        with wand.image.Image() as image:
            with wand.color.Color("transparent") as background_color:
                library.MagickSetBackgroundColor(image.wand, background_color.resource)
            image.read(blob=svg_file.read(), format="svg")
            png = image.make_blob("png32")

        if not png:
            errors.append("Unable to convert SVG to PNG")
            return None, errors

        ext = ""
        cur = b""

        # TODO: Remove this code
        # <----
        f1 = tmp_dir / f"{name}.png"
        if f1.exists():
            os.remove(f1)
        f1.write_bytes(png)
        # ---->

        blob = open_blob(png, (100, 100))
        if platform == "win":
            ext, cur = to_win(blob.frames)
        if platform == "x11":
            cur = to_x11(blob.frames)

        f = tmp_dir / f"{name}{ext}"
        if f.exists():
            os.remove(f)
        f.write_bytes(cur)

    except Exception as e:
        errors.append(f"Fail to build '{name}' cursor")
        errors.append(str(e))

    return name, errors
