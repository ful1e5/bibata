export interface Color {
  base: string;
  outline: string;
  watch?: string;
}

export interface Colors {
  [name: string]: Color;
}
