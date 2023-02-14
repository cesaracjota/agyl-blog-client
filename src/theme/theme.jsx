import { extendTheme } from '@chakra-ui/react';
import "@fontsource/raleway";
import "@fontsource/poppins";

const theme = extendTheme({
  fonts: {
    // heading: `'Raleway', sans-serif`,
    body: `'Poppins', sans-serif`,
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    // body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
  colors: {
    primary: {
      500: '#2196f3',
      600: '#1e88e5',
      700: '#ffffff1f',
      800: '#575757',
      900: '#1e1e1e',
      modal: '#1b1d1e',
      1000: '#121212',
      1100: '#121212',
    },
  },
})

export default theme;
