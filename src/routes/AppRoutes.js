import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Avaliacoes from '../pages/avaliacoes';
import AvaliacoesDesempenho from '../pages/avaliacoes/desempenho';
import AvaliacoesProgresso from '../pages/avaliacoes/desempenho/AvaliacoesProgresso';
import GerenciamentoAvaliacoes from '../pages/avaliacoes/desempenho/GerenciamentoAvaliacoes';
import ModelosFormularios from '../pages/avaliacoes/desempenho/ModelosFormularios';
import StatusAvaliacoes from '../pages/avaliacoes/desempenho/components/StatusAvaliacoes';
import ExemploFormulario from '../components/PerformanceEvaluation/ExemploFormulario';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Colaboradores from '../pages/colaboradores';
import Atestados from '../pages/atestados';
import { AvaliacaoProvider } from '../contexts/AvaliacaoContext';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  // Se estiver carregando, não renderiza nada para evitar flash de conteúdo
  if (loading) {
    return null;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />

      {/* Protected routes */}
      <Route
        element={
          user ? (
            <MainLayout>
              <Outlet />
            </MainLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/" element={<Dashboard />} />

        {/* Wrap all avaliação-related routes with AvaliacaoProvider */}
        <Route
          element={
            <AvaliacaoProvider>
              <Outlet />
            </AvaliacaoProvider>
          }
        >
          <Route path="/avaliacoes" element={<Avaliacoes />}>
            <Route path="desempenho" element={<AvaliacoesDesempenho />}>
              <Route index element={<StatusAvaliacoes />} />
              <Route path="progresso" element={<AvaliacoesProgresso />} />
              <Route path="gerenciar" element={<GerenciamentoAvaliacoes />} />
              <Route path="modelos" element={<ModelosFormularios />} />
              <Route path="criar-formulario" element={<ExemploFormulario />} />
            </Route>
          </Route>
          <Route path="/colaboradores" element={<Colaboradores />} />
        </Route>

        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/atestados" element={<Atestados />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
