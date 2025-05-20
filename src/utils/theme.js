import { createTheme } from '@mui/material';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      // Azul institucional
      main: mode === 'light' ? '#0F2747' : '#2D5A9D',
      light: mode === 'light' ? '#1E3A61' : '#3D6AB0',
      dark: mode === 'light' ? '#091B33' : '#1D4580',
    },
    secondary: {
      // Laranja da logo
      main: '#FF934C',
      light: '#FFB07A',
      dark: '#E67E3E',
    },
    background: {
      // Fundos suaves no claro, escuros elegantes no dark
      default: mode === 'light' ? '#F7F9FC' : '#0A1929',
      paper: mode === 'light' ? '#FFFFFF' : '#132F4C',
    },
    text: {
      primary: mode === 'light' ? '#2C3E50' : '#E9ECEF',
      secondary: mode === 'light' ? '#64748B' : '#94A3B8',
    },
    action: {
      // Ações mais visíveis em ambos os modos
      active: mode === 'light' ? '#2A9D8F' : '#34D1BF',
      hover: mode === 'light' ? 'rgba(42, 157, 143, 0.08)' : 'rgba(52, 209, 191, 0.12)',
    },
    success: {
      main: mode === 'light' ? '#059669' : '#34D399',
    },
    warning: {
      main: '#FF934C', // Laranja da logo para alertas
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(37, 43, 59, 0.95)',
          backdropFilter: 'blur(10px)',
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
            ? 'linear-gradient(180deg, #132F4C 0%, #0A1929 100%)'
            : 'linear-gradient(180deg, #0F2747 0%, #1E3A61 100%)',
          color: '#FFFFFF',
        },
      },
    },
    // Melhorias Mobile
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(37, 43, 59, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: mode === 'light'
            ? '1px solid #E2E8F0'
            : '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          border: mode === 'light'
            ? '1px solid #E2E8F0'
            : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: mode === 'light'
            ? '0 4px 6px rgba(42, 157, 143, 0.1)'
            : '0 4px 6px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'light'
              ? '0 8px 12px rgba(42, 157, 143, 0.15)'
              : '0 8px 12px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          // Botões mais visíveis em mobile
          '@media (max-width: 600px)': {
            minHeight: '44px', // Área de toque maior
            width: '100%', // Full width em mobile
          },
        },
        containedPrimary: {
          backgroundColor: mode === 'light' ? '#2A9D8F' : '#34D1BF',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: mode === 'light' ? '#1F756B' : '#2AB3A1',
          },
        },
        containedSecondary: {
          backgroundColor: '#FF934C',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#E67E3E',
          },
        },
      },
    },
    // Melhorias para Mobile
    MuiListItem: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            paddingTop: '12px',
            paddingBottom: '12px',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h4: {
      fontWeight: 600,
      '@media (max-width: 600px)': {
        fontSize: '1.5rem',
      },
    },
    h6: {
      fontWeight: 500,
      '@media (max-width: 600px)': {
        fontSize: '1.1rem',
      },
    },
  },
  // Breakpoints otimizados
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default getTheme;
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"></link>