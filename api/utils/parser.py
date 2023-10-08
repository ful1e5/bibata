from dataclasses import dataclass
from typing import Any, List, Tuple

from flask import json


@dataclass
class ImageNode:
    name: str
    url: str


def ptype(a: Any) -> str:
    t = type(a).__name__

    if t == "NoneType":
        return "null"
    elif t == "int":
        return "number"
    return t


def parse_images_json(data: bytes) -> Tuple[List[ImageNode], List[str]]:
    nodes: List[ImageNode] = []
    errors: List[str] = []

    json_data = json.loads(data)

    try:
        imgs = json_data.get("images", None)
        if imgs is None:
            raise ValueError("JSON data has no root key 'images'")
        else:
            if type(imgs) is not list:
                raise ValueError(f"'images' must be type 'list' got '{ptype(imgs)}'")
            else:
                for i in range(len(imgs)):
                    img = imgs[i]
                    if type(img) is dict:
                        name = img.get("name", None)
                        url = img.get("url", None)

                        if type(name) is not str:
                            raise ValueError(
                                f"images[{i}]['name'] must be type 'string' got '{ptype(name)}'"
                            )
                        elif type(url) is not str:
                            raise ValueError(
                                f"images[{i}]['url'] must be type 'string' got '{ptype(url)}'"
                            )
                        else:
                            nodes.append(ImageNode(name=name, url=url))

    except ValueError as e:
        errors.append(str(e))
    except AttributeError as e:
        errors.append(str(e))
        errors.append("Invalid JSON format")
        return nodes, errors

    return nodes, errors
