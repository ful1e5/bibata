import tarfile
from dataclasses import dataclass
from logging import Logger
from pathlib import Path
from shutil import rmtree
from typing import List
from zipfile import ZipFile

from clickgen.packer.windows import pack_win
from clickgen.packer.x11 import pack_x11

from api.builder.config import gsubtmp, gtmp


@dataclass
class FileResponse:
    file: Path
    errors: List[str]


def win_compress(id: str, logger: Logger) -> FileResponse:
    errors: List[str] = []

    dir = gsubtmp(id)
    fp = gtmp(id) / f"{dir.stem}.zip"

    if not fp.exists():
        if len(list(dir.glob("*"))) <= 0:
            errors.append("Empty build directory")

        try:
            pack_win(
                dir,
                theme_name=dir.name,
                comment="Bibata Live",
                website="https://github.com/ful1e5/bibata.live",
            )

            with ZipFile(fp, "w") as zip_file:
                for f in dir.glob("*"):
                    zip_file.write(f, f.name)

            rmtree(dir)
        except Exception as e:
            errors.append(str(e))

    return FileResponse(file=fp, errors=errors)


def x11_compress(id: str, logger: Logger) -> FileResponse:
    errors: List[str] = []

    dir = gsubtmp(id)
    fp = gtmp(id) / f"{dir.stem}.tar.gz"

    if not fp.exists():
        if len(list(dir.rglob("*"))) <= 0:
            errors.append("Empty build directory")

        try:
            pack_x11(dir, theme_name=dir.stem, comment="Bibata Live XCursors")

            with tarfile.open(fp, "w:gz") as tar:
                for f in dir.rglob("*"):
                    tar.add(f, str(f.relative_to(dir)))

            rmtree(dir)
        except Exception as e:
            errors.append(str(e))

    return FileResponse(file=fp, errors=errors)
