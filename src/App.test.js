import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Componente wrapper para prover o contexto do router
const AppWithRouter = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

test('renders welcome message', () => {
  render(<AppWithRouter />);
  const welcomeElement = screen.getByText(/Bem-vindo ao UPBase/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders app without crashing', () => {
  render(<AppWithRouter />);
});
