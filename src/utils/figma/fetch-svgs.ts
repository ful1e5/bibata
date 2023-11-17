import { v4 } from 'uuid';
import * as Figma from 'figma-api';

import sharp from 'sharp';

import { SVG } from 'bibata/app';

export type FetchImageOptions = {
  color?: {
    [key: string]: string;
  };
  size: number;
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

    console.error('Figma File');
    console.error(file);

    const page = file.document.children.filter(
      (e) => e.name === process.env.NODE_ENV
    )[0] as Figma.Node<'DOCUMENT'>;

    console.error(page);

    const entries: Figma.Node<keyof Figma.NodeTypes>[] = [];

    const groups = [type, 'Shared', 'Wait'];

    page.children.forEach((e) => {
      if (e.type === 'GROUP' && groups.includes(e.name)) {
        console.log('Figma Groups');
        console.log(e);
        const group = e as Figma.Node<'DOCUMENT'>;
        group.children.forEach((svg) => entries.push(svg));
      }
    });

    const svgs: SVG[] = [];

    for (const entry of entries) {
      const name = entry.name.split('::')[0];
      let node = svgs.find((svg) => svg.name === name);

      if (!node) {
        const id = v4();
        node = { id: `img:${id}`, name, node_ids: [], isAnimated: false };
        svgs.push(node);
      }

      node.node_ids.push(entry.id);
      node.isAnimated = node.node_ids.length > 1;
    }

    return svgs.sort((a, b) => {
      if (a.isAnimated === b.isAnimated) {
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      }
      return a.isAnimated ? -1 : 1;
    });
  }

  public async getSvgUrl(ids: string) {
    const { images } = await this.api.getImage(this.key, {
      ids: ids,
      scale: 1,
      format: 'svg'
    });

    if (typeof images === 'object') {
      return images;
    }
  }

  public async generateImage(url: string, options: FetchImageOptions) {
    const { color, size } = options;

    let img = '';

    await fetch(url, { next: { revalidate: 360 } })
      .then((res) => res.text())
      .then((t) => (img = t));

    if (img) {
      if (color && typeof color === 'object') {
        Object.entries(color).forEach(([match, replace]) => {
          img = img.replace(new RegExp(match, 'ig'), replace);
        });
      }

      return await sharp(Buffer.from(img))
        .resize(size, size)
        .png()
        .toBuffer()
        .catch((e) => {
          console.error(e);
        });
    }
  }
}
