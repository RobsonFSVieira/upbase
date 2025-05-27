import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { HelpProvider } from './contexts/HelpContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

function ThemedApp() {
  return (
    <AppRoutes />
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <HelpProvider>
          <AuthProvider>
            <ThemedApp />
          </AuthProvider>
        </HelpProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
