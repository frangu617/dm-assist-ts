import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#8B0000', // Red color
    },
    secondary: {
      main: '#008080', // Teal color
    },
    background: {
      default: '#fdf5e6', // Papyrus-style background color
      paper: '#fffaf0', // Paper elements color
    },
  },
  typography: {
    fontFamily: 'Georgia, serif',
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#8B0000',
            fontWeight: 'bold',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#000', // Border color
          '&:not(.Mui-checked)': {
            backgroundColor: '#fff', // Background color when unchecked
            borderColor: '#000', // Border color
          },
          '&.Mui-checked': {
            backgroundColor: '#8B0000', // Background color when checked
            borderColor: '#000', // Keep border color consistent
            color: '#fff', // Checkmark color
          },
        },
      },
    },
  },
});

export default customTheme;
