from dataclasses import dataclass
from logging import Logger
from typing import Any, List, Union

from flask import json


@dataclass
class ImageNode:
    name: str
    data: str


@dataclass
class ImagesJson:
    images: List[ImageNode]
    platform: Union[str, None]
    error: List[str]


def ptype(a: Any) -> str:
    t = type(a).__name__

    if t == "NoneType":
        return "null"
    elif t == "int":
        return "number"
    elif t == "str":
        return "string"
    return t


def parse_images_json(data: bytes, logger: Logger) -> ImagesJson:
    nodes: List[ImageNode] = []
    errors: List[str] = []
    platform: Union[str, None] = None

    json_data = json.loads(data)

    try:
        imgs = json_data.get("images", None)
        if imgs is None:
            raise ValueError("JSON data has no root key 'images'")
        else:
            if type(imgs) is not list:
                raise ValueError(
                    f"Invalid type. 'images' should be a 'list', but it is '{ptype(imgs)}'"
                )
            else:
                for i in range(len(imgs)):
                    img = imgs[i]
                    if type(img) is dict:
                        name = img.get("name", None)
                        data = img.get("data", None)

                        if type(name) is not str:
                            raise ValueError(
                                f"Invalid type. images[{i}]['name'] should be a 'string', but it is '{ptype(name)}'"
                            )
                        elif type(data) is not str:
                            raise ValueError(
                                f"Invalid type. images[{i}]['data'] should be a 'string', but it is '{ptype(data)}'"
                            )
                        else:
                            nodes.append(ImageNode(name=name, data=data))

        p = json_data.get("platform", None)
        if p == "x11" or p == "win":
            platform = p
        else:
            raise AttributeError("Invalid type. platform should be a 'x11' or 'win'")

    except ValueError as e:
        errors.append(str(e))
    except AttributeError as e:
        errors.append(str(e))
        return ImagesJson(images=nodes, platform=platform, error=errors)

    return ImagesJson(images=nodes, platform=platform, error=errors)
