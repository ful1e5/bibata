import * as Figma from 'figma-api';

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

    const svgs: Figma.Node<keyof Figma.NodeTypes>[] = [];
    group.children.forEach((e) => svgs.push(e));

    return svgs.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    );
  }
}
