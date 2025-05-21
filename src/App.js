import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import { MainLayout } from './components/Layout';
import { routes } from './routes';
import getTheme from './utils/theme';

function ThemedApp() {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode ? 'dark' : 'light');

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        {routes.map(({ path, element: Element }) => (
          <Element key={path} />
        ))}
      </MainLayout>
    </MUIThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ThemedApp />
      </div>
    </ThemeProvider>
  );
}

export default App;
