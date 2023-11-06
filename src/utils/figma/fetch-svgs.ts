import { NextResponse } from 'next/server';
import * as Figma from 'figma-api';

import { SVG } from 'bibata-live/app';

export type FetchImageOptions = {
  color: {
    [key: string]: string;
  };
  size: number;
  display: boolean;
};

export class FetchSVG {
  api: Figma.Api;
  key: string;

  constructor() {
    const token = process.env.FIGMA_TOKEN;
    this.api = new Figma.Api({ personalAccessToken: token });
    this.key = process.env.FIGMA_FILE;
  }

  public async fetchSVGs({ type }: { type: string }) {
    const file = await this.api.getFile(this.key);
    const page = file.document.children.filter(
      (e) => e.name === process.env.NODE_ENV
    )[0] as Figma.Node<'DOCUMENT'>;

    const group = page.children.filter(
      (e) => e.name === type && e.type === 'GROUP'
    )[0] as Figma.Node<'DOCUMENT'>;

    const svgs: SVG[] = [];

    for (const entry of group.children) {
      const name = entry.name.split('::')[0];
      let node = svgs.find((svg) => svg.name === name);

      if (!node) {
        node = { name, ids: [], isAnimated: false };
        svgs.push(node);
      }

      node.ids.push(entry.id);
      node.isAnimated = node.ids.length > 1;
    }

    return svgs.sort((a, b) => {
      if (a.isAnimated === b.isAnimated) {
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      }
      return a.isAnimated ? -1 : 1;
    });
  }

  public async fetchImage(id: string, options: FetchImageOptions) {
    const { color, size, display } = options;

    const { images } = await this.api.getImage(this.key, {
      ids: id,
      scale: 1,
      format: 'svg'
    });

    let img = '';

    if (typeof images === 'object' && images[id]) {
      await fetch(images[id] || '', { next: { revalidate: 360 } })
        .then((res) => res.text())
        .then((t) => (img = t));

      if (color && typeof color === 'object') {
        Object.entries(color).forEach(([match, replace]) => {
          img = img.replace(new RegExp(match, 'ig'), replace);
        });
      }

      if (display) {
        img = img.replace(
          'width="256" height="256"',
          'width="100%" height="100%"'
          // `preserveAspectRatio="xMaxYMid meet" width="100%" height="100%"`
        );
      } else if (size !== 0) {
        img = img.replace(
          'width="256" height="256"',
          `preserveAspectRatio="xMaxYMid meet" width="${size}" height="${size}"`
        );
      }
    }

    return new NextResponse(img, {
      headers: {
        'content-type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
}
