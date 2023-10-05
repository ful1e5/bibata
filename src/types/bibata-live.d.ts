declare module 'bibata-live' {
  interface Color {
    base: string;
    outline: string;
    watch?: string;
  }

  interface Colors {
    [name: string]: Color;
  }
}
