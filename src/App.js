import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import getTheme from './utils/theme';

import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import AvaliacoesDesempenho from './pages/avaliacoes/desempenho';
import AvaliacoesExperiencia from './pages/avaliacoes/experiencia';

function ThemedApp() {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode ? 'dark' : 'light');

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/avaliacoes/desempenho" element={<AvaliacoesDesempenho />} />
            <Route path="/avaliacoes/experiencia" element={<AvaliacoesExperiencia />} />
            <Route path="/colaboradores" element={<div>Colaboradores em breve</div>} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </MUIThemeProvider>
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
