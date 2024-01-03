from logging import Logger
from pathlib import Path
from typing import Literal

from core.utils.parser import DownloadParams

README = """[::] Bibata Cursor
TLDR; This cursor set is a masterpiece of cursors available on the internet,
hand-designed by Abdulkaiz Khatri(https://twitter.com/ful1e5).

Bibata is an open source, compact, and material designed cursor set that aims
to improve the cursor experience for users. It is one of the most popular cursor sets
in the Linux community and is now available for free on Windows as well, with multiple color
and size options. Its goal is to offer personalized cursors to users.

[::] What does "Bibata" mean?
The sweetest word I ever spoke was "BI-Buh," which, coincidentally, is also the word for peanuts.
To make it more pronounceable and not sound like a baby's words, I added the suffix "Ta."
And with that, my journey in the world of open source began.

[::] Become Sponsor
https://github.com/sponsors/ful1e5

[::] LICENSE
MIT License

[::] Bug Reports & Contact
https://github.com/ful1e5/bibata/issues
"""

WIN = """
[::] Installation
1. Unzip '.zip' file
2. Open unziped directory in Explorer, and [Right Click] on 'install.inf'.
3. Click 'Install' from the context menu, and authorize the modifications to your system.
4. Open Control Panel > Personalization and Appearance > Change mouse pointers,
   and select 'Bibata Cursors'.
5. Click 'Apply'.

[::] Uninstallation - (i)
(i) Run the 'uninstall.bat' script packed with the '.zip' archive

[::] Uninstallation - (ii)
1. Go to 'Registry Editor' by typing the same in the 'start search box'.
2. Expand 'HKEY_CURRENT_USER' folder and expand 'Control Panel' folder.
3. Go to 'Cursors' folder and click on 'Schemes' folder - all the available custom cursors that are
   installed will be listed here.
4. [Right Click] on the name of cursor file you want to uninstall; for eg.: 'Bibata Cursors' and
   click 'Delete'.
5. Click 'yes' when prompted."""

X = """
[::] Installation
```bash
tar -xvf Bibata.tar.gz                # extract `Bibata.tar.gz`
mv Bibata-* ~/.icons/                 # Install to local users
sudo mv Bibata-* /usr/share/icons/    # Install to all users
```

[::] Uninstallation
```bash
rm ~/.icons/Bibata-*                  # Remove from local users
sudo rm /usr/share/icons/Bibata-*     # Remove from all users
```"""

WIN_README = README + WIN
X_README = README + X


def attach_readme(p: Path, platform: Literal["x11", "win", "png"], logger: Logger):
    files = {"win": WIN_README, "x11": X_README, "png": README}

    txt = files[platform] or None
    if txt:
        p.joinpath("README.txt").write_text(txt)


def attach_license(p: Path, logger: Logger):
    with open("LICENSE", "r") as f:
        txt = f.read()
        p.joinpath("LICENSE").write_text(txt)


def attach_version_file(p: Path, version: str, logger: Logger):
    p.joinpath("VERSION").write_text(version)


def attach_files(id: str, p: Path, param: DownloadParams, logger: Logger):
    attach_readme(p, param.platform, logger)
    attach_license(p, logger)
    attach_version_file(
        p,
        f"""ID={id}
Author=Abdualkaiz Khatri <kaizmandhu@gmail.com>
Type={param.name}
Version={param.version}""",
        logger,
    )
