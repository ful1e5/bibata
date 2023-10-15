import tarfile
from dataclasses import dataclass
from logging import Logger
from pathlib import Path
from shutil import rmtree
from typing import List
from zipfile import ZipFile

from api.builder.config import gsubtmp, gtmp


@dataclass
class FileResponse:
    file: Path
    errors: List[str]


def pack_win(sid: str, logger: Logger) -> FileResponse:
    errors: List[str] = []

    dir = gsubtmp(sid)
    fp = gtmp(sid) / f"{dir.stem}.zip"

    if not fp.exists():
        if len(list(dir.rglob("*"))) <= 0:
            errors.append("Empty build directory")

        try:
            with ZipFile(fp, "w") as zip_file:
                for f in dir.rglob("*"):
                    zip_file.write(f, f.name)

            rmtree(dir)
        except Exception as e:
            errors.append(str(e))

    return FileResponse(file=fp, errors=errors)


def pack_x11(sid: str, logger: Logger) -> FileResponse:
    errors: List[str] = []

    dir = gsubtmp(sid)
    fp = gtmp(sid) / f"{dir.stem}.tar.gz"

    if not fp.exists():
        if len(list(dir.rglob("*"))) <= 0:
            errors.append("Empty build directory")

        try:
            with tarfile.open(fp, "w:gz") as tar:
                for f in dir.rglob("*"):
                    tar.add(f, str(f.relative_to(dir)))

            rmtree(dir)
        except Exception as e:
            errors.append(str(e))

    return FileResponse(file=fp, errors=errors)
