import Dashboard from '../pages/Dashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Avaliacoes from '../pages/avaliacoes';
import AvaliacoesDesempenho from '../pages/avaliacoes/desempenho';
import AvaliacoesProgresso from '../pages/avaliacoes/desempenho/AvaliacoesProgresso';
import GerenciamentoAvaliacoes from '../pages/avaliacoes/desempenho/GerenciamentoAvaliacoes';
import ModelosFormularios from '../pages/avaliacoes/desempenho/ModelosFormularios';
import StatusAvaliacoes from '../pages/avaliacoes/desempenho/components/StatusAvaliacoes';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Colaboradores from '../pages/colaboradores';
import Atestados from '../pages/atestados';

export const routes = [
  { path: '/', element: Dashboard, public: false },
  { path: '/login', element: Login, public: true },
  { path: '/register', element: Register, public: true },
  { path: '/avaliacoes', element: Avaliacoes, public: false },
  { path: '/avaliacoes/desempenho', element: AvaliacoesDesempenho, public: false },
  { path: '/avaliacoes/desempenho/progresso', element: AvaliacoesProgresso, public: false },
  { path: '/avaliacoes/desempenho/gerenciar', element: GerenciamentoAvaliacoes, public: false },
  { path: '/avaliacoes/desempenho/modelos', element: ModelosFormularios, public: false },
  { path: '/profile', element: Profile, public: false },
  { path: '/settings', element: Settings, public: false },
  { path: '/colaboradores', element: Colaboradores, public: false },
  { path: '/atestados', element: Atestados, public: false }
];
