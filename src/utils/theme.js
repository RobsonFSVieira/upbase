import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    // Aqui você colocará as cores da sua identidade visual
    primary: {
      main: '#SUA_COR_PRINCIPAL',
      light: '#SUA_COR_PRINCIPAL_CLARA',
      dark: '#SUA_COR_PRINCIPAL_ESCURA',
    },
    secondary: {
      main: '#SUA_COR_SECUNDARIA',
      light: '#SUA_COR_SECUNDARIA_CLARA',
      dark: '#SUA_COR_SECUNDARIA_ESCURA',
    }
  },
  // Você pode personalizar fontes, espaçamentos, etc
});

export default theme;