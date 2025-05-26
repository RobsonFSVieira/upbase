import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from './App';

// Mock dos contextos necessários
jest.mock('./contexts/ThemeContext', () => ({
  ThemeProvider: ({ children }) => children,
  useTheme: () => ({ isDarkMode: false, toggleTheme: jest.fn() })
}));

jest.mock('./contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => ({ user: null, login: jest.fn(), logout: jest.fn() })
}));

describe('App Component', () => {
  test('renders without crashing', () => {
    const router = createMemoryRouter([
      { path: '/', element: <App /> }
    ]);
    
    render(<RouterProvider router={router} />);
    expect(document.body).toBeDefined();
  });

  test('renders navigation structure', () => {
    const router = createMemoryRouter([
      { path: '/', element: <App /> }
    ]);
    
    render(<RouterProvider router={router} />);
    // Procurar pelo drawer ao invés de nav
    const drawer = document.querySelector('.MuiDrawer-root');
    expect(drawer).toBeInTheDocument();
  });
});
