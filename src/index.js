import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Importações CSS podem atrasar o carregamento
import './index.css';
// Carregamento assíncrono de bootstrap para não bloquear a renderização inicial
import App from './App';
import reportWebVitals from './reportWebVitals';

// Carregar bootstrap assíncronamente
const loadBootstrap = async () => {
  await import('bootstrap/dist/css/bootstrap.min.css');
};
loadBootstrap();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Remover StrictMode em produção pode melhorar performance (evita double-rendering)
  process.env.NODE_ENV === 'development' ? (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  ) : (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
);

// Só reportar métricas em produção
if (process.env.NODE_ENV === 'production') {
  reportWebVitals();
}
