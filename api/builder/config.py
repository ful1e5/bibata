import uuid
from pathlib import Path


def gtmp(sub_dir: str) -> Path:
    return Path("/tmp") / sub_dir


def gsubtmp(sub_dir: str) -> Path:
    id = f"Bibata-{uuid.uuid4().hex[:5]}"
    return Path("/tmp") / sub_dir / id
