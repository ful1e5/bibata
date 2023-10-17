declare module 'bibata-live' {
  type SVG = {
    name: string;
    ids: string[];
    isAnimated: boolean;
  };

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
    code: string;
  };

  type CorePlatform = 'x11' | 'win';
}
