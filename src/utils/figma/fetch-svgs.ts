import { v4 } from 'uuid';
import * as Figma from 'figma-api';

import { VERSIONS } from '@root/configs';

import { SVG } from 'bibata/app';

export type FetchImageOptions = {
  color?: {
    [key: string]: string;
  };
  size: number;
};

export type FetchSVGsOptions = {
  type: string;
  version: string | null;
};

export class FetchSVG {
  api: Figma.Api;
  key: string;

  constructor() {
    const token = process.env.FIGMA_TOKEN;
    this.api = new Figma.Api({ personalAccessToken: token });
    this.key = process.env.FIGMA_FILE;
  }

  private async __getSvgUrl(ids: string) {
    const { images } = await this.api.getImage(this.key, {
      ids: ids,
      scale: 1,
      format: 'svg'
    });

    if (typeof images === 'object') {
      return images;
    }
  }

  public async fetchSVGs({ type, version }: FetchSVGsOptions) {
    if (!version || !VERSIONS.includes(version)) {
      throw new Error(`Invalid version: ${version}`);
    }
    const file = await this.api.getFile(this.key);

    const page = file.document.children.filter(
      (e) => e.name === version
    )[0] as Figma.Node<'DOCUMENT'>;

    if (!page) {
      throw new Error(
        `[Figma API] '${version}' Named Page not found in Fimga file`
      );
    }

    const entries: Figma.Node<keyof Figma.NodeTypes>[] = [];

    const groups = [type, 'Shared', 'Wait', `${type} Watch`];

    page.children.forEach((e) => {
      if (e.type === 'GROUP' && groups.includes(e.name)) {
        const group = e as Figma.Node<'DOCUMENT'>;
        group.children.forEach((svg) => entries.push(svg));
      }
    });

    const svgs: SVG[] = [];

    for (const entry of entries) {
      const name = entry.name.split('::')[0];
      let node = svgs.find((svg) => svg.name === name);

      if (!node) {
        let id = v4();
        id = `img:${id}:${version}`;
        node = { id, name, node_ids: [], urls: [], isAnimated: false };
        svgs.push(node);
      }

      node.node_ids.push(entry.id);
      node.isAnimated = node.node_ids.length > 1;
    }

    let all_ids: string[] = [];
    for (let { node_ids } of svgs) {
      all_ids.push(node_ids.join(','));
    }
    const imgUrls = await this.__getSvgUrl(all_ids.join(','));

    if (imgUrls) {
      for (let i = 0; i < svgs.length; i++) {
        const { name, node_ids } = svgs[i];
        const mappedUrls = node_ids.map((nid) => imgUrls[nid]) as string[];
        if (mappedUrls && mappedUrls.length === node_ids.length) {
          svgs[i].urls = mappedUrls;
        } else {
          throw new Error(
            `[Figma API] Unable to fetch '${name}' URLs properly.`
          );
        }
      }
    } else {
      throw new Error(`[Figma API] Unable to fetch '${type}' URLs.`);
    }

    return svgs.sort((a, b) => {
      if (a.isAnimated === b.isAnimated) {
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      }
      return a.isAnimated ? -1 : 1;
    });
  }
}
