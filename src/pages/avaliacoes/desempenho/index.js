import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  Box, 
  Tabs, 
  Tab,
  Paper
} from '@mui/material';
import { useHelp } from '../../../contexts/HelpContext';
import PageHeader from '../../../components/common/PageHeader';

const AvaliacoesDesempenho = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showHelp } = useHelp();

  const tabs = [
    { label: 'Status Avaliações', path: '' },
    { label: 'Avaliações e Progresso', path: 'progresso' },
    { label: 'Gerenciamento', path: 'gerenciar' },
    { label: 'Modelos de Formulários', path: 'modelos' }
  ];

  const getCurrentTabIndex = () => {
    const currentPath = location.pathname.split('/avaliacoes/desempenho/')[1] || '';
    const index = tabs.findIndex(tab => tab.path === currentPath);
    return index === -1 ? 0 : index;
  };

  const handleTabChange = (event, newValue) => {
    const targetPath = tabs[newValue].path;
    navigate(targetPath ? `/avaliacoes/desempenho/${targetPath}` : '/avaliacoes/desempenho', { replace: true });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader 
        title="Avaliações de Desempenho"
        helpText="Gerencie as avaliações de desempenho"
      />
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={getCurrentTabIndex()} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {tabs.map(tab => (
            <Tab key={tab.path} label={tab.label} />
          ))}
        </Tabs>
      </Paper>

      <Box sx={{ py: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AvaliacoesDesempenho;