import { createTheme } from '@mui/material';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#1F4D55', // Verde escuro do menu lateral
      light: '#2C6D78',
      dark: '#163940',
    },
    secondary: {
      main: '#FF934C', // Laranja do logo
      light: '#FFA869',
      dark: '#E67E3E',
    },
    background: {
      default: mode === 'light' ? '#F5F7F8' : '#121212', // Fundo cinza claro
      paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
    },
    text: {
      primary: mode === 'light' ? '#1F4D55' : '#FFFFFF',
      secondary: mode === 'light' ? '#666666' : '#A0A0A0',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1F4D55',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1F4D55',
          color: '#FFFFFF',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // Ícones do menu em branco
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#FFFFFF', // Texto do menu em branco
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      color: '#1F4D55',
      fontWeight: 600,
    },
    h6: {
      color: '#1F4D55',
      fontWeight: 500,
    },
  },
});

export default getTheme;