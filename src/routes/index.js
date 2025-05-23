import Home from '../pages/Home';
import Avaliacoes from '../pages/avaliacoes';
import AvaliacoesDesempenho from '../pages/avaliacoes/desempenho';
import AvaliacoesExperiencia from '../pages/avaliacoes/experiencia';
import PerformanceForm from '../components/PerformanceEvaluation/PerformanceForm';
import PerformanceDetail from '../components/PerformanceEvaluation/PerformanceDetail';
import AvaliarDesempenho from '../pages/avaliacoes/desempenho/avaliar';
import { Navigate } from 'react-router-dom';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Colaboradores from '../pages/colaboradores';

export const routes = [
  {
    path: '/',
    element: Home
  },
  {
    path: '/avaliacoes',
    element: Avaliacoes
  },
  {
    path: '/avaliacoes/desempenho',
    element: AvaliacoesDesempenho
  },
  {
    path: '/avaliacoes/experiencia',
    element: AvaliacoesExperiencia
  },
  {
    path: '/avaliacoes/realizar/:id',
    element: AvaliarDesempenho
  },
  {
    path: '/performance/new',
    element: PerformanceForm
  },
  {
    path: '/performance/edit/:id',
    element: PerformanceForm
  },
  {
    path: '/performance/:id',
    element: PerformanceDetail
  },
  {
    path: '/profile',
    element: Profile
  },
  {
    path: '/settings',
    element: Settings
  },
  {
    path: '/login',
    element: Login,
    public: true
  },
  {
    path: '/register',
    element: Register,
    public: true
  },
  {
    path: '/colaboradores',
    element: Colaboradores
  },
  {
    path: '*',
    element: () => <Navigate to="/" replace />
  }
];
