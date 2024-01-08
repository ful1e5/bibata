import os
from io import BytesIO
from logging import Logger
from typing import List

from clickgen.parser import open_blob
from clickgen.writer import to_win, to_x11
from PIL import Image

from core.builder.config import configs, gsubtmp
from core.utils.parser import UploadFormData


def store_cursors(sid: str, data: UploadFormData, logger: Logger):
    errors: List[str] = []

    name = data.name
    platform = data.platform
    pngs = data.frames
    size = data.size
    delay = data.delay

    try:
        if len(pngs) == 0:
            errors.append("Unable to convert SVG to PNG")
            return None, errors

        config = configs.get(name, None)
        if not config:
            raise ValueError(f"Unable to find Configuration for '{name}'")
        else:
            ext = ""
            cur = b""
            cursor_name = ""

            if platform == "png":
                tmp_dir = gsubtmp(sid) / "cursors"
                tmp_dir.mkdir(parents=True, exist_ok=True)

                if len(pngs) == 1:
                    f = tmp_dir / f"{name}.png"
                    img = Image.open(BytesIO(pngs[0]))
                    img.resize((size, size)).save(f)
                else:
                    max_digits = len(str(len(pngs)))
                    for i, png in enumerate(pngs):
                        index = f"{i + 1:0{max_digits}}"
                        f = tmp_dir / f"{name}-{index}.png"
                        img = Image.open(BytesIO(png))
                        img.resize((size, size)).save(f)

            if platform == "win" and config.winname:
                blob = open_blob(pngs, (config.x, config.y), [size], 1)
                ext, cur = to_win(blob.frames)
                cursor_name = config.winname

                tmp_dir = gsubtmp(sid) / "cursors"
                tmp_dir.mkdir(parents=True, exist_ok=True)
                f = tmp_dir / f"{cursor_name}{ext}"
                f.write_bytes(cur)

            if platform == "x11" and config.xname:
                blob = open_blob(pngs, (config.x, config.y), [size], delay)
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
