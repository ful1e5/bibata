from cairosvg import svg2png


def to_png(svg_url: str):
    return svg2png(url=svg_url)
