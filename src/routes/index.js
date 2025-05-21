import Home from '../pages/Home';
import AvaliacoesDesempenho from '../pages/avaliacoes/desempenho';
import AvaliacoesExperiencia from '../pages/avaliacoes/experiencia';

export const routes = [
  {
    path: '/',
    element: Home
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
