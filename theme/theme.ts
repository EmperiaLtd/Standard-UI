// 1. Import the utilities
import { extendTheme } from '@chakra-ui/react';

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  sm: '399px',
  md: '770px',
  lg: '999px',
  xl: '1499px',
  '2xl': '1899px',
};

// 3. Extend the theme
const CustomTheme = extendTheme({
  breakpoints,
});

export { CustomTheme };
