from pathlib import Path
from typing import Dict


def gtmp(sub_dir: str) -> Path:
    return Path("/tmp") / "bibata-live-builds" / sub_dir


def gsubtmp(sid: str) -> Path:
    parent_dir = gtmp(sid)
    return parent_dir / f"Bibata-live-{sid[:5]}"


class Config:
    def __init__(
        self,
        x=None,
        y=None,
        winname=None,
        xname=None,
        links=None,
    ):
        def _assign(v) -> int:
            if not v:
                return int(256 / 2)
            else:
                return v

        self.x = _assign(x)
        self.y = _assign(y)
        self.winname = winname
        self.xname = xname
        self.links = links


configs: Dict[str, Config] = {
    "bd_double_arrow": Config(
        winname="Dgn1",
        xname="bd_double_arrow",
        links=[
            "c7088f0f3e6c8088236ef8e1e3e70000",
            "nwse-resize",
            "size_fdiag",
        ],
    ),
    "bottom_left_corner": Config(
        x=30,
        y=172,
        xname="bottom_left_corner",
        links=["sw-resize"],
    ),
    "bottom_right_corner": Config(
        x=171,
        y=173,
        xname="bottom_right_corner",
        links=["se-resize"],
    ),
    "bottom_side": Config(
        x=100,
        y=164,
        xname="bottom_side",
        links=["s-resize"],
    ),
    "bottom_tee": Config(
        x=98,
        y=164,
        xname="bottom_tee",
    ),
    "center_ptr": Config(
        x=98,
        y=13,
        xname="center_ptr",
    ),
    "circle": Config(
        x=42,
        y=15,
        winname="Unavailable",
        xname="circle",
        links=["forbidden"],
    ),
    "context-menu": Config(
        x=42,
        y=15,
        xname="context-menu",
    ),
    "copy": Config(
        x=42,
        y=15,
        xname="copy",
        links=[
            "1081e37283d90000800003c07f3ef6bf",
            "6407b0e94181790501fd1e167b474872",
            "b66166c04f8c3109214a4fbd64a50fc8",
        ],
    ),
    "cross": Config(
        x=98,
        y=96,
        xname="cross",
        links=["cross_reverse", "diamond_cross"],
    ),
    "crossed_circle": Config(
        xname="crossed_circle",
        links=["03b6e0fcb3499374a867c041f52298f0", "not-allowed"],
    ),
    "crosshair": Config(
        winname="Cross",
        xname="crosshair",
    ),
    "dnd_no_drop": Config(
        x=89,
        y=61,
        xname="dnd_no_drop",
        links=["no-drop"],
    ),
    "dnd-ask": Config(
        x=89,
        y=61,
        xname="dnd-ask",
    ),
    "dnd-copy": Config(
        x=89,
        y=61,
        xname="dnd-copy",
    ),
    "dnd-link": Config(
        x=89,
        y=61,
        xname="dnd-link",
        links=["alias"],
    ),
    "dotbox": Config(
        x=97,
        y=99,
        xname="dotbox",
        links=["dot_box_mask", "draped_box", "icon", "target"],
    ),
    "fd_double_arrow": Config(
        winname="Dgn2",
        xname="fd_double_arrow",
        links=[
            "fcf1c3c7cd4491d801f1e1c78f100000",
            "nesw-resize",
            "size_bdiag",
        ],
    ),
    "grabbing": Config(
        x=106,
        y=59,
        winname="Grabbing",
        xname="grabbing",
        links=[
            "closedhand",
            "dnd-move",
            "dnd-none",
            "fcf21c00b30f7e3f83fe0dfd12e71cff",
        ],
    ),
    "hand1": Config(
        x=117,
        y=39,
        winname="Pan",
        xname="hand1",
        links=["grab", "openhand"],
    ),
    "hand2": Config(
        x=88,
        y=14,
        winname="Link",
        xname="hand2",
        links=[
            "9d800788f1b08800ae810202380a0822",
            "e29285e634086352946a0e7090d73106",
            "pointer",
            "pointing_hand",
        ],
    ),
    "left_ptr": Config(
        x=42,
        y=15,
        winname="Pointer",
        xname="left_ptr",
        links=["arrow", "default", "top_left_arrow"],
    ),
    "left_ptr_watch": Config(
        x=42,
        y=15,
        winname="Work",
        xname="left_ptr_watch",
        links=[
            "00000000000000020006000e7e9ffc3f",
            "08e8e1c95fe2fc01f976f1e063a24ccd",
            "3ecb610c1bf2410f44200f48c40d3599",
            "progress",
        ],
    ),
    "left_side": Config(
        x=35,
        y=101,
        xname="left_side",
        links=["w-resize"],
    ),
    "left_tee": Config(
        x=165,
        y=96,
        xname="left_tee",
    ),
    "link": Config(
        x=42,
        y=15,
        xname="link",
        links=[
            "3085a0e285430894940527032f8b26df",
            "640fb0e74195791501fd1ed57b41487f",
            "a2a266d0498c3104214a47bd64ab0fc8",
        ],
    ),
    "ll_angle": Config(
        x=34,
        y=164,
        xname="ll_angle",
    ),
    "lr_angle": Config(
        x=165,
        y=165,
        xname="lr_angle",
    ),
    "move": Config(
        x=99,
        y=99,
        winname="Move",
        xname="move",
        links=[
            "4498f0e0c1937ffe01fd06f973665830",
            "9081237383d90e509aa00f00170e968f",
            "all-scroll",
            "fleur",
            "size_all",
        ],
    ),
    "pencil": Config(
        x=31,
        y=169,
        winname="Handwriting",
        xname="pencil",
        links=["draft"],
    ),
    "plus": Config(xname="plus", links=["cell"]),
    "pointer-move": Config(
        x=42,
        y=15,
        xname="pointer-move",
    ),
    "question_arrow": Config(
        x=43,
        y=105,
        winname="Help",
        xname="question_arrow",
        links=[
            "5c6cd98b3f3ebcb1f9c7f1c204630408",
            "d9ce0ab605698f320427677b458ad60b",
            "help",
            "left_ptr_help",
            "whats_this",
        ],
    ),
    "right_ptr": Config(
        x=156,
        y=14,
        winname="Alternate",
        xname="right_ptr",
        links=["draft_large", "draft_small"],
    ),
    "right_side": Config(
        x=163,
        y=98,
        xname="right_side",
        links=["e-resize"],
    ),
    "right_tee": Config(
        x=31,
        y=96,
        xname="right_tee",
    ),
    "sb_down_arrow": Config(
        x=100,
        y=181,
        xname="sb_down_arrow",
        links=["down-arrow"],
    ),
    "sb_h_double_arrow": Config(
        winname="Horz",
        xname="sb_h_double_arrow",
        links=[
            "028006030e0e7ebffc7f7070c0600140",
            "14fef782d02440884392942c1120523",
            "col-resize",
            "ew-resize",
            "h_double_arrow",
            "size-hor",
            "size_hor",
            "split_h",
        ],
    ),
    "sb_left_arrow": Config(
        x=19,
        y=100,
        xname="sb_left_arrow",
        links=["left-arrow"],
    ),
    "sb_right_arrow": Config(
        x=181,
        y=100,
        xname="sb_right_arrow",
        links=["right-arrow"],
    ),
    "sb_up_arrow": Config(
        x=100,
        y=19,
        xname="sb_up_arrow",
        links=["up-arrow"],
    ),
    "sb_v_double_arrow": Config(
        winname="Vert",
        xname="sb_v_double_arrow",
        links=[
            "00008160000006810000408080010102",
            "2870a09082c103050810ffdffffe0204",
            "double_arrow",
            "ns-resize",
            "row-resize",
            "size-ver",
            "size_ver",
            "split_v",
            "v_double_arrow",
        ],
    ),
    "tcross": Config(
        x=100,
        y=99,
        xname="tcross",
        links=["color-picker"],
    ),
    "top_left_corner": Config(
        x=29,
        y=27,
        xname="top_left_corner",
        links=["nw-resize"],
    ),
    "top_right_corner": Config(
        x=170,
        y=26,
        xname="top_right_corner",
        links=["ne-resize"],
    ),
    "top_side": Config(
        x=98,
        y=36,
        xname="top_side",
        links=["n-resize"],
    ),
    "top_tee": Config(
        x=99,
        y=30,
        xname="top_tee",
    ),
    "ul_angle": Config(
        x=34,
        y=35,
        xname="ul_angle",
    ),
    "ur_angle": Config(
        x=164,
        y=35,
        xname="ur_angle",
    ),
    "vertical-text": Config(
        x=99,
        y=100,
        xname="vertical-text",
    ),
    "wait": Config(
        winname="Busy",
        xname="wait",
        links=["watch"],
    ),
    "wayland-cursor": Config(xname="wayland-cursor"),
    "X_cursor": Config(
        xname="X_cursor",
        links=["pirate", "x-cursor"],
    ),
    "xterm": Config(
        x=84,
        y=100,
        winname="Text",
        xname="xterm",
        links=["ibeam", "text"],
    ),
    "zoom_in": Config(
        x=91,
        y=90,
        winname="Zoom-in",
        xname="zoom-in",
    ),
    "zoom_out": Config(
        x=89,
        y=90,
        winname="Zoom-out",
        xname="zoom-out",
    ),
    "person": Config(
        x=42,
        y=15,
        winname="Person",
    ),
    "pin": Config(x=42, y=15, winname="Pin"),
}
