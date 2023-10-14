from pathlib import Path


def gtmp(sub_dir: str) -> Path:
    return Path("/tmp") / "bibata-live-builds" / sub_dir


def gsubtmp(sid: str) -> Path:
    parent_dir = gtmp(sid)
    return parent_dir / f"Bibata-{sid[:5]}"
