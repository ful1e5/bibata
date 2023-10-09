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
    elif t == "str":
        return "string"
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
                raise ValueError(
                    f"Invalid type. 'images' should be a 'list', but it is '{ptype(imgs)}'"
                )
            else:
                for i in range(len(imgs)):
                    img = imgs[i]
                    if type(img) is dict:
                        name = img.get("name", None)
                        url = img.get("url", None)

                        if type(name) is not str:
                            raise ValueError(
                                f"Invalid type. images[{i}]['name'] should be a 'string', but it is '{ptype(name)}'"
                            )
                        elif type(url) is not str:
                            raise ValueError(
                                f"Invalid type. images[{i}]['url'] should be a 'string', but it is '{ptype(url)}'"
                            )
                        else:
                            nodes.append(ImageNode(name=name, url=url))

    except ValueError as e:
        errors.append(str(e))
    except AttributeError as e:
        errors.append(str(e))
        return nodes, errors

    return nodes, errors


def parse_download_json(data: bytes) -> Tuple[List[int], List[str]]:
    sizes: List[int] = []
    errors: List[str] = []

    json_data = json.loads(data)

    try:
        sizes = json_data.get("sizes", None)
        if sizes is None:
            raise ValueError("JSON data has no root key 'sizes'")
        else:
            if type(sizes) is not list:
                raise ValueError(
                    f"Invalid type. 'sizes' should be a 'list', but it is '{ptype(sizes)}'"
                )
            else:
                for i in range(len(sizes)):
                    size = sizes[i]
                    if type(size) is not int:
                        raise ValueError(
                            f"Invalid type. sizes[{i}] should be a 'int', but it is '{ptype(size)}'"
                        )
                    else:
                        sizes.append(size)

    except ValueError as e:
        errors.append(str(e))
    except AttributeError as e:
        errors.append(str(e))
        return sizes, errors

    return sizes, errors
