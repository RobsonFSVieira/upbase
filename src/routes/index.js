import Dashboard from '../features/dashboard';
import AvaliacoesDesempenho from '../features/avaliacoes/desempenho';
import AvaliacoesExperiencia from '../features/avaliacoes/experiencia';

export const routes = [
  {
    path: '/',
    element: Dashboard
  },
  {
    path: '/avaliacoes/desempenho',
    element: AvaliacoesDesempenho
  },
  {
    path: '/avaliacoes/experiencia',
    element: AvaliacoesExperiencia
  }
];
