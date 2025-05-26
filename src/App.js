import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from './contexts/ThemeContext';
import { HelpProvider } from './contexts/HelpContext';
import { AuthProvider } from './contexts/AuthContext';
import { AvaliacaoProvider } from './contexts/AvaliacaoContext';
import { useTheme } from './contexts/ThemeContext';
import { MainLayout } from './components/Layout';
import getTheme from './utils/theme';
import AppRoutes from './routes/AppRoutes';

function ThemedApp() {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode ? 'dark' : 'light');

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </MUIThemeProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <HelpProvider>
          <AuthProvider>
            <AvaliacaoProvider>
              <ThemedApp />
            </AvaliacaoProvider>
          </AuthProvider>
        </HelpProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
