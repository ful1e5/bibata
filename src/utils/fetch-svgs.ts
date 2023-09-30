import * as Figma from 'figma-api';

export interface SVG {
  node: Figma.Node<keyof Figma.NodeTypes>;
  url: string | null;
}

export const fetchSVGs = async ({ type }: { type: string }) => {
  const token = process.env.FIGMA_TOKEN as string;
  const api = new Figma.Api({ personalAccessToken: token });

  const key = process.env.FIGMA_FILE as string;
  const file = await api.getFile(key);

  const page = file.document.children.filter(
    (e) => e.name === (process.env.NODE_ENV as string)
  )[0] as Figma.Node<'DOCUMENT'>;

  const group = page.children.filter(
    (e) => e.name === type && e.type === 'GROUP'
  )[0] as Figma.Node<'DOCUMENT'>;

  const svgs: SVG[] = [];
  const ids = group.children.map((e) => e.id).join();

  const imgRes = await api.getImage(key, {
    ids: ids,
    scale: 1,
    format: 'svg'
  });

  group.children.forEach((e) =>
    svgs.push({ url: imgRes.images[e.id], node: e })
  );

  return svgs;
};
