import Home from '../pages/Home';
import Avaliacoes from '../pages/avaliacoes';
import AvaliacoesDesempenho from '../pages/avaliacoes/desempenho';
import AvaliacoesExperiencia from '../pages/avaliacoes/experiencia';
import PerformanceForm from '../components/PerformanceEvaluation/PerformanceForm';
import PerformanceList from '../components/PerformanceEvaluation/PerformanceList';
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
    path: '/performance',
    element: <PerformanceList />
  },
  {
    path: '/performance/new',
    element: <PerformanceForm />
  },
  {
    path: '/performance/:id',
    element: <PerformanceForm />
  },
  {
    path: '*',
    element: () => <Navigate to="/" replace />
  }
];
