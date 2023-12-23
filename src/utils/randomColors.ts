import tinycolor from 'tinycolor2';

import { WATCH_COLORS } from '@root/configs';

const getRandomHexColor = (): string => {
  const letters = '0123456789abcdef';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomColors = (): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < 3; i++) {
    let newColor: string;
    do {
      newColor = getRandomHexColor();
    } while (colors.includes(newColor));
    colors.push(newColor);
  }
  return colors;
};

export const refreshColors = (mono: boolean = false) => {
  const color = generateRandomColors();
  const watch = monoWedgeColors(color[0], color[2], mono);

  return {
    base: color[0],
    outline: color[1],
    watch: { bg: color[2], ...watch }
  };
};

export const monoWedgeColors = (
  b: string,
  w: string,
  mono: boolean = false
) => {
  if (mono) {
    const pallete = tinycolor.mix(b, w, 10).monochromatic(4);
    const colors = pallete.map((p) => p.toHexString());

    return {
      c1: colors[1],
      c2: colors[2],
      c3: colors[3],
      c4: colors[0]
    };
  } else {
    return {
      c1: WATCH_COLORS.c1,
      c2: WATCH_COLORS.c2,
      c3: WATCH_COLORS.c3,
      c4: WATCH_COLORS.c4
    };
  }
};
