import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { EvaluationProvider } from '../contexts/EvaluationContext';
import { AvaliacaoProvider } from '../contexts/AvaliacaoContext';
import { MainLayout } from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Avaliacoes from '../pages/avaliacoes';
import AvaliacoesDesempenho from '../pages/avaliacoes/desempenho';
import AvaliacoesProgresso from '../pages/avaliacoes/desempenho/AvaliacoesProgresso';
import GerenciamentoAvaliacoes from '../pages/avaliacoes/desempenho/GerenciamentoAvaliacoes';
import ModelosFormularios from '../pages/avaliacoes/desempenho/ModelosFormularios';
import EvaluationDashboard from '../pages/avaliacoes/desempenho/EvaluationDashboard';
import StatusAvaliacoes from '../pages/avaliacoes/desempenho/components/StatusAvaliacoes';
import ExemploFormulario from '../components/PerformanceEvaluation/ExemploFormulario';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Colaboradores from '../pages/colaboradores';
import Atestados from '../pages/atestados';
import AuditLogViewer from '../components/AuditLogs/AuditLogViewer';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  const { user, loading } = useAuth();

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
            <AvaliacaoProvider>
              <MainLayout>
                <Outlet />
              </MainLayout>
            </AvaliacaoProvider>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/avaliacoes"
          element={
            <EvaluationProvider>
              <Avaliacoes />
            </EvaluationProvider>
          }
        >
          <Route path="desempenho" element={<AvaliacoesDesempenho />}>
            <Route index element={<EvaluationDashboard />} />
            <Route path="status" element={<StatusAvaliacoes />} />
            <Route path="progresso" element={<AvaliacoesProgresso />} />
            <Route path="gerenciar" element={<GerenciamentoAvaliacoes />} />
            <Route path="modelos" element={<ModelosFormularios />} />
            <Route path="criar-formulario" element={<ExemploFormulario />} />
          </Route>
        </Route>

        <Route path="/colaboradores" element={<Colaboradores />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/atestados" element={<Atestados />} />
        <Route path="/audit-logs" element={<AuditLogViewer />} />
      </Route>

      {/* Catch-all route para páginas em desenvolvimento */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
