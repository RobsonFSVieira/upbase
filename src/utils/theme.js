import { createTheme } from '@mui/material';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#0F2747',      // Azul marinho
      light: '#1E3A61',     // Azul marinho claro
      dark: '#091B33',      // Azul marinho escuro
    },
    secondary: {
      main: '#FF934C',      // Laranja (mantido da identidade)
      light: '#FFB07A',     // Laranja claro
      dark: '#E67E3E',      // Laranja escuro
    },
    background: {
      default: mode === 'light' ? '#F8FAFC' : '#0A1929',
      paper: mode === 'light' ? '#FFFFFF' : '#132F4C',
    },
    text: {
      primary: mode === 'light' ? '#0F2747' : '#FFFFFF',
      secondary: mode === 'light' ? '#475569' : '#94A3B8',
    },
    action: {
      active: mode === 'light' ? '#0F2747' : '#FFFFFF',
      hover: mode === 'light' ? 'rgba(15, 39, 71, 0.04)' : 'rgba(255, 255, 255, 0.08)',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.9)' 
            : 'rgba(19, 47, 76, 0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: mode === 'light'
            ? '1px solid #E2E8F0'
            : '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'light' ? '#0F2747' : '#132F4C',
          backgroundImage: mode === 'dark' 
            ? 'linear-gradient(180deg, #132F4C 0%, #0F2747 100%)'
            : 'linear-gradient(180deg, #0F2747 0%, #1E3A61 100%)',
          color: '#FFFFFF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: mode === 'light'
            ? '1px solid #E2E8F0'
            : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: mode === 'light'
            ? '0px 4px 20px rgba(15, 39, 71, 0.08)'
            : '0px 4px 20px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'light'
              ? '0px 8px 30px rgba(15, 39, 71, 0.12)'
              : '0px 8px 30px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          margin: '4px 8px',
          borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default getTheme;
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"></link>