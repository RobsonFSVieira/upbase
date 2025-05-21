import Home from '../pages/Home';
import Avaliacoes from '../pages/avaliacoes';
import AvaliacoesDesempenho from '../pages/avaliacoes/desempenho';
import AvaliacoesExperiencia from '../pages/avaliacoes/experiencia';
import ModelosAvaliacao from '../features/avaliacoes/pages/desempenho/ModelosAvaliacao';
import FormTemplateEditor from '../features/avaliacoes/components/FormTemplateEditor';
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
    path: '/avaliacoes/modelos',
    element: ModelosAvaliacao
  },
  {
    path: '/avaliacoes/modelos/novo',
    element: FormTemplateEditor
  },
  {
    path: '/avaliacoes/modelos/:id',
    element: FormTemplateEditor
  },
  {
    path: '/avaliacoes/modelos/:id/edit',
    element: FormTemplateEditor
  },
  {
    path: '*',
    element: () => <Navigate to="/" replace />
  }
];
