import tarfile
from dataclasses import dataclass
from logging import Logger
from pathlib import Path
from shutil import rmtree
from typing import List
from zipfile import ZipFile

from clickgen.packer.windows import pack_win
from clickgen.packer.x11 import pack_x11

from core.builder.config import gsubtmp, gtmp
from core.builder.files import attach_files
from core.utils.parser import DownloadParams


@dataclass
class FileResponse:
    file: Path
    errors: List[str]


def win_compress(id: str, param: DownloadParams, logger: Logger) -> FileResponse:
    errors: List[str] = []

    dir = gsubtmp(id)
    name = f"{param.name}-{dir.stem}-v{param.version}"
    fp = gtmp(id) / f"{name}.zip"

    if not fp.exists():
        if len(list(dir.glob("*"))) <= 0:
            errors.append("Empty build directory")

        try:
            pack_win(
                dir,
                theme_name=param.name,
                comment="Bibata Windows Cursors",
                website="https://github.com/ful1e5/bibata",
            )

            attach_files(id, dir, param, logger)

            with ZipFile(fp, "w") as zip_file:
                for f in dir.glob("*"):
                    zip_file.write(f, f.name)

            rmtree(dir)
        except Exception as e:
            errors.append(str(e))

    return FileResponse(file=fp, errors=errors)


def x11_compress(id: str, param: DownloadParams, logger: Logger) -> FileResponse:
    errors: List[str] = []

    dir = gsubtmp(id)
    name = f"{param.name}-{dir.stem}-v{param.version}"
    fp = gtmp(id) / f"{name}.tar.gz"

    if not fp.exists():
        if len(list(dir.rglob("*"))) <= 0:
            errors.append("Empty build directory")

        try:
            pack_x11(dir, theme_name=param.name, comment="Bibata XCursors")

            attach_files(id, dir, param, logger)

            with tarfile.open(fp, "w:gz") as tar:
                for f in dir.rglob("*"):
                    tar.add(f, str(f.relative_to(dir)))

            rmtree(dir)
        except Exception as e:
            errors.append(str(e))

    return FileResponse(file=fp, errors=errors)
