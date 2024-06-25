import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#62238C',
    },
    secondary: {
      main: '#BF4B81',
    },
    background: {
      default: '#F2D1B3',
    },
    text: {
      primary: '#0D0D0D',
    },
  },
  typography: {
    fontFamily: 'heebo, sans-serif',
  },
});

export default theme;