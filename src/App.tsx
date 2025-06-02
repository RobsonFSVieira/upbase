import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { HelpProvider } from './contexts/HelpContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

const ThemedApp: React.FC = () => {
    return <AppRoutes />;
};

const App: React.FC = () => {
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
};

export default App;
