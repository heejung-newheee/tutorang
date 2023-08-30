export const colors = {
  black: '#000',

  black_200: '#434343',
  black_100: '#292929',

  white: '#fff',

  gray: '#999',
  gray_900: '#C3C1C1',
  gray_200: '#E4E4E4',
  gray_100: '#F8F8F8',

  red: '#C50404',
  primary: '#FE902F',

  black_opacity_60: 'rgba(0,0,0,0.6)',
} as const;

export type ColorKey = keyof typeof colors;
export type Color = (typeof colors)[ColorKey];
