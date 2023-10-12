import os
from dataclasses import dataclass
from logging import Logger
from pathlib import Path
from typing import List
from zipfile import ZipFile

from api.builder.config import gsubtmp, gtmp


@dataclass
class FileResponse:
    file: Path
    errors: List[str]


def get_zip(sid: str, logger: Logger) -> FileResponse:
    errors: List[str] = []

    dir = gsubtmp(sid)
    fp = gtmp(sid) / f"{dir.stem}.zip"

    if len(list(dir.glob("*"))) <= 0:
        errors.append("Empty build directory")

    try:
        if fp.exists():
            os.remove(fp)

        with ZipFile(fp, "w") as zip_file:
            for f in dir.glob("*"):
                zip_file.write(f, f.name)
    except Exception as e:
        errors.append(str(e))

    return FileResponse(file=fp, errors=errors)
