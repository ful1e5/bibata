import * as Figma from 'figma-api';

import { SVG } from 'bibata-live';

export class FetchSVG {
  api: Figma.Api;
  key: string;

  constructor() {
    const token = process.env.FIGMA_TOKEN as string;
    this.api = new Figma.Api({ personalAccessToken: token });
    this.key = process.env.FIGMA_FILE as string;
  }

  public async fetchSVGs({ type }: { type: string }) {
    const file = await this.api.getFile(this.key);
    const page = file.document.children.filter(
      (e) => e.name === (process.env.NODE_ENV as string)
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

    return svgs.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    );
  }
}
