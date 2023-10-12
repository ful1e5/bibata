from pathlib import Path


def gtmp(sub_dir: str) -> Path:
    return Path("/tmp") / sub_dir


def gsubtmp(sid: str) -> Path:
    return Path("/tmp") / sid / f"Bibata-{sid[:5]}"
