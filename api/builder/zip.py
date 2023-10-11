from pathlib import Path
from typing import List, Tuple
from zipfile import ZipFile

from api.builder.config import gsubtmp, gtmp


def get_zip(sid: str) -> Tuple[Path, List[str]]:
    errors: List[str] = []

    dir = gsubtmp(sid)
    fp = gtmp(sid) / f"{dir.stem}.zip"

    if len(list(dir.glob("*"))) <= 0:
        errors.append("Empty build directory")

    try:
        with ZipFile(fp, "w") as zip_file:
            for f in dir.glob("*"):
                zip_file.write(f, f.name)
    except FileNotFoundError:
        errors.append("Unable to compress cursors")

    return fp, errors
