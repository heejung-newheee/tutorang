export const colors = {
  black: '#000',
  white: '#fff',
  gray: '#999',
  red: '#E51313',
} as const;

export type ColorKey = keyof typeof colors;
export type Color = (typeof colors)[ColorKey];
