declare module 'bibata-live' {
  type SVG = Figma.Node<keyof Figma.NodeTypes>;

  type Color = {
    base: string;
    outline: string;
    watch?: string;
  };

  type Colors = {
    [name: string]: Color;
  };

  type CoreApiUploadResponse = {
    status: number;
    id: string;
    files: string[];
    error: string[];
  };

  type CoreApiDownloadResonse = {
    status: number;
    id: string;
    error: string[];
  };

  type CoreImage = {
    name: string;
    url: string;
  };

  type CorePlatform = 'x11' | 'win';
}
