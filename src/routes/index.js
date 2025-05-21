import Home from '../pages/Home';
import Avaliacoes from '../pages/avaliacoes';
import AvaliacoesDesempenho from '../pages/avaliacoes/desempenho';
import AvaliacoesExperiencia from '../pages/avaliacoes/experiencia';
import RealizarAvaliacao from '../pages/avaliacoes/RealizarAvaliacao';
import PerformanceForm from '../components/PerformanceEvaluation/PerformanceForm';
import PerformanceDetail from '../components/PerformanceEvaluation/PerformanceDetail';
import CriteriosAvaliacao from '../features/avaliacoes/components/admin/CriteriosAvaliacao';
import ModelosAvaliacao from '../features/avaliacoes/components/admin/ModelosAvaliacao';
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
    path: '/avaliacoes/admin/criterios',
    element: CriteriosAvaliacao
  },
  {
    path: '/avaliacoes/admin/modelos',
    element: ModelosAvaliacao
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
    path: '/avaliacoes/realizar',
    element: RealizarAvaliacao
  },
  {
    path: '/avaliacoes/realizar/:id',
    element: RealizarAvaliacao
  },
  {
    path: '*',
    element: () => <Navigate to="/" replace />
  }
];
