import { createTheme } from '@mui/material';

const globalTheme = createTheme({
  palette: {
    // colors are placeholders, change them when the color palette is decided
    primary: {
      main: '#434343',
    },
    secondary: {
      main: '#434343',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Montserrat, Open Sans, Helvetica',
    },
    h1: {
      fontSize: '36px',
      fontWeight: 600,
    },
    h2: {
      fontSize: '32px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '24px',
      fontWeight: 600,
    },
    h4: {
      fontSize: '24px',
      fontWeight: 600,
    },
    body1: {
      // body on figma
      fontSize: '16px',
      fontWeight: 500,
    },
    body2: {
      // description on figma
      fontSize: '16px',
      fontWeight: 400,
    },
    button: {
      fontWeight: 400,
      fontSize: '16px',
      textTransform: 'none',
    },
    subtitle1: {
      // pre title strong
      fontWeight: 500,
      fontSize: '16px',
      textTransform: 'capitalize',
    },
    subtitle2: {
      // pre title
      fontWeight: 400,
      fontSize: '16px',
      textTransform: 'capitalize',
    },
  },
});

export { globalTheme };
