// 1. Import the utilities
import { extendTheme, ThemeOverride } from '@chakra-ui/react';

// 2. Update the breakpoints as key-value pairs
const breakpoints: ThemeOverride['breakpoints'] = {
  sm: '399px',
  md: '770px',
  lg: '999px',
  xl: '1499px',
  '2xl': '1899px',
};

// 3. Extend the theme with proper typing
const CustomTheme = extendTheme({
  breakpoints,
  config: {
    cssVarPrefix: 'standardUI',
  },
} as ThemeOverride);

export { CustomTheme };
