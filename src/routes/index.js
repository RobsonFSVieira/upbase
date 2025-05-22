import Home from '../pages/Home';
import Avaliacoes from '../pages/avaliacoes';
import AvaliacoesDesempenho from '../pages/avaliacoes/desempenho';
import AvaliacoesExperiencia from '../pages/avaliacoes/experiencia';
import PerformanceForm from '../components/PerformanceEvaluation/PerformanceForm';
import PerformanceDetail from '../components/PerformanceEvaluation/PerformanceDetail';
import AvaliarDesempenho from '../pages/avaliacoes/desempenho/avaliar';
import { Navigate } from 'react-router-dom';

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
    path: '/avaliacoes/desempenho/avaliar/:id',
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
    path: '*',
    element: () => <Navigate to="/" replace />
  }
];
