from cairosvg import svg2png


def to_png(svg_code: str):
    return svg2png(svg_code)
