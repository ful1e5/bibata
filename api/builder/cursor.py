import os
from logging import Logger
from typing import List, Union

from clickgen.parser import open_blob
from clickgen.writer import to_win, to_x11
from wand.api import library
from wand.color import Color
from wand.image import Image

from api.builder.config import configs, gsubtmp
from api.utils.parser import UploadFormData


def store_cursors(sid: str, data: UploadFormData, logger: Logger):
    errors: List[str] = []

    name = data.name
    platform = data.platform
    frames = data.frames
    size = data.size

    pngs: List[bytes] = []

    try:
        for f in frames:
            with Image() as image:
                with Color("transparent") as background_color:
                    library.MagickSetBackgroundColor(
                        image.wand, background_color.resource
                    )
                    image.read(blob=f.encode(), format="svg")
                    png = image.make_blob("png32")
                    if type(png) is bytes:
                        pngs.append(png)

        if not pngs:
            errors.append("Unable to convert SVG to PNG")
            return None, errors

        config = configs.get(name, None)
        if not config:
            raise ValueError(f"Unable to find Configuration for '{name}'")
        else:
            ext = ""
            cur = b""
            cursor_name = ""

            blob = open_blob(pngs, (config.x, config.y), [size])

            if platform == "win" and config.winname:
                ext, cur = to_win(blob.frames)
                cursor_name = config.winname

                tmp_dir = gsubtmp(sid)
                tmp_dir.mkdir(parents=True, exist_ok=True)
                f = tmp_dir / f"{cursor_name}{ext}"
                f.write_bytes(cur)

            if platform == "x11" and config.xname:
                cur = to_x11(blob.frames)
                cursor_name = config.xname

                tmp_dir = gsubtmp(sid) / "cursors"
                tmp_dir.mkdir(parents=True, exist_ok=True)

                xname = f"{cursor_name}{ext}"
                f = tmp_dir / xname
                f.write_bytes(cur)

                if config.links:
                    oldpwd = os.getcwd()
                    os.chdir(tmp_dir)
                    for link in config.links:
                        os.symlink(xname, link)
                    os.chdir(oldpwd)

    except Exception as e:
        errors.append(str(e))
        errors.append(f"Failed to build '{name}' cursor")

    return name, errors
