import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './utils/theme';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Outras rotas serão adicionadas aqui */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
