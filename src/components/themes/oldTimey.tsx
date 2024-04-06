import { createTheme } from '@mui/material/styles';

const oldTimeyTheme = createTheme({
  typography: {
    fontFamily: "'Caudex', serif",
    h1: {
      // Customize your headers as needed
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    body1: {
      // Customize body text
      fontSize: '1rem',
    },
    // Add other customizations as needed
  },
  // Additional theme customizations
});

export default oldTimeyTheme;
