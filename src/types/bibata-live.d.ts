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
}

declare module 'bibata-live/core' {
  type Image = {
    name: string;
    frames: string[];
  };

  type Platform = 'x11' | 'win';

  type AuthError = {
    status: number;
    error: string[];
  };

  type AuthToken = {
    id: string;
    account: 'User' | 'Pro';
    token: string;
  };

  type UploadResponse = {
    status: number;
    id: string;
    files: string[];
    error: string[];
  };

  type GetSessionResponse = {
    id: string;
    token: string;
  };

  type DeleteSessionResponse = {
    id: string | null;
  };

  type DownloadError = {
    status: number;
    id: string;
    error: string[];
  };
}
