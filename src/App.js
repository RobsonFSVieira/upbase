import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import getTheme from './utils/theme';
import { useTheme } from './contexts/ThemeContext';
import Home from './pages/Home';
import Avaliacoes from './pages/avaliacoes';
import MainLayout from './components/Layout/MainLayout';

function ThemedApp() {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode ? 'dark' : 'light');

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/avaliacoes" element={<Avaliacoes />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;
