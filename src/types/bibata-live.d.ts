declare module 'bibata-live' {
  interface Color {
    base: string;
    outline: string;
    watch?: string;
  }

  interface Colors {
    [name: string]: Color;
  }

  interface CoreApiUploadResponse {
    status: number;
    id: string;
    files: string[];
    error: string[];
  }

  interface CoreApiDownloadError {
    status: number;
    id: string;
    error: string[];
  }

  interface CoreImage {
    name: string;
    url: string;
  }

  type CorePlatform = 'x11' | 'win';
}
