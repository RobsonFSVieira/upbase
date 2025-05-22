import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { UserProvider } from './contexts/UserContext';
import { HelpProvider } from './contexts/HelpContext';
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './components/Layout';
import { routes } from './routes';
import getTheme from './utils/theme';

// Componente que usa o contexto após ele ter sido criado
function ThemedLayout({ children }) {
  // Importamos o hook useTheme internamente para evitar problemas de inicialização
  const { isDarkMode } = React.useContext(
    React.createContext({ isDarkMode: false, toggleTheme: () => {} })
  );
  const theme = getTheme(isDarkMode ? 'dark' : 'light');

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        {children}
      </MainLayout>
    </MUIThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <UserProvider>
            <HelpProvider>
              <ThemedLayout>
                <Routes>
                  {routes.map(({ path, element: Element }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        typeof Element === 'function'
                          ? <Element />
                          : Element
                      }
                    />
                  ))}
                </Routes>
              </ThemedLayout>
            </HelpProvider>
          </UserProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
