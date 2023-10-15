from logging import Logger
from typing import List

from clickgen.parser import open_blob
from clickgen.writer import to_win, to_x11
from wand.api import library
from wand.color import Color
from wand.image import Image

from api.builder.config import configs, gsubtmp
from api.utils.parser import UploadFormData


def store_cursors(sid: str, data: UploadFormData, logger: Logger):
    errors: List[str] = []

    svg_file = data.file
    size = data.size

    if not svg_file.filename:
        errors.append(
            "Reupload file with platform as extension. Example: 'left_ptr.win' or 'left_ptr.x11'"
        )
        return None, errors

    if svg_file.mimetype != "image/svg+xml":
        errors.append(
            f"Invalid file type. Only SVG files are allowed. Got: `{svg_file.mimetype}`"
        )
        return None, errors

    fnames = svg_file.filename.split(".")
    name, platform = fnames[0], fnames[1]

    if platform != "x11" and platform != "win":
        errors.append(f"Unsupported platform: {platform}")
        return None, errors

    try:
        with Image() as image:
            with Color("transparent") as background_color:
                library.MagickSetBackgroundColor(image.wand, background_color.resource)
            image.read(blob=svg_file.read(), format="svg")
            png = image.make_blob("png32")

        if not png:
            errors.append("Unable to convert SVG to PNG")
            return None, errors

        config = configs.get(name, None)
        if not config:
            raise ValueError(f"Unable to find Configuration for '{name}'")
        else:
            ext = ""
            cur = b""
            cursor_name = ""

            config.calc(size)
            blob = open_blob(png, (config.x, config.y), [size])

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
                f = tmp_dir / f"{cursor_name}{ext}"
                f.write_bytes(cur)

    except Exception as e:
        errors.append(str(e))
        errors.append(f"Failed to build '{name}' cursor")

    return name, errors
