import { colors } from "../styles/color";
import { DeepPartial } from "../types";
import { deepmerge } from "../utils/deepmerge";

export type PaletteColor = {
  deepDark: string;
  dark: string;
  main: string; // user から渡される想定
  light: string;
  highlight: string;
};

export type PaletteText = {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
  white: string;
};

export type PaletteBackground = {
  default: string;
  dark: string;
  active: string;
  hint: string;
};

export type PaletteIcon = {
  active: string;
  fill: string;
  line: string;
};

export type Colors = {
  white: PaletteColor;
  black: PaletteColor;
  gray: PaletteColor;
} & ColorAny;

type ColorAny = {
  [key: string]: PaletteColor;
};

export type UseCase = {
  success: PaletteColor;
  warning: PaletteColor;
  danger: PaletteColor;
};

export type Palette = {
  colors: Colors;
  usecase: UseCase;
  primary: PaletteColor;
  secondary: PaletteColor;
  icon: PaletteIcon;
  divider: string;
};

export const palette: Palette = {
  colors: {
    // 一旦白は main だけ
    // アンミカ「白って200色あんねん！」
    white: {
      deepDark: "",
      dark: "",
      main: colors.basic[50] as string,
      light: "",
      highlight: "",
    },
    black: {
      deepDark: "",
      dark: "",
      main: colors.basic[900],
      light: "",
      highlight: "",
    },
    gray: {
      deepDark: colors.basic[600],
      dark: colors.basic[500],
      main: colors.basic[300],
      light: colors.basic[200],
      highlight: colors.basic[100],
    },
    green: {
      deepDark: colors.green[700],
      dark: colors.green[600],
      main: colors.green[500],
      light: colors.green[300],
      highlight: colors.green[100],
    },
    yellow: {
      deepDark: colors.yellow[900],
      dark: colors.yellow[600],
      main: colors.yellow[500],
      light: colors.yellow[400],
      highlight: colors.yellow[100],
    },
    red: {
      deepDark: colors.red[700],
      dark: colors.red[600],
      main: colors.red[500],
      light: colors.red[300],
      highlight: colors.red[100],
    },
    blue: {
      deepDark: colors.blue[700],
      dark: colors.blue[600],
      main: colors.blue[500],
      light: colors.blue[200],
      highlight: colors.blue[100],
    },
  },
  primary: {
    deepDark: colors.blue[700],
    dark: colors.blue[600],
    main: colors.blue[500],
    light: colors.blue[200],
    highlight: colors.blue[100],
  },
  secondary: {
    deepDark: colors.blue[700],
    dark: colors.blue[600],
    main: colors.blue[500],
    light: colors.blue[200],
    highlight: colors.blue[100],
  },
  usecase: {
    success: {
      deepDark: colors.green[700],
      dark: colors.green[600],
      main: colors.green[500],
      light: colors.green[300],
      highlight: colors.green[100],
    },
    warning: {
      deepDark: colors.yellow[900],
      dark: colors.yellow[600],
      main: colors.yellow[500],
      light: colors.yellow[400],
      highlight: colors.yellow[100],
    },
    danger: {
      deepDark: colors.red[700],
      dark: colors.red[600],
      main: colors.red[500],
      light: colors.red[300],
      highlight: colors.red[100],
    },
  },
  icon: {
    active: colors.blue[500],
    fill: colors.basic[700],
    line: colors.basic[600],
  },
  divider: colors.basic[400],
};

export function createPalette(paletteInput: DeepPartial<Palette>): Palette {
  return deepmerge(palette, paletteInput);
}
