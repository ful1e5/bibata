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
