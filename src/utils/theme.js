import { createTheme } from '@mui/material';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#1F4D55',
      light: '#2C6D78',
      dark: '#163940',
    },
    secondary: {
      main: '#FF934C',
      light: '#FFA869',
      dark: '#E67E3E',
    },
    background: {
      default: mode === 'light' ? '#F5F7F8' : '#121418',
      paper: mode === 'light' ? '#FFFFFF' : '#1F2937',
    },
    text: {
      primary: mode === 'light' ? '#1F4D55' : '#FFFFFF',
      secondary: mode === 'light' ? '#666666' : '#94A3B8',
    },
    success: {
      main: mode === 'light' ? '#10B981' : '#34D399'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#FFFFFF' : '#1A2C34',
          color: mode === 'light' ? '#1F4D55' : '#FFFFFF',
          boxShadow: mode === 'light' 
            ? '0px 1px 3px rgba(0, 0, 0, 0.1)' 
            : '0px 1px 3px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'light' ? '#1F4D55' : '#1A2C34',
          color: '#FFFFFF',
          backgroundImage: mode === 'dark' 
            ? 'linear-gradient(180deg, #1A2C34 0%, #1F4D55 100%)' 
            : 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light'
            ? '0px 4px 6px rgba(0, 0, 0, 0.05)'
            : '0px 4px 6px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: mode === 'light'
              ? '0px 6px 12px rgba(0, 0, 0, 0.1)'
              : '0px 6px 12px rgba(0, 0, 0, 0.3)',
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
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          width: 'auto',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          minWidth: 40,
        },
      },
    },
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

export default getTheme;